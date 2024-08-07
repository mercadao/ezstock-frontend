interface DashboardButtonProps {
  text?: string;
  customBorderColor?: string;
  customColorText?: string;
  hoverBGColor?: string;
  hoverColorText?: string;
}

export default function DashboardButton({
  text = "Button",
  customBorderColor = "border-primary-400",
  customColorText = "text-primary-400",
  hoverBGColor = "hover:bg-primary-400",
  hoverColorText = "hover:text-white",
}: DashboardButtonProps) {
  return (
    <a
      href="#"
      className={`px-6 py-1 border-2 ${customBorderColor} ${customColorText} flex justify-center items-center rounded-3xl text-sm
      font-medium duration-300 ${hoverBGColor} ${hoverColorText}`}
    >
      {text}
    </a>
  );
}
