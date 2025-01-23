import { Calendar, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";

export interface Appointment {
  id: number;
  date: string;
  time: string;
  type: string;
  status: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  showActions?: boolean;
  onReschedule?: (id: number) => void;
  onCancel?: (id: number) => void;
}

export const AppointmentCard = ({
  appointment,
  showActions = false,
  onReschedule,
  onCancel,
}: AppointmentCardProps) => {
  return (
    <div className="border rounded-md p-4 hover:border-[#005EB8] transition-colors">
      <div className="flex items-center space-x-3 mb-2">
        <Calendar className="text-[#005EB8]" size={20} />
        <span className="text-gray-800">
          {format(new Date(appointment.date), "MMMM do, yyyy")}
        </span>
      </div>
      <div className="flex items-center space-x-3 mb-2">
        <Clock className="text-[#005EB8]" size={20} />
        <span className="text-gray-800">{appointment.time}</span>
      </div>
      <div className="flex items-center space-x-3">
        <MapPin className="text-[#005EB8]" size={20} />
        <span className="text-gray-800">{appointment.type} Appointment</span>
      </div>
      {showActions && (
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => onReschedule?.(appointment.id)}
            className="flex-1 bg-[#005EB8] text-white px-4 py-2 rounded-md hover:bg-[#004B9C] transition-colors"
          >
            Reschedule
          </button>
          <button
            onClick={() => onCancel?.(appointment.id)}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
