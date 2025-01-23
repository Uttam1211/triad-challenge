import { Bell, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface NotificationPreferencesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (preferences: any) => void;
}

export const NotificationPreferencesDialog = ({
  open,
  onOpenChange,
  onSave,
}: NotificationPreferencesDialogProps) => {
  const [preferences, setPreferences] = useState({
    appointments: true,
    prescriptions: true,
    testResults: true,
    generalUpdates: false,
    emailNotifications: true,
    smsNotifications: false,
  });

  const handleSave = () => {
    onSave(preferences);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6 text-[#005eb8]" />
            <DialogTitle className="text-lg font-bold text-[#003087]">
              Notification Preferences
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-4 border-b border-gray-200 pb-4">
            <h3 className="font-medium text-gray-700">Notification Types</h3>
            {Object.entries({
              appointments: "Appointment Reminders",
              prescriptions: "Prescription Updates",
              testResults: "Test Results",
              generalUpdates: "General Updates",
            }).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-3">
                <Checkbox
                  id={key}
                  checked={preferences[key as keyof typeof preferences]}
                  onCheckedChange={(checked) =>
                    setPreferences({
                      ...preferences,
                      [key]: checked,
                    })
                  }
                  className="text-[#005eb8] data-[state=checked]:bg-[#005eb8] data-[state=checked]:border-[#005eb8]"
                />
                <label htmlFor={key} className="text-gray-700">
                  {label}
                </label>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-700">Delivery Methods</h3>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="email"
                checked={preferences.emailNotifications}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    emailNotifications: checked as boolean,
                  })
                }
                className="text-[#005eb8] data-[state=checked]:bg-[#005eb8] data-[state=checked]:border-[#005eb8]"
              />
              <label htmlFor="email" className="text-gray-700">
                Email Notifications
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="sms"
                checked={preferences.smsNotifications}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    smsNotifications: checked as boolean,
                  })
                }
                className="text-[#005eb8] data-[state=checked]:bg-[#005eb8] data-[state=checked]:border-[#005eb8]"
              />
              <label htmlFor="sms" className="text-gray-700">
                SMS Notifications
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#005eb8] text-white hover:bg-[#003087]"
          >
            Save Preferences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
