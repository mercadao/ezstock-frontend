import React from 'react';
import Link from 'next/link';

interface SiderBarItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  isClosed: boolean;
}

export default function SiderBarItem({ icon, text, href, isClosed }: SiderBarItemProps) {
  return (
    <a
      className={`flex items-center gap-4 px-4 py-2 rounded-lg w-full text-textGray
      hover:text-white hover:bg-primary-400 hover:cursor-pointer transition-all duration-300 ${
        isClosed ? 'justify-center' : ''
      }`}
      href={href}
    >
      {icon}
      {!isClosed && <p>{text}</p>}
    </a>
  );
}
