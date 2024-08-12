import DashboardButton from "../../atoms/Button/DashboardButton/Index";
import dynamic from "next/dynamic";

const MovimentationChart = dynamic(
  () => import("../../atoms/Charts/MovimentarionChart/Index"),
  {
    ssr: false,
  }
);

export default function MovimentationPanel() {
  return (
    <div className="w-full h-full p-6 flex flex-col justify-between">
      <div className="flex justify-between items-end">
        <p className="text-2xl font-semibold">Movimentações</p>
        <DashboardButton
          text="Ver mais"
          customBorderColor="border-white"
          customColorText="text-white"
          hoverBGColor="hover:bg-white"
          hoverColorText="hover:text-primary-400"
        />
      </div>
      <div className="h-[80%] flex justify-between items-center">
        <div className="w-[60%] h-full">
          <MovimentationChart />
        </div>
        <div className="w-[40%] flex flex-col justify-center items-center">
          <p className="text-6xl font-bold">120kg</p>
          <p className="mt-2 text-lg">Movimentados</p>
        </div>
      </div>
    </div>
  );
}
