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
      <div className="p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-[#005EB8]">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-2 bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#005EB8]">
              Administrative Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/admin/appointments"
                className="flex flex-col items-center p-4 border rounded-md hover:border-[#005EB8] transition-colors"
              >
                <Calendar className="text-[#005EB8] mb-2" size={24} />
                <span>Manage Appointments</span>
              </Link>
              <Link
                href="/admin/availability"
                className="flex flex-col items-center p-4 border rounded-md hover:border-[#005EB8] transition-colors"
              >
                <Clock className="text-[#005EB8] mb-2" size={24} />
                <span>Set Availability</span>
              </Link>
              <Link
                href="/admin/referrals"
                className="flex flex-col items-center p-4 border rounded-md hover:border-[#005EB8] transition-colors"
              >
                <FileText className="text-[#005EB8] mb-2" size={24} />
                <span>Manage Referrals</span>
              </Link>
              <Link
                href="/admin/users"
                className="flex flex-col items-center p-4 border rounded-md hover:border-[#005EB8] transition-colors"
              >
                <Users className="text-[#005EB8] mb-2" size={24} />
                <span>Manage Users</span>
              </Link>
            </div>
          </motion.div>

          {/* Recent Appointments */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#005EB8]">
                Recent Appointments
              </h2>
              <Link
                href="/admin/appointments"
                className="text-[#005EB8] hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
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
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#005EB8]">
                Pending Referrals
              </h2>
              <Link
                href="/admin/referrals"
                className="text-[#005EB8] hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
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
    </AdminLayout>
  );
};

export default withAuth(AdminDashboard, "admin");
