import { motion } from "framer-motion";
import { AvailabilityCalendar } from "../../../components/AvailabilityCalendar";
import { AdminLayout } from "../../../components/layouts/AdminLayout";

const AdminAvailability = () => {
  const doctors = [
    { id: "1", name: "Dr. Smith" },
    { id: "2", name: "Dr. Johnson" },
  ];

  return (
    <AdminLayout>
      <div className="p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-[#005EB8]">
          Manage Availability
        </h1>

        <div className="grid gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="mb-6">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="doctor"
              >
                Select Doctor
              </label>
              <select
                id="doctor"
                className="w-full md:w-1/3 border-2 border-gray-300 rounded-md p-2 focus:border-[#005EB8] focus:outline-none"
              >
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>

            <AvailabilityCalendar
              onDateSelect={(date) => console.log("Selected date:", date)}
              onTimeSelect={(time) => console.log("Selected time:", time)}
            />
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAvailability;
