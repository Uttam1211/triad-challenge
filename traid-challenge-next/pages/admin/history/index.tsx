import { useState } from "react";
import { motion } from "framer-motion";
import { AppointmentCard } from "../../../components/AppointmentCard";
import { ReferralCard } from "../../../components/ReferralCard";
import { AdminLayout } from "../../../components/layouts/AdminLayout";

const AdminHistory = () => {
  const [activeTab, setActiveTab] = useState<"appointments" | "referrals">(
    "appointments"
  );
  const [selectedDoctor, setSelectedDoctor] = useState("all");

  const doctors = [
    { id: "1", name: "Dr. Smith" },
    { id: "2", name: "Dr. Johnson" },
  ];

  const pastAppointments = [
    {
      id: 1,
      date: "2023-12-15",
      time: "10:00 AM",
      type: "GP",
      status: "completed",
    },
  ];

  const pastReferrals = [
    {
      id: 1,
      date: "2023-11-10",
      fromDoctor: "Dr. Smith",
      toDoctor: "Dr. Johnson",
      status: "completed",
      reason: "Specialist consultation",
    },
  ];

  return (
    <AdminLayout>
      <div className="p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-[#005EB8]">
          Medical Records History
        </h1>

        <div className="mb-6 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("appointments")}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === "appointments"
                  ? "bg-[#005EB8] text-white"
                  : "bg-white text-[#005EB8] hover:bg-gray-50"
              }`}
            >
              Appointments History
            </button>
            <button
              onClick={() => setActiveTab("referrals")}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === "referrals"
                  ? "bg-[#005EB8] text-white"
                  : "bg-white text-[#005EB8] hover:bg-gray-50"
              }`}
            >
              Referrals History
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium" htmlFor="doctorFilter">
              Filter by Doctor:
            </label>
            <select
              id="doctorFilter"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="border-2 border-gray-300 rounded-md p-2 focus:border-[#005EB8] focus:outline-none"
            >
              <option value="all">All Doctors</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          {activeTab === "appointments" ? (
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  showActions={false}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {pastReferrals.map((referral) => (
                <ReferralCard
                  key={referral.id}
                  referral={referral}
                  showDetails={true}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminHistory;
