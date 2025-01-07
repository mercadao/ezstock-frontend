import TableCellDefault from "@/app/components/atoms/TableCell/default";
import TableCellAction from "@/app/components/atoms/TableCell/action";

interface TableRowProps {
  data: any[];
  isHeader?: boolean;
  onClickRead?: () => void;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
  editHiiden?: boolean;
  deleteHidden?: boolean; 
}

export default function TableRow({
  data,
  isHeader = false,
  onClickRead,
  onClickEdit,
  onClickDelete,
  editHiiden,
  deleteHidden
}: TableRowProps) {
  return (
    <div
      className={`flex border-y-[1px] ${isHeader ? "font-bold" : "hover:bg-gray-100"} w-full cursor-pointer transition-colors duration-200`}
    >
      {data.map((item, index) => (
        <TableCellDefault key={index} data={item} />
      ))}

      {!isHeader && (
        <TableCellAction
          onClickRead={onClickRead}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
          editHiiden={editHiiden}
          deleteHidden={deleteHidden}
        />
      )}
    </div>
  );
}
