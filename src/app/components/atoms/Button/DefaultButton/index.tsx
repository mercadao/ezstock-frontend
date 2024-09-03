interface ButtonProps {
  text: string;
  customColorBg?: string;
  customColorText?: string;
  weight?: string;
  onClick: () => void;
}

export default function Button({
  text,
  customColorBg,
  customColorText,
  weight,
  onClick,
}: ButtonProps) {

  const colorBg = customColorBg ? customColorBg : 'bg-primary-400';
  const colorTextButton = customColorText ? customColorText : 'text-white';
  const fontWeight = weight ? weight : 'font-normal';

  return (
    <button
      onClick={onClick} 
      className={`w-full h-fit flex justify-center items-center rounded-lg py-2 px-4 text-center
      ${colorBg} ${colorTextButton} ${fontWeight} font-sans
      hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary-500`} // Adiciona foco e estilo de anel
    >
      {text}
    </button>
  );
}
