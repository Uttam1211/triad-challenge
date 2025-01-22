import { motion } from 'framer-motion';
import { referrals, users } from '../../data/mockData';
import { FileText, Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

const Referrals = () => {
  const getReferralStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDoctorName = (id: string) => {
    const doctor = users.find(user => user.id === id);
    return doctor ? doctor.name : 'Unknown Doctor';
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Referrals</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Incoming Referrals</h2>
          <div className="space-y-4">
            {referrals.map((referral) => (
              <motion.div
                key={referral.id}
                whileHover={{ scale: 1.02 }}
                className="border rounded-md p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <FileText className="text-blue-600" size={20} />
                    <span className="font-medium">Referral #{referral.id}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getReferralStatus(referral.status)}`}>
                    {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <Calendar size={16} />
                  <span>{format(new Date(referral.date), 'MMMM do, yyyy')}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{getDoctorName(referral.fromDoctorId)}</span>
                  <ArrowRight size={16} />
                  <span>{getDoctorName(referral.toDoctorId)}</span>
                </div>
                <p className="mt-2 text-gray-700">{referral.reason}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Create New Referral</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="patient">
                Patient
              </label>
              <select
                id="patient"
                className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
              >
                {users.filter(user => user.role === 'patient').map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="doctor">
                Referring To
              </label>
              <select
                id="doctor"
                className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
              >
                {users.filter(user => user.role === 'doctor').map(doctor => (
                  <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="reason">
                Reason for Referral
              </label>
              <textarea
                id="reason"
                rows={4}
                className="w-full border-2 border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
                placeholder="Please provide detailed reason for the referral..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Referral
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Referrals;