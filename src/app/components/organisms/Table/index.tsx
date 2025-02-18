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
  withoutAtivo?: boolean; 
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
  withoutId = false,
  withoutAtivo = false // Valor padrão para withoutAtivo
}: TableProps) {

  const [modifiedHeaderData, setModifiedHeaderData] = useState<string[] | undefined>(headerData);
  const [modifiedData, setModifiedData] = useState<any[][]>(data);

  useEffect(() => {
    let newHeaderData = headerData ? [...headerData] : headerData; // Cria uma cópia do headerData
    let newData = data ? [...data] : data; // Cria uma cópia dos dados

    // Remove a coluna "ID" se withoutId for true
    if (withoutId && newHeaderData) {
      const idIndex = newHeaderData.indexOf('ID');
      if (idIndex !== -1) {
        newHeaderData = newHeaderData.filter((_, index) => index !== idIndex);
        newData = newData.map((row) => row.filter((_, index) => index !== idIndex));
      }
    }

    // Remove a coluna "Ativo" se withoutAtivo for true
    if (withoutAtivo && newHeaderData) {
      const ativoIndex = newHeaderData.indexOf('Ativo');
      if (ativoIndex !== -1) {
        newHeaderData = newHeaderData.filter((_, index) => index !== ativoIndex);
        newData = newData.map((row) => row.filter((_, index) => index !== ativoIndex));
      }
    }

    // Atualiza os estados com os dados modificados
    setModifiedHeaderData(newHeaderData);
    setModifiedData(newData);
  }, [withoutId, withoutAtivo, headerData, data]);

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