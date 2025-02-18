import { Info, Edit, Trash, Minus } from "lucide-react";

interface TableCellActionProps {
  onClickRead?: () => void;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
  editHiiden?: boolean;
  deleteHidden?: boolean;
  isBaixaEstoque?: boolean;
}

export default function TableCellAction({ onClickRead, onClickEdit, onClickDelete, editHiiden, deleteHidden, isBaixaEstoque }: TableCellActionProps) {

  return (
    <div className="flex justify-center items-center py-2 gap-2 flex-1">
      <Info
        onClick={onClickRead}
        className="cursor-pointer text-gray-400 hover:text-blue-500 transition-colors duration-200"
      />
      {isBaixaEstoque ? (
        <Minus
          onClick={onClickEdit}
          className={`cursor-pointer text-gray-400 hover:text-green-500 transition-colors duration-200
        ${editHiiden ? "hidden" : ""}`}
        />
      ) : (
        <Edit
          onClick={onClickEdit}
          className={`cursor-pointer text-gray-400 hover:text-green-500 transition-colors duration-200
        ${editHiiden ? "hidden" : ""}`}
        />
      )}
      <Trash
        onClick={onClickDelete}
        className={`cursor-pointer text-gray-400 hover:text-red-500 transition-colors duration-200
        ${deleteHidden ? "hidden" : ""}`}
      />
    </div>
  );
}
