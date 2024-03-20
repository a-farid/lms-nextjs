import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row h-full">
      <div className="h-[80px] fixed md:pl-56 w-full inset-y-0 z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 fixed left-0 flex-col inset-y-0 z-50 ">
        <Sidebar />
      </div>
      <div className="md:ml-56 mt-[80px] p-4 w-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
