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
  return (
    <>
      <div className="w-full h-[100px] bg-primary-900 rounded-xl shadow-2xl items-center flex justify-between ">
        <div className=" ml-6 flex items-center gap-10 ">
          <div className="flex items-center gap-4">
            <div className="  h-[40px] rounded-xl w-[40px] bg-white shadow-xl"></div>
            <div className="">
              <h1 className="text-white text-xl ">Ativo</h1>
            </div>
          </div>
          <div className=" gap-6">
            <h1 className="text-white text-xl ">{name}</h1>
          </div>
          <div className="">
            <h1 className="text-white text-xl ">Valor Kg: {price}</h1>
          </div>
        </div>
        <div className="mr-5">
          <h1>Editar</h1>
        </div>
      </div>
    </>
  );
}
