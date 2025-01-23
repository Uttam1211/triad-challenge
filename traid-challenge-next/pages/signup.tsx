import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Mail, Lock, User, Info } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<"user" | "admin">("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users.find((u: any) => u.email === email);

      if (existingUser) {
        setError("Email already exists");
        return;
      }

      const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      router.push(role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50 flex flex-col justify-center -mt-20 py-12 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={fadeIn}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <Image
          src="https://res.cloudinary.com/dizmp8obn/image/upload/v1737552925/NHS_10mm_-_RGB_Blue_on_white_skpxah.jpg"
          alt="NHS Logo"
          className="mx-auto"
          width={70}
          height={25}
        />
        <motion.h2
          variants={fadeIn}
          className="mt-6 text-center text-3xl font-bold text-[#003087]"
        >
          Create your account
        </motion.h2>
        <motion.p
          variants={fadeIn}
          className="mt-2 text-center text-sm text-[#4c6272]"
        >
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#005eb8] hover:text-[#004b93] underline"
          >
            Sign in here
          </Link>
        </motion.p>
      </motion.div>

      <motion.div
        variants={fadeIn}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <Tabs
            defaultValue="user"
            className="w-full"
            onValueChange={(value) => setRole(value as "user" | "admin")}
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                value="user"
                className="data-[state=active]:bg-[#005eb8] data-[state=active]:text-white"
              >
                Patient
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className="data-[state=active]:bg-[#005eb8] data-[state=active]:text-white"
              >
                Admin
              </TabsTrigger>
            </TabsList>

            <motion.form
              variants={staggerChildren}
              onSubmit={handleSignup}
              className="space-y-6"
            >
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Alert
                    variant="destructive"
                    className="border-2 border-[#d5281b]"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <motion.div variants={fadeIn}>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#212b32]"
                >
                  Full name
                </label>
                <div className="mt-1 relative">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 border-2 border-[#4c6272] focus:border-[#005eb8] focus:ring-[#005eb8]"
                  />
                  <User className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </motion.div>

              <motion.div variants={fadeIn}>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#212b32]"
                >
                  Email address
                </label>
                <div className="mt-1 relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-2 border-[#4c6272] focus:border-[#005eb8] focus:ring-[#005eb8]"
                  />
                  <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </motion.div>

              <motion.div variants={fadeIn}>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#212b32]"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-2 border-[#4c6272] focus:border-[#005eb8] focus:ring-[#005eb8]"
                  />
                  <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#005eb8] hover:bg-[#004b93] text-white transition-colors duration-300"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    "Create account"
                  )}
                </Button>
              </motion.div>
            </motion.form>
          </Tabs>

          <motion.div variants={fadeIn} className="mt-6">
            <Alert className="bg-[#fff1cc] border-[#ffb81c]">
              <Info className="h-4 w-4 text-[#ffb81c]" />
              <AlertDescription className="text-[#212b32]">
                By creating an account, you agree to the NHS terms of service
                and privacy policy.
              </AlertDescription>
            </Alert>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
