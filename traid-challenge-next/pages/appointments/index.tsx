import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { appointments } from '../../data/mockData';
import { format } from 'date-fns';

const Appointments = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Book an Appointment</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">Available Appointments</h2>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border rounded-md p-4 hover:border-blue-500 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Calendar className="text-blue-600" size={20} />
                  <span>{format(new Date(appointment.date), 'MMMM do, yyyy')}</span>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="text-blue-600" size={20} />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-blue-600" size={20} />
                  <span>{appointment.type} Appointment</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">Book New Appointment</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="type">
                Appointment Type
              </label>
              <select
                id="type"
                className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
              >
                <option value="GP">GP Appointment</option>
                <option value="Hospital">Hospital Appointment</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date"
                className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="time">
                Time
              </label>
              <input
                type="time"
                id="time"
                className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Book Appointment
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Appointments;