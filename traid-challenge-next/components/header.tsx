import Link from "next/link";
import Image from "next/image";

const Header = () => {
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
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;