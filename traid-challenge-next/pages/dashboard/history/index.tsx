import { useState } from "react";
import { motion } from "framer-motion";
import { History, Calendar, FileText } from "lucide-react";
import { AppointmentCard } from "../../../components/AppointmentCard";
import { ReferralCard } from "../../../components/ReferralCard";
import { DashboardLayout } from "../../../components/layouts/DashboardLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const HistoryPage = () => {
  const [activeTab, setActiveTab] = useState<"appointments" | "referrals">(
    "appointments"
  );

  const pastAppointments = [
    {
      id: 1,
      freeSlot: {
        startTime: "2023-12-15T14:30:00Z",
        endTime: "2023-12-15T15:00:00Z",
      },
      status: "SCHEDULED" as const,
      notes: "General Checkup",
      gp: {
        name: "Smith",
      },
    },
  ];

  const pastReferrals = [
    {
      id: 1,
      date: "2023-11-20",
      fromDoctor: "Dr. Smith",
      toDoctor: "Dr. Johnson",
      status: "completed",
      reason: "Specialist consultation",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 bg-white">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "History" },
          ]}
        />

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-6">
            <History className="w-8 h-8 text-[#005eb8]" />
            <h1 className="text-3xl font-bold text-[#003087]">
              Medical History
            </h1>
          </div>

          <Tabs defaultValue="appointments" className="w-full">
            <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 mb-8">
              <TabsTrigger
                value="appointments"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-5 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005eb8] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#005eb8] data-[state=active]:text-white data-[state=active]:shadow-sm"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Past Appointments
              </TabsTrigger>
              <TabsTrigger
                value="referrals"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-5 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#005eb8] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#005eb8] data-[state=active]:text-white data-[state=active]:shadow-sm"
              >
                <FileText className="w-4 h-4 mr-2" />
                Past Referrals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appointments">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {pastAppointments.map((appointment) => (
                  <div key={appointment.id} className="rounded-lg shadow-sm">
                    <AppointmentCard
                      appointment={appointment}
                      showActions={false}
                    />
                  </div>
                ))}

                {pastAppointments.length === 0 && (
                  <div className="text-center py-8 bg-white border-2 border-gray-200 rounded-lg">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No past appointments found</p>
                  </div>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="referrals">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {pastReferrals.map((referral) => (
                  <div key={referral.id} className="rounded-lg shadow-sm">
                    <ReferralCard referral={referral} showDetails={true} />
                  </div>
                ))}

                {pastReferrals.length === 0 && (
                  <div className="text-center py-8 bg-white border-2 border-gray-200 rounded-lg">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No past referrals found</p>
                  </div>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HistoryPage;
