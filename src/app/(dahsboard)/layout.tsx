import Navbar from "@/components/Navbar/Navbar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen pb-3  bg-gradient-to-bl from-blue-200 to-blue-400">
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
