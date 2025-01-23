import { motion } from "framer-motion";
import { AppointmentCard } from "../../../components/AppointmentCard";
import { AppointmentBookingForm } from "../../../components/AppointmentBookingForm";
import { DashboardLayout } from "../../../components/layouts/DashboardLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const UserAppointments = () => {
  const appointments = [
    {
      id: 1,
      date: "2025-03-15",
      time: "10:00 AM",
      type: "GP",
      status: "scheduled",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 bg-white">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Appointments" },
          ]}
        />
        <h1 className="text-3xl font-bold mb-8 text-[#003087]">Appointments</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#005EB8]">
              Upcoming Appointments
            </h2>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  showActions={true}
                  onReschedule={(id) => console.log("Reschedule", id)}
                  onCancel={(id) => console.log("Cancel", id)}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#005EB8]">
              Book New Appointment
            </h2>
            <AppointmentBookingForm
              onSubmit={(data) => console.log("Book appointment:", data)}
            />
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserAppointments;
