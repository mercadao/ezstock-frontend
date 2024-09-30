"use client";

import React, { useState } from "react";
import SideBar from "@/app/components/organisms/SideBar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(false);

  const handleToggleSidebar = (isClosed: boolean) => {
    setIsSidebarClosed(isClosed);
  };

  return (
    <div className="flex h-full">
      <div
        className={`fixed top-0 left-0 h-full hidden md:flex ${
          isSidebarClosed ? "w-[75px]" : "w-sidebar-width"
        } transition-all duration-300`}
      >
        <SideBar onToggle={handleToggleSidebar} />
      </div>
      <main
        className={`flex-grow w-full ml-0 ${
          isSidebarClosed ? "md:ml-[100px]" : "md:ml-sidebar-width"
        } bg-offwhite min-h-screen transition-all duration-300`}
      >
        {children}
      </main>
      <ToastContainer />
    </div>
  );
};

export default Layout;
