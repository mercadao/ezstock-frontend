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
    <div className="flex justify-center items-center gap-3">
      <button
        onClick={onClickRead}
        className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-200 group"
        title="Visualizar"
      >
        <Info
          size={16}
          className="text-gray-400 group-hover:text-blue-600 transition-colors duration-200"
        />
      </button>
      
      {!editHiiden && (
        <button
          onClick={onClickEdit}
          className="p-2 rounded-full hover:bg-green-100 transition-colors duration-200 group"
          title={isBaixaEstoque ? "Baixar Estoque" : "Editar"}
        >
          {isBaixaEstoque ? (
            <Minus
              size={16}
              className="text-gray-400 group-hover:text-green-600 transition-colors duration-200"
            />
          ) : (
            <Edit
              size={16}
              className="text-gray-400 group-hover:text-green-600 transition-colors duration-200"
            />
          )}
        </button>
      )}
      
      {!deleteHidden && (
        <button
          onClick={onClickDelete}
          className="p-2 rounded-full hover:bg-red-100 transition-colors duration-200 group"
          title="Excluir"
        >
          <Trash
            size={16}
            className="text-gray-400 group-hover:text-red-600 transition-colors duration-200"
          />
        </button>
      )}
    </div>
  );
}
