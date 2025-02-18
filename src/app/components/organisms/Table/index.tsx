import { motion } from 'framer-motion';
import TableRow from "@/app/components/molecules/TableRow";
import { useEffect, useState } from 'react';

interface TableProps {
  headerData?: string[]; 
  data: any[][];
  onClickRead?: (rowIndex: number) => void; 
  onClickEdit?: (rowIndex: number) => void; 
  onClickDelete?: (rowIndex: number) => void; 
  editHiiden?: boolean; 
  deleteHidden?: boolean; 
  isBaixaEstoque?: boolean; 
  withoutId?: boolean;
}

interface RowData {
  id?: string | number;
  [key: string]: any;
}

export default function Table({ 
  headerData, 
  data, 
  onClickRead, 
  onClickEdit, 
  onClickDelete, 
  editHiiden, 
  deleteHidden, 
  isBaixaEstoque,
  withoutId = false 
}: TableProps) {

  const [modifiedHeaderData, setModifiedHeaderData] = useState<string[] | undefined>(headerData);
  const [modifiedData, setModifiedData] = useState<any[][]>(data);

  useEffect(() => {
    if (withoutId) {
      const newHeaderData = headerData ? headerData.filter(item => item !== 'ID') : headerData;
      setModifiedHeaderData(newHeaderData);

      const newData = data.map((row: any[]) => {
        return row.slice(1); 
      });
      setModifiedData(newData);
    } else {
      setModifiedHeaderData(headerData);
      setModifiedData(data);
    }
  }, [withoutId, headerData, data]);


  return (
    <div className="border border-[#E5E7EB] rounded-lg my-4 w-full">
      {modifiedHeaderData && (
        <TableRow data={modifiedHeaderData} isHeader />
      )}
      
      {modifiedData.map((rowData, rowIndex) => (
        <motion.div
          key={rowIndex}
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