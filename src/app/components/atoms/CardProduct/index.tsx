import { EditIcon } from "lucide-react";
import { CheckBox } from "../CheckBox";

interface CardProductProps {
  isActive: boolean;
  name: string;
  price: number;
  id: number;
}

export default function CardProduct({
  isActive,
  name,
  price,
  id,
}: CardProductProps) {

  const BgStyle = isActive ? "bg-primary-900" : "bg-white";
  const TextColorStyle = isActive ? "text-white" : "text-black";
  const IconColor = isActive ? "white" : "black";

  return (
    <>
      <div 
        className={`w-full h-[100px] rounded-xl shadow-2xl items-center flex justify-between
        ${BgStyle} transition-transform duration-300 hover:transform hover:translate-y-[-5px] cursor-pointer hover:opacity-95
        `}
      >
        <div className="ml-6 flex items-center gap-10">
          <div className="flex items-center gap-4 w-[200px]">
            <CheckBox isActive={isActive} />
            <div className="">
              {isActive ? (
                <h1 className="text-white">Ativo</h1>
              ) : (
                <h1 className="text-black">Desativado</h1>
              )}
            </div>
          </div>

          <div className="w-[200px]">
            <h1 className={`${TextColorStyle} text-xl`}>{name}</h1>
          </div>

          <div className="w-[200px]">
            <h1 className={`${TextColorStyle} text-xl`}>Valor por Kg: {price} R$</h1>
          </div>
        </div>
        <div className="mr-5">
          <EditIcon size={24} color={IconColor} />
        </div>
      </div>
    </>
  );
}
