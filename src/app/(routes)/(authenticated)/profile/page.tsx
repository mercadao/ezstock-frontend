export default function Profile() {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <div className="h-[94%] w-[97%] flex gap-3">
          <div className="h-full w-[60%] flex flex-col gap-3">
            <div className="h-1/2 w-full bg-[#D27339] rounded-xl"></div>
            <div className="flex w-full h-1/2 gap-3">
              <div className="h-full w-1/2 bg-[#FF8B45] rounded-xl"></div>
              <div className="h-full w-1/2 bg-[#FF8B45] rounded-xl"></div>
            </div>
          </div>

          <div className="h-full w-[40%]"></div>
        </div>
      </div>
    </>
  );
}
