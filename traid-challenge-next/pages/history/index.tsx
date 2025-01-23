import { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, Edit, Trash } from 'lucide-react';
import { format, isBefore, isAfter } from 'date-fns';

const AppointmentHistory = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Dummy data for appointments
  const appointments = [
    {
      id: 1,
      date: '2025-03-15',
      time: '10:00 AM',
      type: 'GP',
      status: 'scheduled',
    },
    {
      id: 2,
      date: '2023-11-20',
      time: '02:30 PM',
      type: 'GP',
      status: 'completed',
    },
    {
      id: 3,
      date: '2024-03-05',
      time: '09:00 AM',
      type: 'GP',
      status: 'scheduled',
    },
    {
      id: 4,
      date: '2025-03-12',
      time: '11:00 AM',
      type: 'Hospital',
      status: 'scheduled',
    },
    {
      id: 5,
      date: '2023-10-10',
      time: '03:00 PM',
      type: 'GP',
      status: 'cancelled',
    },
  ];

  // Filter appointments
  const upcomingAppointments = appointments.filter((appointment) =>
    isAfter(new Date(appointment.date), new Date())
  );
  const pastAppointments = appointments.filter((appointment) =>
    isBefore(new Date(appointment.date), new Date())
  );

  // Handle cancel appointment
  const handleCancel = (id: number) => {
    alert(`Cancel appointment with ID: ${id}`);
    // Add logic to cancel the appointment (e.g., API call)
  };

  // Handle reschedule appointment
  const handleReschedule = (id: number) => {
    alert(`Reschedule appointment with ID: ${id}`);
    // Add logic to reschedule the appointment (e.g., open a modal)
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-[#005EB8]">Appointment History</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'upcoming'
              ? 'bg-[#005EB8] text-white'
              : 'bg-white text-[#005EB8] hover:bg-gray-100'
          }`}
        >
          Upcoming Appointments
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'past'
              ? 'bg-[#005EB8] text-white'
              : 'bg-white text-[#005EB8] hover:bg-gray-100'
          }`}
        >
          Past Appointments
        </button>
      </div>

      {/* Appointment List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-[#005EB8]">
          {activeTab === 'upcoming' ? 'Upcoming Appointments' : 'Past Appointments'}
        </h2>
        <div className="space-y-4">
          {(activeTab === 'upcoming' ? upcomingAppointments : pastAppointments).map(
            (appointment) => (
              <div
                key={appointment.id}
                className="border rounded-md p-4 hover:border-[#005EB8] transition-colors"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="text-[#005EB8]" size={20} />
                  <span className="text-gray-800">
                    {format(new Date(appointment.date), 'MMMM do, yyyy')}
                  </span>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="text-[#005EB8]" size={20} />
                  <span className="text-gray-800">{appointment.time}</span>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <MapPin className="text-[#005EB8]" size={20} />
                  <span className="text-gray-800">{appointment.type} Appointment</span>
                </div>
                <div className="flex items-center space-x-3">
                  {appointment.status.toLowerCase() === 'completed' ? (
                    <CheckCircle className="text-green-600" size={20} />
                  ) : (
                    <XCircle className="text-red-600" size={20} />
                  )}
                  <span className="text-sm text-gray-800">{appointment.status}</span>
                </div>

                {/* Action Buttons for Upcoming Appointments */}
                {activeTab === 'upcoming' && (
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => handleReschedule(appointment.id)}
                      className="flex items-center space-x-2 bg-[#005EB8] text-white px-4 py-2 rounded-md hover:bg-[#004B9C] transition-colors"
                    >
                      <Edit size={16} />
                      <span>Reschedule</span>
                    </button>
                    <button
                      onClick={() => handleCancel(appointment.id)}
                      className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                    >
                      <Trash size={16} />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentHistory;