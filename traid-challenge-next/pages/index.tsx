import { useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useState } from "react";

<<<<<<< HEAD
// Define the type for the image box props
type ImageBoxProps = {
  imageUrl: string;
  title: string;
  description: string;
};

// ImageBox Component
const ImageBox = ({ imageUrl, title, description }: ImageBoxProps) => {
  const [isHovered, setIsHovered] = useState(false);
=======
export default function Home() {
  const router = useRouter();
>>>>>>> 4d99a3c5ebe9887a573002c1ef9c51d06490a88c

  useEffect(() => {
    const checkUserAndRedirect = () => {
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        try {
          const user = JSON.parse(currentUser);
          router.replace(user.role === "admin" ? "/admin" : "/dashboard");
        } catch (error) {
          router.replace("/login");
        }
      } else {
        router.replace("/login");
      }
    };

    checkUserAndRedirect();
  }, [router]);

  // Show loading state while redirecting
  return (
<<<<<<< HEAD
    <motion.div
      className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-4 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-center">{description}</p>
      </motion.div>
    </motion.div>
  );
};

// Main Content Component
const MainContent = () => {
  // Dynamic data for the image boxes
  const imageBoxes = [
    {
      imageUrl: "https://via.placeholder.com/400x200",
      title: "General Practitioners",
      description: "Find and book appointments with your local GP.",
    },
    {
      imageUrl: "https://via.placeholder.com/400x200",
      title: "Emergency Care",
      description: "Access emergency services when you need them most.",
    },
    {
      imageUrl: "https://via.placeholder.com/400x200",
      title: "Mental Health Support",
      description: "Get help and support for mental health issues.",
    },
  ];

  return (
    <main className="container mx-auto py-8 px-4">
      {/* Welcome Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Welcome to the NHS
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The National Health Service (NHS) is here to provide you with the best
          healthcare services. Whether you need medical advice, treatment, or
          support, we are here to help.
        </p>
      </section>

      {/* Image Boxes Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imageBoxes.map((box, index) => (
            <ImageBox
              key={index}
              imageUrl={box.imageUrl}
              title={box.title}
              description={box.description}
            />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Contact Us</h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions or need assistance, please don't hesitate to
          contact us at{" "}
          <a
            href="mailto:help@nhs.uk"
            className="text-blue-600 hover:underline"
          >
            help@nhs.uk
          </a>
          .
        </p>
      </section>
    </main>
  );
};

// Home Page Component
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Your existing header component */}
      {/* <Header /> */}

      {/* Main Content */}
      <MainContent />

      {/* Your existing footer component */}
      {/* <Footer /> */}
=======
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{
            rotate: 360,
            transition: { duration: 1, repeat: Infinity, ease: "linear" },
          }}
          className="w-12 h-12 border-4 border-[#005eb8] border-t-transparent rounded-full mx-auto mb-4"
        />
        <p className="text-[#005eb8] font-medium">
          Redirecting to your dashboard...
        </p>
      </motion.div>
>>>>>>> 4d99a3c5ebe9887a573002c1ef9c51d06490a88c
    </div>
  );
};

export default HomePage;