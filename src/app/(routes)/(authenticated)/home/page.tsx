import DashboardItem from "@/app/components/atoms/DashboardItem/Index";
import SearchInput from "@/app/components/atoms/SearchInput/Index";

export default function Home() {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <SearchInput />
        <DashboardItem />
      </div>
    </>
  );
}
