import { useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUserAndRedirect = () => {
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        try {
          const user = JSON.parse(currentUser);
          router.replace(user.role === "admin" ? "/admin" : "/dashboard");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    </div>
  );
}
