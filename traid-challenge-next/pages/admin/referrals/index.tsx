import { motion } from "framer-motion";
import { ReferralCard } from "../../../components/ReferralCard";
import { AdminLayout } from "../../../components/layouts/AdminLayout";

const AdminReferrals = () => {
  const referrals = [
    {
      id: 1,
      date: "2024-03-10",
      fromDoctor: "Dr. Smith",
      toDoctor: "Dr. Johnson",
      status: "pending",
      reason: "Specialist consultation required",
    },
  ];

  const doctors = [
    { id: "1", name: "Dr. Smith" },
    { id: "2", name: "Dr. Johnson" },
    { id: "3", name: "Dr. Williams" },
  ];

  return (
    <AdminLayout>
      <div className="p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-[#005EB8]">
          Manage Referrals
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#005EB8]">
              Pending Referrals
            </h2>
            <div className="space-y-4">
              {referrals.map((referral) => (
                <ReferralCard
                  key={referral.id}
                  referral={referral}
                  showDetails={true}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#005EB8]">
              Create Referral
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="fromDoctor"
                >
                  From Doctor
                </label>
                <select
                  id="fromDoctor"
                  className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#005EB8] focus:outline-none"
                >
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="toDoctor"
                >
                  To Doctor
                </label>
                <select
                  id="toDoctor"
                  className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#005EB8] focus:outline-none"
                >
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="reason"
                >
                  Reason for Referral
                </label>
                <textarea
                  id="reason"
                  rows={4}
                  className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#005EB8] focus:outline-none"
                  placeholder="Please provide detailed reason for the referral..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#005EB8] text-white py-2 px-4 rounded-md hover:bg-[#004B9C] transition-colors"
              >
                Create Referral
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReferrals;
