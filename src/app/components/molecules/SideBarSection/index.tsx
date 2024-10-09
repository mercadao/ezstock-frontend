import React from 'react';
import SiderBarItem from '@/app/components/atoms/SideBarItem';
import Divider from '@/app/components/atoms/Divider';

interface SideBarSectionProps {
  title: string;
  items: { icon: React.ReactNode; text: string; href: string }[];
  isClosed: boolean;
}

export default function SideBarSection({ title, items, isClosed }: SideBarSectionProps) {
  return (
    <div className="flex flex-col gap-4 mx-2 py-[10px]">
      <Divider />
      {!isClosed && (
        <h2 className="text-offgray font-semibold text-sm">{title}</h2>
      )}
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <SiderBarItem
            key={index}
            icon={item.icon}
            text={item.text}
            href={item.href}
            isClosed={isClosed}
          />
        ))}
      </div>
    </div>
  );
}
