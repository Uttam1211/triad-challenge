import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Info } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AdminLayout } from "../../../components/layouts/AdminLayout";

// Define types
type AppointmentType = "GP" | "HOSPITAL";

type Appointment = {
  id: number;
  date: string;
  time: string;
  type: AppointmentType;
  status: "scheduled" | "cancelled" | "rescheduled";
  doctor: {
    name: string;
  };
  patient: {
    id: number;
    name: string;
  };
  notes?: string;
};

type Doctor = {
  id: number;
  name: string;
};

type Patient = {
  id: number;
  name: string;
  email: string;
  phone?: string;
};

type AvailableSlot = {
  id: number;
  startTime: string;
  endTime: string;
};

// AppointmentCard Component
const AppointmentCard = ({
  appointment,
  showActions = false,
  onReschedule,
  onCancel,
}: {
  appointment: Appointment;
  showActions?: boolean;
  onReschedule?: (id: number) => void;
  onCancel?: (id: number) => void;
}) => {
  return (
    <div className="border rounded-md p-4 hover:border-[#005EB8] transition-colors">
      <div className="flex items-center space-x-3 mb-2">
        <Calendar className="text-[#005EB8]" size={20} />
        <span className="text-gray-800">
          {appointment.date
            ? format(new Date(appointment.date), "MMMM do, yyyy")
            : "Date not set"}
        </span>
      </div>
      <div className="flex items-center space-x-3 mb-2">
        <Clock className="text-[#005EB8]" size={20} />
        <span className="text-gray-800">
          {appointment.time || "Time not set"}
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <MapPin className="text-[#005EB8]" size={20} />
        <span className="text-gray-800">
          {appointment.doctor?.name
            ? `Dr. ${appointment.doctor.name}`
            : "Doctor not assigned"}
        </span>
      </div>
      {appointment.notes && (
        <div className="mt-2 text-sm text-gray-600">
          Notes: {appointment.notes}
        </div>
      )}
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

// AppointmentBookingForm Component
const AppointmentBookingForm = ({
  gp,
  availableSlots,
  onSubmit,
}: {
  gp: Doctor;
  availableSlots: AvailableSlot[];
  onSubmit: (data: {
    slotId: number;
    notes: string;
    type: AppointmentType;
    patientId?: number;
  }) => void;
}) => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      setError("Please select a time slot.");
      return;
    }

    try {
      setError(null);
      setIsSubmitting(true);

      await onSubmit({
        slotId: selectedSlot,
        notes,
        type: "GP",
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
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
          <Info className="h-4 w-4" />
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
          onValueChange={(value) => setSelectedSlot(Number(value))}
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

// AdminAppointments Page
const AdminAppointments = () => {
  // Real data for appointments
  const appointments: Appointment[] = [
    {
      id: 1,
      date: "2025-03-15",
      time: "10:00 AM",
      type: "GP",
      status: "scheduled",
      doctor: {
        name: "Dr. Smith",
      },
      patient: {
        id: 1,
        name: "John Doe",
      },
      notes: "Follow-up on previous treatment",
    },
    {
      id: 2,
      date: "2025-03-16",
      time: "11:00 AM",
      type: "HOSPITAL",
      status: "cancelled",
      doctor: {
        name: "Dr. Johnson",
      },
      patient: {
        id: 2,
        name: "Jane Smith",
      },
    },
  ];

  // Real data for doctors
  const doctors: Doctor[] = [
    { id: 1, name: "Dr. Smith" },
    { id: 2, name: "Dr. Johnson" },
  ];

  // Real data for patients
  const patients: Patient[] = [
    { id: 1, name: "Mark Shelby", email: "mark@gmail.com", phone: "123-456-7890" },
    { id: 2, name: "Jane Smith", email: "smith@gmail.com", phone: "987-654-3210" },
  ];

  // Real data for available slots
  const availableSlots: AvailableSlot[] = [
    {
      id: 1,
      startTime: "2025-03-15T10:00:00",
      endTime: "2025-03-15T10:30:00",
    },
    {
      id: 2,
      startTime: "2025-03-15T11:00:00",
      endTime: "2025-03-15T11:30:00",
    },
    {
      id: 3,
      startTime: "2025-03-16T09:00:00",
      endTime: "2025-03-16T09:30:00",
    },
  ];

  // State for patient search
  const [patientId, setPatientId] = useState<number | null>(null);
  const [searchedPatient, setSearchedPatient] = useState<Patient | null>(null);

  // Handle patient search
  const handleSearchPatient = () => {
    const patient = patients.find((p) => p.id === patientId);
    if (patient) {
      setSearchedPatient(patient);
    } else {
      alert("Patient not found.");
    }
  };

  return (
    <AdminLayout>
      <div className="p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-[#005EB8]">
          Manage Appointments
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* All Appointments Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#005EB8]">
              All Appointments
            </h2>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  showActions={true}
                  onReschedule={(id) => console.log("Reschedule", id)}
                  onCancel={(id) => console.log("Cancel", id)}
                />
              ))}
            </div>
          </motion.div>

          {/* Create Appointment Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#005EB8]">
              Create Appointment
            </h2>

            {/* Patient Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-[#212b32]">
                Search Patient by ID
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Enter Patient ID"
                  value={patientId || ""}
                  onChange={(e) => setPatientId(Number(e.target.value))}
                  className="w-full p-2 border-2 rounded-md"
                />
                <button
                  onClick={handleSearchPatient}
                  className="bg-[#005eb8] text-white px-4 py-2 rounded-md hover:bg-[#004b93] transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Display Searched Patient */}
            {searchedPatient && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-[#005EB8]">
                  Patient Details
                </h3>
                <div className="p-4 border-2 rounded-md bg-gray-50">
                  <p><strong>Name:</strong> {searchedPatient.name}</p>
                  <p><strong>Email:</strong> {searchedPatient.email}</p>
                  <p><strong>Phone:</strong> {searchedPatient.phone || "N/A"}</p>
                </div>
              </div>
            )}

            {/* Appointment Booking Form */}
            <AppointmentBookingForm
              onSubmit={(data) => {
                if (searchedPatient) {
                  console.log("Create appointment for patient:", searchedPatient.id, data);
                } else {
                  alert("Please search for a patient first.");
                }
              }}
              gp={doctors[0]}
              availableSlots={availableSlots}
            />
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAppointments;