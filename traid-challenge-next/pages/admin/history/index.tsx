import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { format } from "date-fns";
import { AdminLayout } from "../../../components/layouts/AdminLayout";

// Define types
type Appointment = {
  id: number;
  date: string;
  time: string;
  type: "GP" | "HOSPITAL";
  status: "completed" | "cancelled";
  doctor: {
    id: string;
    name: string;
  };
};

type Referral = {
  id: number;
  date: string;
  fromDoctor: string;
  toDoctor: string;
  status: "completed" | "pending";
  reason: string;
};

// AppointmentCard Component
const AppointmentCard = ({
  appointment,
}: {
  appointment: Appointment;
}) => {
  return (
    <div className="border rounded-md p-4 hover:border-[#005EB8] transition-colors">
      <div className="flex items-center space-x-3 mb-2">
        <Calendar className="text-[#005EB8]" size={20} />
        <span className="text-gray-800">
          {appointment.date
            ? format(new Date(appointment.date), "MMMM do, yyyy")
            : "Date not set"}
        </span>
      </div>
      <div className="flex items-center space-x-3 mb-2">
        <Clock className="text-[#005EB8]" size={20} />
        <span className="text-gray-800">
          {appointment.time || "Time not set"}
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <MapPin className="text-[#005EB8]" size={20} />
        <span className="text-gray-800">
          {appointment.doctor?.name
            ? `Dr. ${appointment.doctor.name}`
            : "Doctor not assigned"}
        </span>
      </div>
    </div>
  );
};

// ReferralCard Component
const ReferralCard = ({
  referral,
}: {
  referral: Referral;
}) => {
  return (
    <div className="border rounded-md p-4 hover:border-[#005EB8] transition-colors">
      <div className="flex items-center space-x-3 mb-2">
        <Calendar className="text-[#005EB8]" size={20} />
        <span className="text-gray-800">
          {referral.date
            ? format(new Date(referral.date), "MMMM do, yyyy")
            : "Date not set"}
        </span>
      </div>
      <div className="flex items-center space-x-3 mb-2">
        <User className="text-[#005EB8]" size={20} />
        <span className="text-gray-800">
          From: {referral.fromDoctor || "Doctor not assigned"}
        </span>
      </div>
      <div className="flex items-center space-x-3 mb-2">
        <User className="text-[#005EB8]" size={20} />
        <span className="text-gray-800">
          To: {referral.toDoctor || "Doctor not assigned"}
        </span>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        Reason: {referral.reason}
      </div>
    </div>
  );
};

// AdminHistory Component
const AdminHistory = () => {
  const [activeTab, setActiveTab] = useState<"appointments" | "referrals">("appointments");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dummy data for doctors
  const doctors = [
    { id: "1", name: "Dr. Smith" },
    { id: "2", name: "Dr. Johnson" },
  ];

  // Dummy data for past appointments
  const pastAppointments: Appointment[] = [
    {
      id: 1,
      date: "2023-12-15",
      time: "10:00 AM",
      type: "GP",
      status: "completed",
      doctor: { id: "1", name: "Dr. Smith" },
    },
    {
      id: 2,
      date: "2023-11-20",
      time: "02:00 PM",
      type: "HOSPITAL",
      status: "cancelled",
      doctor: { id: "2", name: "Dr. Johnson" },
    },
  ];

  // Dummy data for past referrals
  const pastReferrals: Referral[] = [
    {
      id: 1,
      date: "2023-11-10",
      fromDoctor: "Dr. Smith",
      toDoctor: "Dr. Johnson",
      status: "completed",
      reason: "Specialist consultation",
    },
    {
      id: 2,
      date: "2023-09-25",
      fromDoctor: "Dr. Johnson",
      toDoctor: "Dr. Smith",
      status: "pending",
      reason: "Further diagnosis required",
    },
  ];

  // Filtered appointments
  const filteredAppointments = pastAppointments.filter((appointment) => {
    const matchesDoctor =
      selectedDoctor === "all" || appointment.doctor.id === selectedDoctor;
    const matchesSearch =
      appointment.doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDoctor && matchesSearch;
  });

  // Filtered referrals
  const filteredReferrals = pastReferrals.filter((referral) => {
    const matchesDoctor =
      selectedDoctor === "all" ||
      referral.fromDoctor.toLowerCase().includes(selectedDoctor.toLowerCase()) ||
      referral.toDoctor.toLowerCase().includes(selectedDoctor.toLowerCase());
    const matchesSearch =
      referral.fromDoctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      referral.toDoctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      referral.reason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDoctor && matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-[#005EB8]">
          Medical Records History
        </h1>

        {/* Tabs and Filters */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Tabs */}
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

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 p-2 border-2 rounded-md focus:border-[#005EB8] focus:outline-none"
          />

          {/* Doctor Filter */}
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

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          {activeTab === "appointments" ? (
            <div className="space-y-4">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))
              ) : (
                <p className="text-gray-600">No appointments found.</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReferrals.length > 0 ? (
                filteredReferrals.map((referral) => (
                  <ReferralCard
                    key={referral.id}
                    referral={referral}
                  />
                ))
              ) : (
                <p className="text-gray-600">No referrals found.</p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default AdminHistory;