import DashboardItem from "@/app/components/atoms/DashboardItem/Index";
import SearchInput from "@/app/components/atoms/SearchInput/Index";
import ControlPanel from "@/app/components/molecules/ControlPanel";

export default function Home() {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <ControlPanel />
      </div>
    </>
  );
}
