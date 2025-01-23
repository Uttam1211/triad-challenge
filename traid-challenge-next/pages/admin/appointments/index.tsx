import { motion } from "framer-motion";
import { AppointmentCard } from "../../../components/AppointmentCard";
import { AppointmentBookingForm } from "../../../components/AppointmentBookingForm";
import { AdminLayout } from "../../../components/layouts/AdminLayout";

const AdminAppointments = () => {
  const appointments = [
    {
      id: 1,
      date: "2025-03-15",
      time: "10:00 AM",
      type: "GP",
      status: "scheduled",
    },
  ];

  const doctors = [
    { id: "1", name: "Dr. Smith" },
    { id: "2", name: "Dr. Johnson" },
  ];

  return (
    <AdminLayout>
      <div className="p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-[#005EB8]">
          Manage Appointments
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#005EB8]">
              All Appointments
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
              Create Appointment
            </h2>
            <AppointmentBookingForm
              onSubmit={(data) => console.log("Create appointment:", data)}
              doctors={doctors}
            />
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAppointments;
