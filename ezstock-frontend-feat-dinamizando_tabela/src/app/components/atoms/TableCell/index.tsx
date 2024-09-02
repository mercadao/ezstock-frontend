import { ReactNode } from "react";

export interface TableCellProps {
    text?: string;
    icon?: JSX.Element;
    type: "header" | "body";
    onClick?: () => void; // Adiciona prop para clique
}

export default function TableCell({ type = 'body', text, icon, onClick }: TableCellProps) {
    const textStyle = type === 'header' ? 'font-bold text-lg text-black' : 'font-regular text-md text-black';

    return (
        <div className="flex items-center justify-center w-full text-center py-2" onClick={onClick}>
            {icon ? (
                <div className="flex items-center justify-center space-x-2">
                    {icon}
                </div>
            ) : (
                <p className={textStyle}>
                    {text}
                </p>
            )}
        </div>
    );
}
