import { GetServerSideProps } from "next";
import { motion } from "framer-motion";
import { prisma } from "@/lib/prisma";
import { useTranslations } from "next-intl";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  AppointmentCard,
  AppointmentCardProps,
} from "@/components/AppointmentCard";
import { AppointmentBookingForm } from "@/components/AppointmentBookingForm";
import { useState, useEffect } from "react";

interface AppointmentsPageProps {
  appointments: any[];
  availableSlots: any[];
  gp: any;
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  // Hardcoded NHS number for now
  const NHS_NUMBER = "1234567890";

  try {
    const user = await prisma.user.findUnique({
      where: { nhsNumber: NHS_NUMBER },
      include: { gp: true },
    });

    if (!user) {
      return { notFound: true };
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: user.id,
        status: "SCHEDULED",
      },
      include: {
        gp: true,
        freeSlot: true,
      },
      orderBy: {
        freeSlot: {
          startTime: "asc",
        },
      },
    });

    const availableSlots = await prisma.freeSlot.findMany({
      where: {
        gpId: user.gpId!,
        isBooked: false,
        startTime: {
          gte: new Date(),
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return {
      props: {
        appointments: JSON.parse(JSON.stringify(appointments)),
        availableSlots: JSON.parse(JSON.stringify(availableSlots)),
        gp: JSON.parse(JSON.stringify(user.gp)),
        messages: (
          await import(
            `../../../messages/${locale === "default" ? "en" : locale}.json`
          )
        ).default,
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return { notFound: true };
  }
};

const AppointmentsPage = ({
  availableSlots,
  gp,
}: Omit<AppointmentsPageProps, "appointments">) => {
  const t = useTranslations("appointments");
  const commonT = useTranslations("common");
  const [appointments, setAppointments] = useState<
    AppointmentCardProps["appointment"][]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointments");
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleBookAppointment = async (data: any) => {
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, gpId: gp.id }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to book appointment");
      }

      // Refresh the appointments list
      fetchAppointments();
    } catch (error) {
      throw error; // Re-throw the error to be handled by the form
    }
  };

  const handleCancelAppointment = async (id: number) => {
    try {
      const response = await fetch(`/api/appointments?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to cancel appointment");

      // Refresh appointments list
      fetchAppointments();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  const handleRescheduleAppointment = async (id: number, newSlotId: number) => {
    try {
      const response = await fetch(`/api/appointments?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newSlotId }),
      });

      if (!response.ok) throw new Error("Failed to reschedule appointment");

      // Refresh appointments list
      fetchAppointments();
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 bg-white">
        <Breadcrumbs
          items={[
            { label: commonT("dashboard"), href: "/dashboard" },
            { label: t("title") },
          ]}
        />
        <h1 className="text-3xl font-bold mb-8 text-[#003087]">{t("title")}</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#005EB8]">
              {t("upcoming")}
            </h2>
            <div className="space-y-4">
              {isLoading ? (
                <div>Loading...</div>
              ) : appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    showActions={true}
                    onCancel={handleCancelAppointment}
                    onReschedule={(id, newSlotId) =>
                      handleRescheduleAppointment(id, newSlotId)
                    }
                    availableSlots={availableSlots}
                  />
                ))
              ) : (
                <div>No upcoming appointments</div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#005EB8]">
              {t("book")}
            </h2>
            <AppointmentBookingForm
              gp={gp}
              availableSlots={availableSlots}
              onSubmit={handleBookAppointment}
            />
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentsPage;
