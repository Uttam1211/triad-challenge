import "@/styles/globals.css";
import type { AppProps } from "next/app";
import getLayoutType from "@/config/layoutConfig";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  const locale = router.locale || "en";

  // Handle locale change
  const handleLocaleChange = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const Layout = getLayoutType(router.pathname); // Fallback to a default layout

  return (
    <NextIntlClientProvider
      messages={pageProps.messages}
      locale={locale === "default" ? "en" : locale}
    >
      <Layout>
        <Component {...pageProps} onLocaleChange={handleLocaleChange} />
      </Layout>
    </NextIntlClientProvider>
  );
}
