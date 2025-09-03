interface ButtonProps {
  text: string;
  customColorBg?: string;
  customColorText?: string;
  weight?: string;
  onClick: () => void;
  customWidth?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function Button({
  text,
  customColorBg,
  customColorText,
  customWidth = "w-full",
  weight,
  onClick,
  icon,
  className,
}: ButtonProps) {
  const colorBg = customColorBg ? customColorBg : "bg-primary-400";
  const colorTextButton = customColorText ? customColorText : "text-white";
  const fontWeight = weight ? weight : "font-normal";

  return (
    <button
      onClick={onClick} 
      className={`h-fit flex justify-center items-center gap-2 rounded-lg py-2 px-4 text-center
      ${colorBg} ${colorTextButton} ${fontWeight} ${customWidth} font-sans
      hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-md hover:shadow-lg transition-all duration-300 ${className || ''}`} 
    >
      {icon && icon}
      {text}
    </button>
  );
}
