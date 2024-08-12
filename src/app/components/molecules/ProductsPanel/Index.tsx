import dynamic from "next/dynamic";

const ProductsChart = dynamic(
  () => import("../../atoms/Charts/ProductsChart/Index"),
  {
    ssr: false,
  }
);

export default function ProductPanel() {
  return (
    <div className="w-full h-full p-6 flex flex-col justify-between">
      <p className="text-xl font-semibold mb-2">Produtos</p>
      <ProductsChart />
    </div>
  );
}
