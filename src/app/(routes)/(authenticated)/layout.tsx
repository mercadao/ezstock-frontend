"use client";

import React, { useState } from 'react';
import SideBar from '@/app/components/organisms/SideBar';

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
      <div className={`fixed top-0 left-0 h-full ${isSidebarClosed ? 'w-[75px]' : 'w-sidebar-width'} transition-all duration-300`}>
        <SideBar onToggle={handleToggleSidebar} />
      </div>
      <main className={`flex-grow ${isSidebarClosed ? 'ml-[100px]' : 'ml-sidebar-width'} bg-offwhite h-full min-h-screen transition-all duration-300`}>
        {children}
      </main>
    </div>
  );
}

export default Layout;
