import { motion } from "framer-motion";

export default function Home() {

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h1>Home</h1>
        </motion.div>
      </main>
    </div>
  );
}
