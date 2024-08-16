"use client"

import { useEffect, useState } from 'react';
import TableRow from "@/app/components/molecules/TableRow";
import { TableCellProps } from "@/app/components/atoms/TableCell";
import { Info, Edit, Trash } from 'lucide-react';
import { getProdutos } from '@/app/services/getProdutos';
import { Produto } from '@/app/types/index';
import Modal from "@/app/components/molecules/Modal";

export default function Table() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const produtosData = await getProdutos();
                setProdutos(produtosData);
            } catch (error) {
                console.error('Erro ao carregar produtos:', error);
            }
        }
        fetchProdutos();
    }, []);

    const handleOpenModal = (product: Produto) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const headerData: TableCellProps[] = [
        { text: "ID", type: 'header' },
        { text: "Nome", type: 'header' },
        { text: "Valor por KG", type: 'header' },
        { text: "Ações", type: 'header' }
    ];

    const rowsData: TableCellProps[][] = produtos.map((product) => [
        { text: product.idProduto.toString(), type: 'body' },
        { text: product.nomeProduto, type: 'body' },
        { text: `${product.valorKG.toFixed(2)} R$ `, type: 'body' },
        {
            icon: (
                <div className="flex space-x-2">
                    <Info 
                        className="cursor-pointer text-gray-500" 
                        size={20} 
                        onClick={() => handleOpenModal(product)} 
                    />
                    <Edit className="cursor-pointer text-gray-500" size={20} />
                    <Trash className="cursor-pointer text-gray-500" size={20} />
                </div>
            ),
            type: 'body'
        }
    ]);

    return (
        <div className="my-4 w-full">
            <div className="w-full border rounded-md overflow-x-auto drop-shadow-lg">
                <TableRow data={headerData} isHeader={true} />
                {rowsData.map((row, index) => (
                    <TableRow key={produtos[index].idProduto} data={row} />
                ))}
            </div>

            <Modal isOpen={!!selectedProduct} onClose={handleCloseModal}>
                {selectedProduct && (
                    <>
                        <h2 className="text-xl font-semibold mb-4 text-black">Detalhes do Produto</h2>
                        <p className='text-black'><strong>ID:</strong> {selectedProduct.idProduto}</p>
                        <p className='text-black'><strong>Nome:</strong> {selectedProduct.nomeProduto}</p>
                        <p className='text-black'><strong>Valor por KG:</strong> {selectedProduct.valorKG}</p>
                    </>
                )}
            </Modal>
        </div>
    );
}
