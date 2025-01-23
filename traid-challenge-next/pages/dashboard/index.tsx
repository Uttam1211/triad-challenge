import { motion } from "framer-motion";
import {
  UserPlus,
  Bell,
  Settings,
  CalendarPlus,
  Users,
  MessageSquare,
  Heart,
  FileText,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import {
  AppointmentCard,
  type AppointmentCardProps,
} from "../../components/AppointmentCard";
import { ReferralCard, type Referral } from "../../components/ReferralCard";
import { AvailabilityCalendar } from "../../components/AvailabilityCalendar";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import { useState, useEffect } from "react";

const UserDashboard = () => {
  const [appointments, setAppointments] = useState<
    AppointmentCardProps["appointment"][]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("/api/appointments");
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      setError("Could not load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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
      setError("Failed to cancel appointment");
    }
  };

  const handleRescheduleAppointment = async (id: number, newSlotId: number) => {
    try {
      // Fetch available slots first
      const slotsResponse = await fetch("/api/slots");
      if (!slotsResponse.ok) throw new Error("Failed to fetch slots");
      const slots = await slotsResponse.json();
      setAvailableSlots(slots);

      const response = await fetch(`/api/appointments?id=${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newSlotId }),
      });

      if (!response.ok) throw new Error("Failed to reschedule appointment");
      fetchAppointments();
    } catch (error) {
      setError("Failed to reschedule appointment");
    }
  };

  const recentReferrals: Referral[] = [
    {
      id: 1,
      date: "2024-03-10",
      fromDoctor: "Dr. Smith",
      toDoctor: "Dr. Johnson",
      status: "pending",
    },
  ];

  const quickActions = [
    {
      href: "https://111.nhs.uk/",
      label: "NHS 111 Online",
      icon: CalendarPlus,
      description: "Get help for urgent medical problems. Available 24/7",
      primary: true,
      external: true,
      urgent: true,
    },
    {
      href: "/dashboard/appointments",
      label: "Book Appointment",
      icon: CalendarPlus,
      description: "Schedule a routine appointment with your GP",
    },
    {
      href: "/dashboard/family",
      label: "Manage Family Members",
      icon: Users,
      description: "Add or manage family members on your NHS account",
    },
    {
      href: "/dashboard/settings",
      label: "Account Settings",
      icon: Settings,
      description: "Manage your NHS account settings",
    },
    {
      href: "/dashboard/contact",
      label: "Contact Us",
      icon: MessageSquare,
      description: "Get in touch with our healthcare team",
    },
    {
      href: "https://www.nhs.uk/nhs-app/",
      label: "NHS App",
      icon: Heart,
      description: "Access your NHS App for detailed health records",
      external: true,
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 bg-white">
        <h1 className="text-3xl font-bold mb-8 text-[#003087]">
          Welcome to NHS Portal
        </h1>

        <div className="grid gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#003087]">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noopener noreferrer" : undefined}
                  className={`group p-6 rounded-md border-2 transition-all ${
                    action.urgent
                      ? "border-[#d5281b] bg-[#fff1f0] hover:bg-[#d5281b] hover:text-white"
                      : action.primary
                      ? "border-[#005eb8] hover:bg-[#005eb8] hover:text-white"
                      : "border-[#005eb8] hover:bg-[#005eb8] hover:text-white"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-2 rounded-full ${
                        action.urgent
                          ? "bg-[#d5281b] text-white"
                          : "bg-[#005eb8] text-white"
                      }`}
                    >
                      <action.icon size={24} />
                    </div>
                    <div>
                      <h3
                        className={`font-bold mb-1 ${
                          action.urgent ? "text-[#d5281b]" : "text-[#005eb8]"
                        } group-hover:text-white flex items-center`}
                      >
                        {action.label}
                        {action.external && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4 ml-1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                              clipRule="evenodd"
                            />
                            <path
                              fillRule="evenodd"
                              d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600 group-hover:text-white">
                        {action.description}
                      </p>
                      {action.urgent && (
                        <div className="mt-2 text-sm text-[#d5281b] group-hover:text-white flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Available 24/7 for urgent medical help
                        </div>
                      )}
                      {action.external && !action.urgent && (
                        <span className="text-xs text-gray-500 group-hover:text-white mt-1 inline-block">
                          Opens in new tab
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Upcoming Appointments */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border-t-4 border-[#005eb8] p-6 shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#003087]">
                  Upcoming Appointments
                </h2>
                <Link
                  href="/dashboard/appointments"
                  className="text-[#005eb8] hover:underline font-bold"
                >
                  View all
                </Link>
              </div>

              {loading ? (
                <div className="p-4 text-center text-gray-600">
                  Loading appointments...
                </div>
              ) : error ? (
                <div className="p-4 text-[#d5281b]">{error}</div>
              ) : appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      showActions={true}
                      onReschedule={handleRescheduleAppointment}
                      onCancel={handleCancelAppointment}
                      availableSlots={availableSlots}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-[#fff1f0] border-2 border-[#d5281b] rounded-md">
                    <p className="text-[#212b32] mb-2">
                      You have no upcoming appointments.
                    </p>
                    <Link
                      href="/dashboard/appointments"
                      className="inline-flex items-center text-[#005eb8] hover:underline font-bold"
                    >
                      Book an appointment
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                  <div className="p-4 bg-[#fff1f0] border border-[#d5281b] rounded-md">
                    <p className="text-[#212b32] mb-2">
                      <strong>Need urgent medical help?</strong>
                    </p>
                    <Link
                      href="https://111.nhs.uk/"
                      className="inline-flex items-center text-[#d5281b] hover:underline font-bold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Go to NHS 111 online
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Recent Referrals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border-t-4 border-[#005eb8] p-6 shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#003087]">
                  Recent Referrals
                </h2>
                <Link
                  href="/dashboard/referrals"
                  className="text-[#005eb8] hover:underline font-bold"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {recentReferrals.map((referral) => (
                  <ReferralCard
                    key={referral.id}
                    referral={referral}
                    showDetails={false}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
