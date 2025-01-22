import { motion } from 'framer-motion';
import { appointments } from '../../data/mockData';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

const History = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Appointment History</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="border rounded-md p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Calendar className="text-blue-600" size={20} />
                    <span>{format(new Date(appointment.date), 'MMMM do, yyyy')}</span>
                  </div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Clock className="text-blue-600" size={20} />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {appointment.type} Appointment
                  </div>
                </div>
                <div>
                  {appointment.status === 'completed' ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <CheckCircle size={16} className="mr-1" />
                      Completed
                    </span>
                  ) : appointment.status === 'cancelled' ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      <XCircle size={16} className="mr-1" />
                      Cancelled
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      <Calendar size={16} className="mr-1" />
                      Scheduled
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default History;