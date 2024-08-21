import Image from "next/image";

export default function AccountInfo() {
  return (
    <div className="w-full mt-6">
      <p className="font-semibold text-xl">Conta</p>
      <div className="w-full bg-white border h-[130px] mt-4 rounded-xl flex items-center px-8 gap-4">
        <div className="w-[70px] h-[70px] rounded-full border bg-[#FFFAFA] flex items-center justify-center">
          <Image
            src={"/assets/images/logo.png"}
            alt="imagem de perfil"
            width={70}
            height={70}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-semibold">Villa Vitória</p>
          <p className="text-sm font-medium text-primary-400">Deseja sair?</p>
        </div>
      </div>
    </div>
  );
}
