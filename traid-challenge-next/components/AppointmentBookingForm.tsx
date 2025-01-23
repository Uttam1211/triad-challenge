import { useState } from "react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useTranslations } from "next-intl";
import { Info, AlertCircle } from "lucide-react";

type AppointmentType = "GP" | "HOSPITAL";

interface AppointmentBookingFormProps {
  gp: {
    id: number;
    name: string;
  };
  availableSlots: Array<{
    id: number;
    startTime: string;
    endTime: string;
  }>;
  onSubmit: (data: {
    slotId: number;
    notes: string;
    type: AppointmentType;
  }) => void;
}

export const AppointmentBookingForm = ({
  gp,
  availableSlots,
  onSubmit,
}: AppointmentBookingFormProps) => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations("appointments");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;

    try {
      setError(null);
      setIsSubmitting(true);

      await onSubmit({
        slotId: selectedSlot,
        notes,
        type: "GP",
      });
    } catch (err) {
      // Handle API error responses
      if (err instanceof Error) {
        try {
          const errorData = JSON.parse(err.message);
          setError(errorData.message || "Something went wrong");
        } catch {
          // If error message isn't JSON, use it directly
          setError(err.message || "Something went wrong");
        }
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!availableSlots.length) {
    return (
      <div className="space-y-4">
        <Alert variant="destructive" className="border-2 border-[#d5281b]">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-[#d5281b]">
            No appointments are currently available. Please try again later or
            contact your GP surgery directly.
          </AlertDescription>
        </Alert>
        <a
          href="tel:111"
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#005eb8] hover:bg-[#004b93] rounded-md"
        >
          Call NHS 111
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive" className="border-2 border-[#d5281b]">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-[#d5281b]">
            {error}
          </AlertDescription>
        </Alert>
      )}

      <div>
        <label className="block text-sm font-medium mb-1 text-[#212b32]">
          GP
        </label>
        <div className="p-2 border-2 rounded-md bg-gray-50 text-[#212b32]">
          {gp.name}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#212b32]">
          Available Slots
        </label>
        <Select
          onValueChange={(value) => {
            setSelectedSlot(Number(value));
            setError(null);
          }}
          disabled={isSubmitting}
        >
          <SelectTrigger className="bg-white border-2">
            <SelectValue placeholder="Select a time slot" />
          </SelectTrigger>
          <SelectContent>
            {availableSlots.map((slot) => (
              <SelectItem key={slot.id} value={slot.id.toString()}>
                {format(new Date(slot.startTime), "PPP p")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-[#212b32]">
          Notes (Optional)
        </label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any notes for your appointment"
          className="min-h-[100px] bg-white border-2"
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        disabled={!selectedSlot || isSubmitting}
        className="w-full bg-[#005eb8] text-white py-2 px-4 rounded-md hover:bg-[#004b93] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Booking..." : "Book Appointment"}
      </button>
    </form>
  );
};
