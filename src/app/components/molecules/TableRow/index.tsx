import TableCell, { TableCellProps } from "../../atoms/TableCell";
import { ReactNode } from "react";

interface TableRowProps {
    data: TableCellProps[];
    isHeader?: boolean;
}

export default function TableRow({ data, isHeader = false }: TableRowProps) {
    return (
        <div className={`flex w-full bg-offwhite ${isHeader ? 'bg-gray-50 border-b border-gray-300' : 'border-b border-gray-200'} hover:opacity-80 cursor-pointer`}>
            <div className="flex w-full">
                {data.map((item, index) => (
                    <TableCell
                        key={index}
                        text={item.text}
                        icon={item.icon}
                        type={item.type}
                    />
                ))}
            </div>
        </div>
    );
}
