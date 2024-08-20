"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TableRow from "@/app/components/molecules/TableRow";
import { TableCellProps } from "@/app/components/atoms/TableCell";
import { Info, Edit, Trash } from "lucide-react";
import { getProdutos } from "@/app/services/getProdutos";
import { Produto } from "@/app/types/index";
import Modal from "@/app/components/molecules/Modal";
import EditProductModal from "@/app/components/molecules/Modal/EditModal";
import PainelHeader from "@/app/components/molecules/PainelHeader";
import SwitchPageHeader from "@/app/components/atoms/SwitchPageHeader";
import Divider from "@/app/components/atoms/Divider";
import { deleteProduto } from "@/app/services/deleteProduct";
import { toast } from "react-toastify";

export default function Table() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const items = [
    { name: "Item 1", route: "/item1" },
    { name: "Item 2", route: "/item2" },
    { name: "Item 3", route: "/item3" },
  ];

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const produtosData = await getProdutos();
        setProdutos(produtosData);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
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

  const handleOpenEditModal = (product: Produto) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
  };

  const handleDeleteProduct = (product: Produto) => {
    toast(
      <div className="flex flex-col p-5 justify-center items-center py-2 gap-4 ">
        <p className="text-lg font-semibold text-gray-800 text-center">
          Tem certeza que deseja excluir este produto?
        </p>
        <div className="flex w-full items-center justify-center gap-4">
          <button
            onClick={async () => {
              try {
                await deleteProduto(product.idProduto);
                setProdutos((prevProdutos) =>
                  prevProdutos.filter((p) => p.idProduto !== product.idProduto)
                );
                toast.dismiss(); // Fecha o toast
                toast.success("Produto excluído com sucesso!");
              } catch (error) {
                toast.error("Erro ao excluir produto. Tente novamente.");
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md shadow"
          >
            Sim
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-4 py-2 rounded-md shadow"
          >
            Não
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const headerData: TableCellProps[] = [
    { text: "ID", type: "header" },
    { text: "Nome", type: "header" },
    { text: "Valor por KG", type: "header" },
    { text: "Ações", type: "header" },
  ];

  const rowsData: TableCellProps[][] = produtos.map((product) => [
    { text: product.idProduto.toString(), type: "body" },
    { text: product.nomeProduto, type: "body" },
    { text: `${product.valorKG.toFixed(2)} R$`, type: "body" },
    {
      icon: (
        <div className="flex space-x-2">
          <Info
            className="cursor-pointer text-gray-500 hover:text-yellow-400"
            size={20}
            onClick={() => handleOpenModal(product)}
          />
          <Edit
            className="cursor-pointer text-gray-500 hover:text-primary-400"
            size={20}
            onClick={() => handleOpenEditModal(product)}
          />
          <Trash
            className="cursor-pointer text-gray-500 hover:text-red-500"
            size={20}
            onClick={() => handleDeleteProduct(product)}
          />
        </div>
      ),
      type: "body",
    },
  ]);

  return (
    <div className="my-4 w-full p-10">
      <h1 className="text-primary-900 text-2xl font-extrabold">
        Gerencie seus produtos
      </h1>
      <div className="pb-3  ">
        <SwitchPageHeader itemHeader="" items={items} />
      </div>
      <PainelHeader title="Tabela de Produtos" />

      <Divider />

      <div className="w-full border rounded-md overflow-x-auto drop-shadow-lg">
        <TableRow data={headerData} isHeader={true} />
        {rowsData.map((row, index) => (
          <motion.div
            key={produtos[index].idProduto}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.2,
              delay: index * 0.2,
            }}
          >
            <TableRow data={row} />
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedProduct && !isEditModalOpen}
        onClose={handleCloseModal}
      >
        {selectedProduct && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-black">
              Detalhes do Produto
            </h2>
            <p className="text-black">
              <strong>ID:</strong> {selectedProduct.idProduto}
            </p>
            <p className="text-black">
              <strong>Nome:</strong> {selectedProduct.nomeProduto}
            </p>
            <p className="text-black">
              <strong>Valor por KG:</strong> {selectedProduct.valorKG} R$
            </p>
          </>
        )}
      </Modal>

      <EditProductModal
        product={selectedProduct}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
      />
    </div>
  );
}
