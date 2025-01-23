import { motion } from "framer-motion";
import { ChevronRight, Mail, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DashboardLayout } from "../../../components/layouts/DashboardLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <DashboardLayout>
      <div className="p-8 bg-white">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Contact Us" },
          ]}
        />
        <h1 className="text-3xl font-bold mb-8 text-[#003087]">Contact Us</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-2 rounded-lg p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-[#005eb8] focus:outline-none"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                required
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-[#005eb8] focus:outline-none"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={6}
                className="w-full p-3 border-2 border-gray-300 rounded-md focus:border-[#005eb8] focus:outline-none"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center bg-[#005eb8] text-white px-6 py-3 rounded-md hover:bg-[#003087] transition-colors"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </button>
            </div>
          </form>
        </motion.div>

        <div className="mt-8 bg-blue-50 border-l-4 border-[#005eb8] p-4 rounded-r-md">
          <h2 className="text-lg font-bold text-[#003087] mb-2">
            Need urgent help?
          </h2>
          <p className="text-gray-600">
            For medical emergencies, please call 999. For non-emergency medical
            advice, contact NHS 111.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContactPage;
