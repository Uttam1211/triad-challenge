import { useState } from "react";

interface AppointmentBookingFormProps {
  onSubmit: (data: any) => void;
  doctors?: Array<{ id: string; name: string }>;
}

export const AppointmentBookingForm = ({
  onSubmit,
  doctors = [],
}: AppointmentBookingFormProps) => {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({}); // Add form data here
      }}
    >
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="type">
          Appointment Type
        </label>
        <select
          id="type"
          className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#005EB8] focus:outline-none"
        >
          <option value="GP">GP Appointment</option>
          <option value="Hospital">Hospital Appointment</option>
        </select>
      </div>

      {doctors.length > 0 && (
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="doctor">
            Select Doctor
          </label>
          <select
            id="doctor"
            className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#005EB8] focus:outline-none"
          >
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="date">
          Date
        </label>
        <input
          type="date"
          id="date"
          className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#005EB8] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="time">
          Time
        </label>
        <input
          type="time"
          id="time"
          className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#005EB8] focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#005EB8] text-white py-2 px-4 rounded-md hover:bg-[#004B9C] transition-colors"
      >
        Book Appointment
      </button>
    </form>
  );
};
