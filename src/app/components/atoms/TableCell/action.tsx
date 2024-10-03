import { Info, Edit, Trash } from "lucide-react";

interface TableCellActionProps {
  onClickRead?: () => void;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
  deleteHidden?: boolean; 
}

export default function TableCellAction({ onClickRead, onClickEdit, onClickDelete, deleteHidden }: TableCellActionProps) {

  return (
    <div className="flex justify-center items-center py-2 gap-2 flex-1">
      <Info
        onClick={onClickRead}
        className="cursor-pointer text-gray-400 hover:text-blue-500 transition-colors duration-200"
      />
      <Edit
        onClick={onClickEdit}
        className="cursor-pointer text-gray-400 hover:text-green-500 transition-colors duration-200"
      />
      <Trash
        onClick={onClickDelete}
        className={`cursor-pointer text-gray-400 hover:text-red-500 transition-colors duration-200
        ${deleteHidden ? "hidden" : ""}`}
      />
    </div>
  );
}
