import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#005EB8] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          {/* NHS Logo */}
          <div className="mb-4">
            <Link href="/">
              <Image
                src="https://res.cloudinary.com/dizmp8obn/image/upload/v1737552925/NHS_10mm_-_RGB_Blue_on_white_skpxah.jpg"
                alt="NHS Logo"
                width={120}
                height={40}
              />
            </Link>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://www.nhs.uk/accessibility/"
              className="hover:underline text-sm"
            >
              Accessibility
            </Link>
            <Link
              href="https://www.nhs.uk/our-policies/privacy-policy/"
              className="hover:underline text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="https://www.nhs.uk/our-policies/cookies-policy/"
              className="hover:underline text-sm"
            >
              Cookies
            </Link>
            <Link
              href="https://www.nhs.uk/contact-us/"
              className="hover:underline text-sm"
            >
              Contact Us
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm mt-4">
            © {new Date().getFullYear()} NHS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;