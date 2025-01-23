import { motion } from "framer-motion";
import { ReferralCard } from "../../../components/ReferralCard";
import { AdminLayout } from "../../../components/layouts/AdminLayout";
import { useState } from "react";

// Define types
type Referral = {
  id: number;
  date: string;
  fromDoctor: string;
  toDoctor: string;
  status: "pending" | "completed" | "rejected";
  reason: string;
  patientId?: number; // Add patientId to referral
};

type Doctor = {
  id: string;
  name: string;
};

type Patient = {
  id: number;
  name: string;
  email: string;
  phone?: string;
};

const AdminReferrals = () => {
  // Mock referrals data
  const referrals: Referral[] = [
    {
      id: 1,
      date: "2024-03-10",
      fromDoctor: "Dr. Smith",
      toDoctor: "Dr. Johnson",
      status: "pending",
      reason: "Specialist consultation required",
      patientId: 1, // Add patientId to referral
    },
  ];

  // Mock doctors data
  const doctors: Doctor[] = [
    { id: "1", name: "Dr. Smith" },
    { id: "2", name: "Dr. Johnson" },
    { id: "3", name: "Dr. Williams" },
  ];

  // Mock patients data
  const patients: Patient[] = [
    { id: 1, name: "Mark Shelby", email: "mark@gmail.com", phone: "123-456-7890" },
    { id: 2, name: "Jake", email: "jake@apple.com", phone: "987-654-3210" },
  ];

  // State for patient search
  const [patientId, setPatientId] = useState<number | null>(null);
  const [searchedPatient, setSearchedPatient] = useState<Patient | null>(null);

  // State for referral creation form
  const [fromDoctorId, setFromDoctorId] = useState<string>("");
  const [toDoctorId, setToDoctorId] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  // Handle patient search
  const handleSearchPatient = () => {
    const patient = patients.find((p) => p.id === patientId);
    if (patient) {
      setSearchedPatient(patient);
    } else {
      alert("Patient not found.");
    }
  };

  // Handle referral creation
  const handleCreateReferral = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchedPatient) {
      alert("Please search for a patient first.");
      return;
    }

    if (!fromDoctorId || !toDoctorId || !reason) {
      alert("Please fill in all fields.");
      return;
    }

    const fromDoctor = doctors.find((d) => d.id === fromDoctorId)?.name || "Unknown";
    const toDoctor = doctors.find((d) => d.id === toDoctorId)?.name || "Unknown";

    const newReferral: Referral = {
      id: referrals.length + 1,
      date: new Date().toISOString().split("T")[0],
      fromDoctor,
      toDoctor,
      status: "pending",
      reason,
      patientId: searchedPatient.id,
    };

    // Add the new referral to the list (mock implementation)
    referrals.push(newReferral);

    // Reset form
    setFromDoctorId("");
    setToDoctorId("");
    setReason("");
    setSearchedPatient(null);
    setPatientId(null);

    alert("Referral created successfully!");
  };

  return (
    <AdminLayout>
      <div className="p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8 text-[#005EB8]">
          Manage Referrals
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Pending Referrals Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#005EB8]">
              Pending Referrals
            </h2>
            <div className="space-y-4">
              {referrals.map((referral) => (
                <ReferralCard
                  key={referral.id}
                  referral={referral}
                  showDetails={true}
                />
              ))}
            </div>
          </motion.div>

          {/* Create Referral Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4 text-[#005EB8]">
              Create Referral
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

            {/* Referral Creation Form */}
            <form onSubmit={handleCreateReferral} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="fromDoctor"
                >
                  From Doctor
                </label>
                <select
                  id="fromDoctor"
                  value={fromDoctorId}
                  onChange={(e) => setFromDoctorId(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#005EB8] focus:outline-none"
                >
                  <option value="" disabled>
                    Select a doctor
                  </option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="toDoctor"
                >
                  To Doctor
                </label>
                <select
                  id="toDoctor"
                  value={toDoctorId}
                  onChange={(e) => setToDoctorId(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#005EB8] focus:outline-none"
                >
                  <option value="" disabled>
                    Select a doctor
                  </option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="reason"
                >
                  Reason for Referral
                </label>
                <textarea
                  id="reason"
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-[#005EB8] focus:outline-none"
                  placeholder="Please provide detailed reason for the referral..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#005EB8] text-white py-2 px-4 rounded-md hover:bg-[#004B9C] transition-colors"
              >
                Create Referral
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReferrals;