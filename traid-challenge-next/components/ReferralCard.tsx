import { FileText, Calendar } from "lucide-react";
import { format } from "date-fns";

export interface Referral {
  id: number;
  date: string;
  fromDoctor: string;
  toDoctor: string;
  status: string;
  reason?: string;
}

interface ReferralCardProps {
  referral: Referral;
  showDetails?: boolean;
}

export const ReferralCard = ({
  referral,
  showDetails = false,
}: ReferralCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="border rounded-md p-4 hover:border-[#005EB8] transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <FileText className="text-[#005EB8]" size={20} />
          <span className="font-medium">Referral #{referral.id}</span>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            referral.status
          )}`}
        >
          {referral.status}
        </span>
      </div>
      <div className="flex items-center space-x-2 text-gray-600 mb-2">
        <Calendar size={16} />
        <span>{format(new Date(referral.date), "MMMM do, yyyy")}</span>
      </div>
      <div className="text-sm text-gray-600">
        {referral.fromDoctor} → {referral.toDoctor}
      </div>
      {showDetails && referral.reason && (
        <p className="mt-2 text-gray-700">{referral.reason}</p>
      )}
    </div>
  );
};
