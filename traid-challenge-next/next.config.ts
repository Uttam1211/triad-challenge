import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["default", "en", "cy", "ur", "pl", "bn"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/dashboard`
    defaultLocale: "default",
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    localeDetection: false,
  },
  images: {
    domains: ["avatars.githubusercontent.com", "res.cloudinary.com"],
  },
};

export default nextConfig;
