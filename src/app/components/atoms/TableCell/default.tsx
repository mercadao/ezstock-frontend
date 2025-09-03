interface TableCellDefaultProps {
  data: any;
  isHeader?: boolean;
}

export default function TableCellDefault({ data, isHeader = false }: TableCellDefaultProps) {
  return (
    <div className={`
      ${isHeader 
        ? "text-left font-semibold text-gray-700" 
        : "text-left text-gray-900"
      }
      px-2 truncate
    `}>
      <span className="block">{data}</span>
    </div>
  );
}
  