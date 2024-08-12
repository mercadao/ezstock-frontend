"use client";
import ControlPanel from "@/app/components/molecules/ControlPanel";
import MovimentationPanel from "@/app/components/molecules/MovimentationPanel/Index";
import ProductPanel from "@/app/components/molecules/ProductsPanel/Index";
import SalesPanel from "@/app/components/molecules/SalesPanel/Index";

export default function Home() {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <div className="h-[94%] w-[97%] flex gap-3">
          <div className="h-full w-[60%] flex flex-col gap-3">
            <div className="h-1/2 w-full bg-[#D27339] rounded-xl">
              <MovimentationPanel />
            </div>

            <div className="flex w-full h-1/2 gap-3">
              <div className="h-full w-1/2 bg-[#FF8B45] rounded-xl">
                <ProductPanel />
              </div>
              <div className="h-full w-1/2 bg-[#FF8B45] rounded-xl">
                <SalesPanel />
              </div>
            </div>
          </div>

          <div className="h-full w-[40%]">
            <ControlPanel />
          </div>
        </div>
      </div>
    </>
  );
}
