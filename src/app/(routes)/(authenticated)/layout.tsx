import React from 'react';
import SideBar from '@/app/components/organisms/SideBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <main className="flex-grow bg-offwhite h-screen">
        {children}
      </main>
    </div>
  );
}

export default Layout;
