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
  }, [withoutId, withoutAtivo, headerData, data]);  return (
    <div className="w-full">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden my-4 w-full">
        {/* Header */}
        {modifiedHeaderData && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <TableRow data={modifiedHeaderData} isHeader />
          </div>
        )}
        
        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {modifiedData.map((rowData, rowIndex) => {
            // Use original index if provided, otherwise use current index
            const actualIndex = originalIndexes ? originalIndexes[rowIndex] : rowIndex;
            
            return (
              <motion.div
                key={rowIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeOut",
                  delay: rowIndex * 0.05
                }}
                className="hover:bg-gray-50 transition-colors duration-200"
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
        
        {/* Empty state */}
        {modifiedData.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-lg font-medium">Nenhum registro encontrado</p>
            <p className="text-sm">Tente ajustar os filtros de busca</p>
          </div>
        )}
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