import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { ReferralCard } from "../../../components/ReferralCard";
import { DashboardLayout } from "../../../components/layouts/DashboardLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const ReferralsPage = () => {
  const referrals = [
    {
      id: 1,
      date: "2024-03-10",
      fromDoctor: "Dr. Smith",
      toDoctor: "Dr. Johnson",
      status: "pending",
      reason: "Specialist consultation required",
    },
    {
      id: 2,
      date: "2024-03-15",
      fromDoctor: "Dr. Johnson",
      toDoctor: "Dr. Williams",
      status: "accepted",
      reason: "Follow-up treatment",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 bg-white">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Referrals" },
          ]}
        />

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-8 h-8 text-[#005eb8]" />
            <h1 className="text-3xl font-bold text-[#003087]">My Referrals</h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {referrals.map((referral) => (
              <div
                key={referral.id}
                className="bg-white border-2 rounded-lg p-6 shadow-sm"
              >
                <ReferralCard referral={referral} showDetails={true} />
              </div>
            ))}

            {referrals.length === 0 && (
              <div className="text-center py-8 bg-white border-2 rounded-lg">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No referrals found</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReferralsPage;
