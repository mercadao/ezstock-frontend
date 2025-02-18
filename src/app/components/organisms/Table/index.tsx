import { motion } from 'framer-motion';
import TableRow from "@/app/components/molecules/TableRow";

interface TableProps {
  headerData?: string[]; 
  data: any[][]; 
  onClickRead?: (rowIndex: number) => void;
  onClickEdit?: (rowIndex: number) => void;
  onClickDelete?: (rowIndex: number) => void;
  editHiiden?: boolean;
  deleteHidden?: boolean; 
  isBaixaEstoque?: boolean;  
}

export default function Table({ headerData, data, onClickRead, onClickEdit, onClickDelete, editHiiden, deleteHidden, isBaixaEstoque }: TableProps) {

  return (
    <div className="border border-[#E5E7EB] rounded-lg my-4 w-full">
      {headerData && (
        <TableRow data={headerData} isHeader/>
      )}
      
      {data.map((rowData, rowIndex) => (
        <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 300, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
          <TableRow
            data={rowData}
            onClickRead={() => onClickRead?.(rowIndex)}
            onClickEdit={() => onClickEdit?.(rowIndex)}
            onClickDelete={() => onClickDelete?.(rowIndex)}
            editHiiden={editHiiden}
            deleteHidden={deleteHidden}
            isBaixaEstoque={isBaixaEstoque} 
          />
        </motion.div>
      ))}
    </div>
  );
}
