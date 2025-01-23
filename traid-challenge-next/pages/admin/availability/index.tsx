import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Thermometer, Plane } from "lucide-react";
import { AvailabilityCalendar } from "../../../components/AvailabilityCalendar";
import { AdminLayout } from "../../../components/layouts/AdminLayout";

const AdminAvailability = () => {
  const doctors = [
    { id: "1", name: "Dr. Smith" },
    { id: "2", name: "Dr. Johnson" },
  ];

  // State for leave management
  const [leaveType, setLeaveType] = useState<"holiday" | "sick" | null>(null);
  const [leaveStartDate, setLeaveStartDate] = useState<string>("");
  const [leaveEndDate, setLeaveEndDate] = useState<string>("");
  const [leaveReason, setLeaveReason] = useState<string>("");

  // Dummy data for holidays and leaves
  const [holidays, setHolidays] = useState<
    { id: number; startDate: string; endDate: string; reason: string }[]
  >([]);

  // Handle leave submission
  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveType || !leaveStartDate || !leaveEndDate) {
      alert("Please fill in all required fields.");
      return;
    }

    const newLeave = {
      id: holidays.length + 1,
      startDate: leaveStartDate,
      endDate: leaveEndDate,
      reason: leaveReason,
    };

    setHolidays([...holidays, newLeave]);
    alert("Leave request submitted successfully!");
    setLeaveType(null);
    setLeaveStartDate("");
    setLeaveEndDate("");
    setLeaveReason("");
  };

  return (
    <AdminLayout>
      <div className="p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-[#005EB8]">
          Manage Availability
        </h1>

        <div className="grid gap-8">
          {/* Doctor Selection and Availability Calendar */}
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

          {/* Leave Management Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">Schedule Leave</h2>
            <form onSubmit={handleLeaveSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Leave Type
                </label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setLeaveType("holiday")}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      leaveType === "holiday"
                        ? "bg-[#005EB8] text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Plane size={16} className="mr-2" />
                    Holiday
                  </button>
                  <button
                    type="button"
                    onClick={() => setLeaveType("sick")}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      leaveType === "sick"
                        ? "bg-[#005EB8] text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Thermometer size={16} className="mr-2" />
                    Sick Leave
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="leaveStartDate">
                  Start Date
                </label>
                <input
                  type="date"
                  id="leaveStartDate"
                  value={leaveStartDate}
                  onChange={(e) => setLeaveStartDate(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#005EB8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="leaveEndDate">
                  End Date
                </label>
                <input
                  type="date"
                  id="leaveEndDate"
                  value={leaveEndDate}
                  onChange={(e) => setLeaveEndDate(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#005EB8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="leaveReason">
                  Reason (Optional)
                </label>
                <textarea
                  id="leaveReason"
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#005EB8] focus:outline-none"
                  rows={3}
                />
              </div>

              <button
                type="submit"
                className="bg-[#005EB8] text-white py-2 px-4 rounded-md hover:bg-[#004B9C] transition-colors"
              >
                Submit Leave Request
              </button>
            </form>
          </motion.div>

          {/* Holidays and Leaves List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">Scheduled Leaves</h2>
            {holidays.length > 0 ? (
              <div className="space-y-4">
                {holidays.map((holiday) => (
                  <div
                    key={holiday.id}
                    className="border rounded-md p-4 hover:border-[#005EB8] transition-colors"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <Calendar className="text-[#005EB8]" size={20} />
                      <span className="text-gray-800">
                        {holiday.startDate} to {holiday.endDate}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Reason: {holiday.reason || "No reason provided"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No leaves scheduled.</p>
            )}
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAvailability;