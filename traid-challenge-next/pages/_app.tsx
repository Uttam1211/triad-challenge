import "@/styles/globals.css";
import type { AppProps } from "next/app";
import getLayoutType from "@/config/layoutConfig";

export default function App({ Component, pageProps, router }: AppProps) {
  const Layout = getLayoutType(router.pathname); // Fallback to a default layout

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
