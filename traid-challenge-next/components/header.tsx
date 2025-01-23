import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = () => {
      const currentUser = localStorage.getItem("currentUser");
      setUser(currentUser ? JSON.parse(currentUser) : null);
    };

    checkUser();
    router.events.on("routeChangeComplete", checkUser);

    return () => {
      router.events.off("routeChangeComplete", checkUser);
    };
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    router.push("/login");
  };

  const getInitial = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <>
      <header className="bg-[#005EB8] p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* NHS Logo and Title */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="https://res.cloudinary.com/dizmp8obn/image/upload/v1737552925/NHS_10mm_-_RGB_Blue_on_white_skpxah.jpg"
                alt="NHS Logo"
                className="h-8"
                width={70}
                height={25}
              />
              <span className="text-white font-bold text-xl">
                NHS Booking System
              </span>
            </Link>

            {/* Login/Register Buttons */}
            <div className="flex items-center space-x-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full"
                    >
                      <Avatar className="h-10 w-10 bg-white">
                        <AvatarFallback className="bg-[#004b93] text-white">
                          {getInitial(user.email)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56"
                    align="end"
                    forceMount
                  >
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => router.push(user.role === 'admin' ? '/admin' : '/dashboard')}
                    >
                      {user.role === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 focus:text-red-600"
                      onClick={handleLogout}
                    >
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-white hover:text-gray-200 font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-white text-[#005EB8] px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition duration-300"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};