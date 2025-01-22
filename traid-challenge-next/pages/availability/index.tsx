import { motion } from 'framer-motion';
import { users } from '../../data/mockData';
import { Calendar } from 'lucide-react';

const Availability = () => {
  const doctors = users.filter(user => user.role === 'doctor');
  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Doctor Availability</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="grid grid-cols-7 gap-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center font-semibold">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }).map((_, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="border rounded-md p-2 min-h-24 cursor-pointer hover:border-blue-500"
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
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Set Availability</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="doctor">
              Doctor
            </label>
            <select
              id="doctor"
              className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
            >
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Available Time Slots
            </label>
            <div className="grid grid-cols-3 gap-4">
              {timeSlots.map(time => (
                <label key={time} className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox text-blue-600" />
                  <span>{time}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Availability
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Availability;