// components/layouts/PublicLayout.tsx
import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

type PublicLayoutProps = {
  children: React.ReactNode;
};

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
