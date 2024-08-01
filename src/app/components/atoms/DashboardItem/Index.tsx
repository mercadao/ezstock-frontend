export default function DashboardItem() {
  return (
    <div className="w-[280px] flex flex-col gap-2">
      <div className="text-brownText flex justify-between">
        <p className="font-semibold">Produto</p>
        <p className="font-normal">R$0.000,00</p>
      </div>
      <div className="text-textGray flex justify-between text-sm">
        <p className="font-light">100 itens</p>
        <p className="font-light">Seg, Out 10</p>
      </div>
    </div>
  );
}
