import ConfigTitle from "@/app/components/molecules/ConfigTitle/Index";
import ProfileCard from "@/app/components/molecules/ProfileCard/Index";

export default function Settings() {
  return (
    <>
      <div className="w-full h-full flex justify-center py-10 px-14 text-brownText">
        <div className="w-8/12 flex flex-col gap-8">
          <ConfigTitle />
          <ProfileCard />
        </div>
      </div>
    </>
  );
}
