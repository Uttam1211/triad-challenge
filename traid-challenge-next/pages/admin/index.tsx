import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, FileText, Users } from "lucide-react";
import Link from "next/link";
import { AppointmentCard } from "../../components/AppointmentCard";
import { ReferralCard } from "../../components/ReferralCard";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import { withAuth } from "../../components/withAuth";

const AdminDashboard = () => {
  const recentAppointments = [
    {
      id: 1,
      date: "2025-03-15",
      time: "10:00 AM",
      type: "GP",
      status: "scheduled",
    },
  ];

  const pendingReferrals = [
    {
      id: 1,
      date: "2024-03-10",
      fromDoctor: "Dr. Smith",
      toDoctor: "Dr. Johnson",
      status: "pending",
    },
  ];

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 md:p-8 bg-gray-50">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#005EB8]">
          Admin Dashboard
        </h1>

        <div className="grid gap-6 sm:gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#005EB8]">
              Administrative Actions
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <Link
                href="/admin/appointments"
                className="flex flex-col items-center p-3 sm:p-4 border rounded-md hover:border-[#005EB8] transition-colors"
              >
                <Calendar className="text-[#005EB8] mb-2 h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-sm sm:text-base text-center">
                  Manage Appointments
                </span>
              </Link>
              <Link
                href="/admin/availability"
                className="flex flex-col items-center p-3 sm:p-4 border rounded-md hover:border-[#005EB8] transition-colors"
              >
                <Clock className="text-[#005EB8] mb-2 h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-sm sm:text-base text-center">
                  Set Availability
                </span>
              </Link>
              <Link
                href="/admin/referrals"
                className="flex flex-col items-center p-3 sm:p-4 border rounded-md hover:border-[#005EB8] transition-colors"
              >
                <FileText
                  className="text-[#005EB8] mb-2"
                  size={20}
                />
                <span className="text-sm sm:text-base text-center">
                  Manage Referrals
                </span>
              </Link>
              <Link
                href="/admin/users"
                className="flex flex-col items-center p-3 sm:p-4 border rounded-md hover:border-[#005EB8] transition-colors"
              >
                <Users className="text-[#005EB8] mb-2 h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-sm sm:text-base text-center">
                  Manage Users
                </span>
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Recent Appointments */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-[#005EB8]">
                  Recent Appointments
                </h2>
                <Link
                  href="/admin/appointments"
                  className="text-sm sm:text-base text-[#005EB8] hover:underline"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {recentAppointments.map((appointment) => (
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

            {/* Pending Referrals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-[#005EB8]">
                  Pending Referrals
                </h2>
                <Link
                  href="/admin/referrals"
                  className="text-sm sm:text-base text-[#005EB8] hover:underline"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {pendingReferrals.map((referral) => (
                  <ReferralCard
                    key={referral.id}
                    referral={referral}
                    showDetails={true}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default withAuth(AdminDashboard, "admin");
