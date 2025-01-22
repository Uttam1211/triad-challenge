import Link from "next/link";
import Image from "next/image";

const header = () => {
  return (
    <>
    <header className="bg-blue-600 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
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
          </div>
        </div>
      </header>
    </>
  )
}

export default header