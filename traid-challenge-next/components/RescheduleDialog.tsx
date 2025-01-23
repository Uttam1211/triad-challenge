import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { useState } from "react";

interface RescheduleDialogProps {
  availableSlots: Array<{
    id: number;
    startTime: string;
    endTime: string;
  }>;
  onReschedule: (slotId: number) => void;
  children: React.ReactNode;
}

export const RescheduleDialog = ({
  availableSlots,
  onReschedule,
  children,
}: RescheduleDialogProps) => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const handleReschedule = () => {
    if (selectedSlot) {
      onReschedule(selectedSlot);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#212B32]">
            Reschedule Appointment
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Select onValueChange={(value) => setSelectedSlot(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Select new appointment time" />
            </SelectTrigger>
            <SelectContent>
              {availableSlots.map((slot) => (
                <SelectItem key={slot.id} value={slot.id.toString()}>
                  {format(new Date(slot.startTime), "PPP p")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 border-2 border-[#212B32] text-[#212B32] rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleReschedule}
              disabled={!selectedSlot}
              className="px-4 py-2 bg-[#005EB8] text-white rounded-md hover:bg-[#004B9C] disabled:opacity-50"
            >
              Confirm Reschedule
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
