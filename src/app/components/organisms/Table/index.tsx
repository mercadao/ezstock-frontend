import { motion } from 'framer-motion';
import TableRow from "@/app/components/molecules/TableRow";
import Pagination from "@/app/components/atoms/Pagination";
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
  // Pagination props
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
  showPagination?: boolean;
  // Original data indexes for proper handling
  originalIndexes?: number[];
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
  withoutAtivo = false,
  // Pagination props
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  itemsPerPage = 20,
  totalItems = 0,
  showPagination = true,
  originalIndexes
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
    <div className="w-full">
      <div className="border border-[#E5E7EB] rounded-lg my-4 w-full">
        {modifiedHeaderData && (
          <TableRow data={modifiedHeaderData} isHeader />
        )}
        
        {modifiedData.map((rowData, rowIndex) => {
          // Use original index if provided, otherwise use current index
          const actualIndex = originalIndexes ? originalIndexes[rowIndex] : rowIndex;
          
          return (
            <motion.div
              key={rowIndex}
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 300, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <TableRow
                data={rowData}
                onClickRead={() => onClickRead?.(actualIndex)}
                onClickEdit={() => onClickEdit?.(actualIndex)}
                onClickDelete={() => onClickDelete?.(actualIndex)}
                editHiiden={editHiiden}
                deleteHidden={deleteHidden}
                isBaixaEstoque={isBaixaEstoque} 
              />
            </motion.div>
          );
        })}
      </div>
      
      {showPagination && totalPages > 1 && onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      )}
    </div>
  );
}