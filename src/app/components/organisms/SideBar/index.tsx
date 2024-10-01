import { useState } from "react";
import Image from "next/image";
import { ArrowLeftCircleIcon, ArrowRightCircle } from "lucide-react";

import SideBarSection from "@/app/components/molecules/SideBarSection";
import HomeIcon from "../../../../../public/assets/icons/HomeIcon";
import ChartIcon from "../../../../../public/assets/icons/ChartIcon";
import StoreIcon from "../../../../../public/assets/icons/StoreIcon";
import ProductIcon from "../../../../../public/assets/icons/ProductIcon";
import ClientIcon from "../../../../../public/assets/icons/ClientIcon";
import SettingsIcon from "../../../../../public/assets/icons/SettingsIcon";
import LogOutIcon from "../../../../../public/assets/icons/LogoutIcon";

const sections = [
  {
    title: "Paineis",
    items: [
      { icon: <HomeIcon />, text: "Início", href: "/home" },
      { icon: <ChartIcon />, text: "Análise", href: "/analysis" },
    ],
  },
  {
    title: "Serviços",
    items: [
      { icon: <StoreIcon />, text: "Estoque", href: "/estoque" },
      { icon: <ProductIcon />, text: "Produtos", href: "/produtos" },
      // { icon: <ClientIcon />, text: "Clientes", href: "/clientes" }, 
      { icon: <StoreIcon />, text: 'Materia Prima', href: '/materiaPrima' },
      { icon: <ProductIcon />, text: 'Produtos', href: '/produtos' },
      { icon: <ClientIcon />, text: 'Clientes', href: '/clientes' },
      { icon: <ClientIcon />, text: 'Categoria cliente', href: '/categoriaCliente' },
      { icon: <ClientIcon />, text: 'Usuarios ', href: '/users' },
    ],
  },
  {
    title: "Outros",
    items: [
      { icon: <SettingsIcon />, text: "Configurações", href: "/settings" },
      { icon: <LogOutIcon />, text: "Sair", href: "/logout" },
    ],
  },
];

interface SideBarProps {
  onToggle: (isClosed: boolean) => void;
}

export default function SideBar({ onToggle }: SideBarProps) {
  const [isClosed, setIsClosed] = useState(false);

  const handleToggle = () => {
    const newIsClosed = !isClosed;
    console.log(newIsClosed);
    setIsClosed(newIsClosed);
    onToggle(newIsClosed);
  };

  return (
    <div
      className={`flex flex-col gap-4 h-full border-r-2 border-primary-400 bg-offwhite px-4 ${
        isClosed ? "w-[100px]" : "w-sidebar-width"
      } transition-all duration-300`}
    >
      <div
        className={`flex items-center gap-4 
      ${isClosed ? "flex-col py-4" : "py-8"}`}
      >
        <div className="shadow-xl rounded-lg">
          <Image
            src={"/assets/images/logo.png"}
            alt="imagem de perfil"
            width={100}
            height={100}
          />
        </div>
        {!isClosed && (
          <p className="font-bold text-black text-lg">Villa Vitória</p>
        )}
        <div
          className={`${
            isClosed ? "w-full flex justify-center items-center" : ""
          } cursor-pointer`}
          onClick={handleToggle}
        >
          {isClosed ? (
            <ArrowRightCircle size={24} color="#FF6A00" />
          ) : (
            <ArrowLeftCircleIcon size={24} color="#FF6A00" />
          )}
        </div>
      </div>
      {sections.map((section, index) => (
        <SideBarSection
          key={index}
          title={section.title}
          items={section.items}
          isClosed={isClosed}
        />
      ))}
    </div>
  );
}
