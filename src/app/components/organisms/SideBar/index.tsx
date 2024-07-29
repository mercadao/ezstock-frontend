import Image from "next/image";

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
      { icon: <HomeIcon />, text: "Início", href: "/" },
      { icon: <ChartIcon />, text: "Análise", href: "/analysis" }
    ]
  },
  {
    title: "Serviços",
    items: [
      { icon: <StoreIcon />, text: "Estoque", href: "/stock" },
      { icon: <ProductIcon />, text: "Produtos", href: "/produtos" },
      { icon: <ClientIcon />, text: "Clientes", href: "/clients" }
    ]
  },
  {
    title: "Outros",
    items: [
      { icon: <SettingsIcon />, text: "Configurações", href: "/settings" },
      { icon: <LogOutIcon />, text: "Sair", href: "/logout" }
    ]
  }
];

export default function SideBar() {
  return (
    <div className="flex flex-col gap-4 w-[300px] h-full border-r-2 border-primary-400 bg-offwhite px-4">
      <div className="flex items-center gap-4 py-8">
        <div className="shadow-xl rounded-lg">
          <Image
            src={'/assets/images/logo.png'}
            alt="imagem de perfil"
            width={100}
            height={100}
          />
        </div>
        <p className="font-bold text-black text-lg">
          Villa Vitória
        </p>
      </div>
      {sections.map((section, index) => (
        <SideBarSection key={index} title={section.title} items={section.items} />
      ))}
    </div>
  );
}
