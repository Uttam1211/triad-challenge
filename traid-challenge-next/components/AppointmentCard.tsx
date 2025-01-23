import { Calendar, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { RescheduleDialog } from "./RescheduleDialog";

export interface AppointmentCardProps {
  appointment: {
    id: number;
    freeSlot: {
      startTime: string;
      endTime: string;
    };
    status: "SCHEDULED" | "CANCELLED" | "RESCHEDULED";
    notes?: string;
    gp: {
      name: string;
    };
  };
  showActions?: boolean;
  onReschedule?: (id: number, newSlotId: number) => void;
  onCancel?: (id: number) => void;
  availableSlots?: Array<{
    id: number;
    startTime: string;
    endTime: string;
  }>;
}

export const AppointmentCard = ({
  appointment,
  showActions = false,
  onReschedule,
  onCancel,
  availableSlots,
}: AppointmentCardProps) => {
  return (
    <div className="border rounded-md p-4 hover:border-[#005EB8] transition-colors">
      <div className="flex items-center space-x-3 mb-2">
        <Calendar className="text-[#005EB8]" size={20} />
        <span className="text-gray-800">
          {format(new Date(appointment.freeSlot.startTime), "MMMM do, yyyy")}
        </span>
      </div>
      <div className="flex items-center space-x-3 mb-2">
        <Clock className="text-[#005EB8]" size={20} />
        <span className="text-gray-800">
          {format(new Date(appointment.freeSlot.startTime), "h:mm a")}
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <MapPin className="text-[#005EB8]" size={20} />
        <span className="text-gray-800">Dr. {appointment.gp.name}</span>
      </div>
      {appointment.notes && (
        <div className="mt-2 text-sm text-gray-600">
          Notes: {appointment.notes}
        </div>
      )}
      {showActions && (
        <div className="flex space-x-4 mt-4">
          <RescheduleDialog
            availableSlots={availableSlots || []}
            onReschedule={(newSlotId) =>
              onReschedule?.(appointment.id, newSlotId)
            }
          >
            <button className="flex-1 bg-[#005EB8] text-white px-4 py-2 rounded-md hover:bg-[#004B9C] transition-colors">
              Reschedule
            </button>
          </RescheduleDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                Cancel
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-[#212B32]">
                  Cancel Appointment
                </AlertDialogTitle>
                <AlertDialogDescription className="text-[#4C6272]">
                  Are you sure you want to cancel this appointment with Dr.{" "}
                  {appointment.gp.name} on{" "}
                  {format(
                    new Date(appointment.freeSlot.startTime),
                    "MMMM do, yyyy 'at' h:mm a"
                  )}
                  ? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-2 border-[#212B32] text-[#212B32] hover:bg-gray-100">
                  Keep Appointment
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onCancel?.(appointment.id)}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Yes, Cancel Appointment
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
};
