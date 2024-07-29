interface SmallButtonProps {
    icon: React.ReactNode;
    onClick?: () => void;
  }

export default function SmallButton({icon, onClick}:SmallButtonProps){
    return(
        <>
            <div 
                className="h-[50px] w-[50px] flex justify-center items-center bg-transparent border border-primary-900 rounded-md
                hover:bg-primary-900 hover:text-offwhite cursor-pointer"
                onClick={onClick}
            >
                {icon}
            </div>
        </>
    )
}