interface ButtonProps {
  text: string;
  customColorBg?: string;
  customColorText?: string;
  weight?: string; // Corrigido o typo de "weigth" para "weight"
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
  const fontWeight = weight ? weight : 'font-normal'; // Adiciona uma classe de peso padrão se `weight` não for fornecido

  return (
    <a
      className={`w-full h-fit flex justify-center items-center rounded-lg py-2 px-4 text-center
      ${colorBg} ${colorTextButton} ${fontWeight} font-sans
      hover:opacity-80 hover:cursor-pointer`}
    >
      {text}
    </a>
  );
}
