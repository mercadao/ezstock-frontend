import { ReactNode } from "react";

export interface TableCellProps {
    type?: 'body' | 'header';
    text?: string;
    icon?: ReactNode;
}

export default function TableCell({ type = 'body', text, icon }: TableCellProps) {
    const textStyle = type === 'header' ? 'font-bold text-lg text-black' : 'font-regular text-md text-black';

    return (
        <div className="flex items-center justify-center w-full text-center py-2">
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
