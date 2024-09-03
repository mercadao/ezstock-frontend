import TableCell, { TableCellProps } from "../../atoms/TableCell";
import { ReactNode } from "react";

interface TableRowProps {
    data: TableCellProps[];
    isHeader?: boolean;
    onInfoClick?: (item: any) => void; // Adiciona prop para lidar com o clique no Info
    item?: any; // Adiciona prop para passar o item da linha
}

export default function TableRow({ data, isHeader = false, onInfoClick, item }: TableRowProps) {
    const handleInfoClick = () => {
        if (onInfoClick && item) {
            onInfoClick(item);
        }
    };

    return (
        <div
            className={`flex w-full bg-offwhite ${isHeader ? 'bg-gray-50 border-b border-gray-300' : 'border-b border-gray-200'} hover:opacity-80 cursor-pointer`}
        >
            <div className="flex w-full">
                {data.map((cell, index) => (
                    <TableCell
                        key={index}
                        text={cell.text}
                        icon={cell.icon}
                        type={cell.type}
                        onClick={cell.type === 'body' && cell.icon ? handleInfoClick : undefined} // Adiciona onClick para o ícone
                    />
                ))}
            </div>
        </div>
    );
}
