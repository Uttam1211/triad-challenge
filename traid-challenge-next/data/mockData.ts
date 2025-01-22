export interface User {
  id: string;
  name: string;
  role: 'patient' | 'doctor';
  email: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'GP' | 'Hospital';
}

export interface Referral {
  id: string;
  patientId: string;
  fromDoctorId: string;
  toDoctorId: string;
  date: string;
  reason: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export const users: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Smith',
    role: 'doctor',
    email: 'sarah.smith@nhs.net'
  },
  {
    id: '2',
    name: 'John Doe',
    role: 'patient',
    email: 'john.doe@example.com'
  }
];

export const appointments: Appointment[] = [
  {
    id: '1',
    patientId: '2',
    doctorId: '1',
    date: '2024-03-20',
    time: '09:00',
    status: 'scheduled',
    type: 'GP'
  }
];

export const referrals: Referral[] = [
  {
    id: '1',
    patientId: '2',
    fromDoctorId: '1',
    toDoctorId: '3',
    date: '2024-03-15',
    reason: 'Specialist consultation required',
    status: 'pending'
  }
];