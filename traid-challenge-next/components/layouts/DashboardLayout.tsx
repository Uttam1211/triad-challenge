import Link from "next/link";
import { useRouter } from "next/router";
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  History,
  ClipboardList,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();
  const isActive = (path: string) => router.pathname.includes(path);

  const navItems = [
    {
      href: "/dashboard/appointments",
      label: "Appointments",
      icon: Calendar,
    },
    {
      href: "/dashboard/availability",
      label: "Availability",
      icon: ClipboardList,
    },
    {
      href: "/dashboard/referrals",
      label: "Referrals",
      icon: FileText,
    },
    {
      href: "/dashboard/history",
      label: "History",
      icon: History,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/dashboard" className="flex items-center">
                <span className="text-xl font-bold text-[#005EB8]">
                  NHS Portal
                </span>
              </Link>
            </div>
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    isActive(item.href)
                      ? "text-[#005EB8] border-b-2 border-[#005EB8]"
                      : "text-gray-500 hover:text-[#005EB8]"
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
};
