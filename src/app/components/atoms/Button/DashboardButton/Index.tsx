interface DashboardButtonProps {
  text?: string;
  customBorderColor?: string;
  customColorText?: string;
}

export default function DashboardButton({
  text = "Button",
  customBorderColor,
  customColorText,
}: DashboardButtonProps) {
  const borderColor = customBorderColor
    ? customBorderColor
    : "border-primary-400";
  const hoverBgColor = customBorderColor ? customBorderColor : "bg-primary-400";
  const colorText = customColorText ? customColorText : "text-primary-400";
  const hoverColorText = customColorText ? customColorText : "text-white";

  return (
    <a
      href="#"
      className={`px-6 py-1 border-2 ${borderColor} ${colorText} flex justify-center items-center rounded-3xl text-sm
      font-medium hover:${hoverBgColor} hover:${hoverColorText} duration-300`}
    >
      {text}
    </a>
  );
}
