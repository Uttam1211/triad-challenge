import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function withAuth(
  WrappedComponent: React.ComponentType,
  requiredRole?: "admin" | "user"
) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = () => {
        const currentUser = localStorage.getItem("currentUser");
        if (!currentUser) {
          router.replace("/login");
          return;
        }

        const user = JSON.parse(currentUser);
        if (requiredRole && user.role !== requiredRole) {
          router.replace("/");
          return;
        }

        setLoading(false);
      };

      checkAuth();
    }, [router]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-[#005eb8]">Loading...</div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}
