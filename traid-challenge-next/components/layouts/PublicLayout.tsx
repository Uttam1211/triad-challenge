// components/layouts/PublicLayout.tsx
import React from "react";
import Header from "../header";
import Footer from "../footer";

type PublicLayoutProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

const PublicLayout: React.FC<PublicLayoutProps> = ({
  children,
  header = <Header />,
  footer = <Footer />,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {header}
      <main className="flex-grow container mx-auto max-w-7xl px-5 my-5">
        {children}
      </main>
      {footer}
    </div>
  );
};

export default PublicLayout;
