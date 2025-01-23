import { Calendar } from "lucide-react";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface AvailabilityCalendarProps {
  selectedDate?: Date;
  timeSlots?: TimeSlot[];
  onDateSelect?: (date: Date) => void;
  onTimeSelect?: (time: string) => void;
}

export const AvailabilityCalendar = ({
  selectedDate,
  timeSlots = [],
  onDateSelect,
  onTimeSelect,
}: AvailabilityCalendarProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-7 gap-4">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
        {Array.from({ length: 35 }).map((_, index) => (
          <div
            key={index}
            onClick={() => onDateSelect?.(new Date())}
            className="border rounded-md p-2 min-h-24 cursor-pointer hover:border-[#005EB8]"
          >
            <div className="text-sm text-gray-500">{index + 1}</div>
            {index % 3 === 0 && (
              <div className="mt-1">
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                  <Calendar size={12} className="mr-1" />
                  Available
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
