import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  language: string;
  textSize: "small" | "medium" | "large";
  notifications: {
    appointments: boolean;
    prescriptions: boolean;
    testResults: boolean;
    generalUpdates: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
  };
  setLanguage: (language: string) => void;
  setTextSize: (size: "small" | "medium" | "large") => void;
  setNotifications: (
    notifications: Partial<SettingsState["notifications"]>
  ) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: "en",
      textSize: "medium",
      notifications: {
        appointments: true,
        prescriptions: true,
        testResults: true,
        generalUpdates: false,
        emailNotifications: true,
        smsNotifications: false,
      },
      setLanguage: (language) => set({ language }),
      setTextSize: (textSize) => set({ textSize }),
      setNotifications: (notifications) =>
        set((state) => ({
          notifications: { ...state.notifications, ...notifications },
        })),
    }),
    {
      name: "nhs-settings",
    }
  )
);
