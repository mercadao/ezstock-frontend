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
  isBaixaEstoque?: boolean;
}

export default function TableRow({
  data,
  isHeader = false,
  onClickRead,
  onClickEdit,
  onClickDelete,
  editHiiden,
  deleteHidden,
  isBaixaEstoque
}: TableRowProps) {
  // Calculate the number of data columns for proper grid layout
  const totalColumns = data.length + 1; // +1 for actions column
  
  return (
    <div
      className={`grid gap-4 px-6 py-4 items-center ${
        isHeader 
          ? "font-semibold text-gray-700 text-sm uppercase tracking-wider" 
          : "text-gray-900 hover:bg-gray-50"
      } transition-colors duration-200`}
      style={{
        gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr)) 120px`
      }}
    >
      {data.map((item, index) => (
        <div key={index} className="min-w-0">
          <TableCellDefault data={item} isHeader={isHeader} />
        </div>
      ))}

      <div className="flex justify-center">
        {!isHeader ? (
          <TableCellAction
            onClickRead={onClickRead}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            editHiiden={editHiiden}
            deleteHidden={deleteHidden}
            isBaixaEstoque={isBaixaEstoque}
          />
        ) : (
          <div className="text-center font-semibold text-gray-700 text-sm uppercase tracking-wider">
            Ações
          </div>
        )}
      </div>
    </div>
  );
}
