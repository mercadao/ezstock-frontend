import DashboardButton from "../../atoms/Button/DashboardButton/Index";
import MovimentationChart from "../../atoms/Charts/MovimentarionChart/Index";

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
      <MovimentationChart />
    </div>
  );
}
