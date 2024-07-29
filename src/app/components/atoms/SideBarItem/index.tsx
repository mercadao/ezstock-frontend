import React from 'react';
import Link from 'next/link';

interface SiderBarItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
}

export default function SiderBarItem({ icon, text, href }: SiderBarItemProps) {
  return (
      <a className="flex items-center gap-4 px-4 py-2 rounded-lg
      w-[200px] text-textGray 
      hover:text-white hover:bg-primary-400 hover:cursor-pointer"
        href={href}
      >
        {icon}
        <p>{text}</p>
      </a>
  );
}
