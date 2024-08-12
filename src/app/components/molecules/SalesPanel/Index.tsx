import dynamic from "next/dynamic";

const SalesChart = dynamic(
  () => import("../../atoms/Charts/SalesChart/Index"),
  {
    ssr: false,
  }
);

export default function SalesPanel() {
  return (
    <div className="w-full h-full p-6 flex flex-col justify-between">
      <p className="text-xl font-semibold mb-2">Vendas</p>
      <div className="h-[90%]">
        <SalesChart />
      </div>
    </div>
  );
}
