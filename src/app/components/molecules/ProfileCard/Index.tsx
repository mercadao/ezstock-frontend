import Image from "next/image";
import EditIcon from "../../../../../public/assets/icons/EditIcon";

export default function ProfileCard() {
  return (
    <div className="w-full h-[285px] overflow-hidden rounded-xl shadow-sm relative border">
      <div className="h-[67%] bg-gradient-to-r from-primary-400 to-[#FF8B45]"></div>
      <div className="h-[33%] bg-white"></div>
      <div className="h-[147px] w-[147px] flex justify-center items-center rounded-full bg-[#FFFAFA] border-2 border-white shadow-md absolute bottom-[40px] left-[40px]">
        <Image
          src={"/assets/images/logo.png"}
          alt="imagem de perfil"
          width={130}
          height={130}
        />
      </div>
      <div className="h-[44px] w-[44px] border-4 border-white flex justify-center items-center rounded-full bg-primary-400 shadow-md absolute bottom-[70px] right-[40px]">
        <EditIcon />
      </div>
    </div>
  );
}
