import { motion } from "framer-motion";
import { AvailabilityCalendar } from "../../../components/AvailabilityCalendar";
import { DashboardLayout } from "../../../components/layouts/DashboardLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const UserAvailability = () => {
  return (
    <DashboardLayout>
      <div className="p-8 bg-white">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Availability" },
          ]}
        />
        <h1 className="text-3xl font-bold mb-8 text-[#003087]">
          Check Availability
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-8"
        >
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-[#005EB8]">
              Available Time Slots
            </h2>
            <AvailabilityCalendar
              onDateSelect={(date) => console.log("Selected date:", date)}
              onTimeSelect={(time) => console.log("Selected time:", time)}
            />
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default UserAvailability;
