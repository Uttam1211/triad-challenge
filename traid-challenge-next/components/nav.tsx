import Link from "next/link";
import { Calendar, Clock, User, FileText } from "lucide-react";
import { useRouter } from "next/router";



const Nav = () => {
    const router = useRouter();
    const isActive = (path: string) => router.pathname === path;
  return (
    <nav className="bg-white border-b border-gray-200 mx-5">
      <div className="container mx-auto">
        <div className="flex space-x-4 p-4">
          <Link
      href="/appointments"
      className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
        isActive("/appointments")
          ? "bg-blue-100 text-blue-700"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Calendar size={20} />
      <span>Appointments</span>
    </Link>
    <Link
      href="/availability"
      className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
        isActive("/availability")
          ? "bg-blue-100 text-blue-700"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Clock size={20} />
      <span>Availability</span>
    </Link>
    <Link
      href="/history"
      className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
        isActive("/history")
          ? "bg-blue-100 text-blue-700"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <User size={20} />
      <span>History</span>
    </Link>
    <Link
      href="/referrals"
      className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
        isActive("/referrals")
          ? "bg-blue-100 text-blue-700"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <FileText size={20} />
      <span>Referrals</span>
    </Link>
  </div>
</div>
    </nav>
  );
};

export default Nav;
