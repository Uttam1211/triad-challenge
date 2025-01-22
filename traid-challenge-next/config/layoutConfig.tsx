// config/layoutConfig.ts
import PublicLayout from "@/components/layouts/PublicLayout";
const layoutConfig = {
  publicPaths: [
    "/",
    "/appointments",
    "/availability",
    "/history",
    "/referrals",
  ],
};

const getLayoutType = (pathname: string) => {
  // Helper to check if a route matches a list of paths
  const matchPath = (paths: string[]) =>
    paths.some((path) =>
      path.endsWith("/*")
        ? pathname.startsWith(path.replace("/*", ""))
        : path === pathname
    );

  if (matchPath(layoutConfig.publicPaths)) {
    return PublicLayout; // Return ProtectedLayout if the route matches privatePaths
  }
  return PublicLayout;
};

export default getLayoutType;
