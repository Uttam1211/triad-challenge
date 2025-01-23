"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  Globe,
  Bell,
  Eye,
  Moon,
  Volume2,
  Shield,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "../../../components/layouts/DashboardLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NotificationPreferencesDialog } from "@/components/NotificationPreferencesDialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettingsStore } from "@/stores/settingsStore";
import { useTranslations } from "next-intl";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: (
        await import(
          `../../../messages/${locale === "default" ? "en" : locale}.json`
        )
      ).default,
    },
  };
}

interface SettingsPageProps {
  onLocaleChange: (locale: string) => void;
}

const AccountSettings = ({ onLocaleChange }: SettingsPageProps) => {
  const router = useRouter();
  const t = useTranslations("settings");
  const commonT = useTranslations("common");
  const {
    language,
    textSize,
    notifications,
    setLanguage,
    setTextSize,
    setNotifications,
  } = useSettingsStore();
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "cy", name: "Cymraeg (Welsh)" },
    { code: "ur", name: "اردو (Urdu)" },
    { code: "pl", name: "Polski (Polish)" },
    { code: "bn", name: "বাংলা (Bengali)" },
  ];

  const textSizes = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ];

  useEffect(() => {
    // Apply text size to document root
    document.documentElement.setAttribute("data-text-size", textSize);
  }, [textSize]);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    onLocaleChange(newLanguage);
  };

  const handleNotificationSave = (preferences: any) => {
    setNotifications(preferences);
  };

  return (
    <DashboardLayout>
      <div className="p-8 bg-white" data-text-size={textSize}>
        <Breadcrumbs
          items={[
            { label: commonT("dashboard"), href: "/dashboard" },
            { label: t("title") },
          ]}
        />
        <h1 className="text-3xl font-bold mb-8 text-[#003087]">{t("title")}</h1>

        <div className="grid gap-8 max-w-4xl">
          {/* Language Settings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-2 rounded-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="w-6 h-6 text-[#005eb8]" />
              <h2 className="text-xl font-bold text-[#003087]">
                {t("language.title")}
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                Select your preferred language for the NHS portal
              </p>
              <div className="max-w-xs">
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("language.select")} />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.section>

          {/* Accessibility Settings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-2 rounded-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="w-6 h-6 text-[#005eb8]" />
              <h2 className="text-xl font-bold text-[#003087]">Text Size</h2>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-gray-600 mb-3">Text Size</p>
                <div className="flex space-x-4">
                  {textSizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setTextSize(size.value as any)}
                      className={`px-4 py-2 rounded-md border-2 ${
                        textSize === size.value
                          ? "border-[#005eb8] bg-[#005eb8] text-white"
                          : "border-gray-200 hover:border-[#005eb8]"
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Moon className="w-5 h-5 text-[#005eb8]" />
                  <span className="text-gray-600">Dark Mode</span>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    darkMode ? "bg-[#005eb8]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      darkMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Volume2 className="w-5 h-5 text-[#005eb8]" />
                  <span className="text-gray-600">Sound Effects</span>
                </div>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    soundEnabled ? "bg-[#005eb8]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      soundEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.section>

          {/* Notification Settings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-2 rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-6 h-6 text-[#005eb8]" />
                <h2 className="text-xl font-bold text-[#003087]">
                  Notifications
                </h2>
              </div>
              <Button
                onClick={() => setNotificationDialogOpen(true)}
                variant="outline"
                className="border-[#005eb8] text-[#005eb8] hover:bg-[#005eb8] hover:text-white"
              >
                Manage Preferences
              </Button>
            </div>
            <p className="mt-2 text-gray-600">
              Choose how and when you want to receive notifications about
              appointments, prescriptions, and other important updates.
            </p>
          </motion.section>

          {/* Privacy Settings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-2 rounded-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-[#005eb8]" />
              <h2 className="text-xl font-bold text-[#003087]">Privacy</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                Manage your privacy settings and data sharing preferences.
              </p>
              <Button
                variant="outline"
                className="border-[#005eb8] text-[#005eb8] hover:bg-[#005eb8] hover:text-white"
              >
                View Privacy Settings
              </Button>
            </div>
          </motion.section>

          {/* Information Box */}
          <div className="bg-blue-50 border-l-4 border-[#005eb8] p-4 rounded-r-md">
            <h3 className="font-bold text-[#003087] mb-2">Need help?</h3>
            <p className="text-sm text-gray-700">
              If you need assistance with your account settings, please contact
              our support team through the{" "}
              <Link
                href="/dashboard/contact"
                className="text-[#005eb8] hover:underline"
              >
                Contact Us
              </Link>{" "}
              page.
            </p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-[#005eb8] text-white px-6 py-3 rounded-md hover:bg-[#003087] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <NotificationPreferencesDialog
        open={notificationDialogOpen}
        onOpenChange={setNotificationDialogOpen}
        onSave={handleNotificationSave}
      />
    </DashboardLayout>
  );
};

export default AccountSettings;
