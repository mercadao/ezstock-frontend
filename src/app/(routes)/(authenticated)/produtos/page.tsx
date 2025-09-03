"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Divider from "@/app/components/atoms/Divider";
import PainelHeader from "@/app/components/molecules/PainelHeader";
import Table from "@/app/components/organisms/Table";
import DynamicModal from "@/app/components/molecules/DinamicModal";

// Services
import {
  getProdutos,
  addProduto,
  editProduto,
  deleteProduto,
  Produto,
} from "@/app/services/productService";

// Importando o hook SearchStore correto
import { useSearchStore } from "@/app/hooks/searchHook";
import { usePaginatedData, useDataRefresh } from "@/app/hooks/paginationHook";

export default function ProductsPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [readMode, setReadMode] = useState(false);

  // Usando o hook com as buscas de produto
  const { productSearch, setProductSearch } = useSearchStore();
  const { refresh, isRefreshing } = useDataRefresh();

  const fetchProdutos = async () => {
    try {
      const response = await getProdutos();
      setProdutos(response);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      toast.error("Erro ao buscar produtos.");
    }
  };

  // Regex dinâmica para o filtro de busca
  const createDynamicRegex = (searchTerm: string) => {
    return new RegExp(searchTerm.split("").join(".*"), "i"); // Regex que permite busca por qualquer parte do termo
  };

  // Setup pagination
  const {
    paginatedData: paginatedProdutos,
    currentPage,
    totalPages,
    totalItems,
    goToPage,
    handleDataChange
  } = usePaginatedData({
    data: produtos,
    itemsPerPage: 20,
    searchTerm: productSearch,
    filterFn: (produto, searchTerm) => {
      return createDynamicRegex(searchTerm).test(produto.nomeProduto);
    }
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchProdutos();
      setLoading(false);
    };
    loadData();
  }, []);

  // Handle data change for pagination reset
  useEffect(() => {
    handleDataChange();  }, [produtos, handleDataChange]);
  const headerData = ["ID", "Nome do Produto", "Ativo", "Valor/Kg"];

  const tableData = paginatedProdutos.map((produto) => [
    produto.idProduto,
    produto.nomeProduto,
    produto.indAtivo ? "Sim" : "Não",
    produto.valorKG,
  ]);

  // Create mapping for original indexes to handle pagination correctly
  const originalIndexes = paginatedProdutos.map(produto => 
    produtos.findIndex(p => p.idProduto === produto.idProduto)
  );

  const handleRead = (rowIndex: number) => {
    const produto = produtos[rowIndex];
    setSelectedProduto(produto);
    setReadMode(true);
    setEditMode(false);
    setModalOpen(true);
  };

  const handleEdit = (rowIndex: number) => {
    const produto = produtos[rowIndex];
    setSelectedProduto(produto);
    setReadMode(false);
    setEditMode(true);
    setModalOpen(true);
  };
  // Função para confirmar exclusão do produto
  const confirmDelete = (rowIndex: number) => {
    const produto = produtos[rowIndex];
    const id = produto.idProduto;

    toast.warn(
      <>
        <p className="text-[12px] font-bold">
          Tem certeza que deseja excluir o produto:
        </p>
        <p>{produto.nomeProduto}?</p>
        <div className="flex w-full justify-between">
          <button
            onClick={() => {
              handleDelete(rowIndex);
              toast.dismiss();
            }}
            className="btn-confirm hover:text-green-400"
          >
            Confirmar
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="btn-cancel hover:text-red-400"
          >
            Cancelar
          </button>
        </div>
      </>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      }
    );
  };
  // Função para deletar o produto
  const handleDelete = async (rowIndex: number) => {
    const produto = produtos[rowIndex];
    const id = produto.idProduto;
    try {
      await deleteProduto(id as number);
      toast.success(`Produto deletado: ${id}`, {
        className: "bg-green-500 text-white p-4 rounded",
        progressClassName: "bg-white",
      });
      
      // Refresh data after delete
      await refresh(fetchProdutos);
    } catch (error) {
      toast.error(`Erro ao deletar produto: ${id}`, {
        className: "bg-red-500 text-white p-4 rounded",
        progressClassName: "bg-white",
      });
      console.error(`Erro ao deletar produto: ${id}`, error);
    }
  };
  const handleSave = async (updatedProduto: Produto) => {
    const { idProduto, ...produtoSemId } = updatedProduto;

    try {
      if (isEditMode) {
        await editProduto(updatedProduto);
        toast.success("Produto editado com sucesso!", {
          className: "bg-blue-500 text-white p-4 rounded",
          progressClassName: "bg-white",
        });
      } else {
        await addProduto(produtoSemId);
        toast.success("Novo produto adicionado!", {
          className: "bg-green-500 text-white p-4 rounded",
          progressClassName: "bg-white",
        });
      }
      setModalOpen(false);
      
      // Refresh data after save
      await refresh(fetchProdutos);
    } catch (error) {
      toast.error("Erro ao salvar produto.", {
        className: "bg-red-500 text-white p-4 rounded",
        progressClassName: "bg-white",
      });
      console.error("Erro ao salvar produto:", error);
    }
  };
  const handleAddProduct = () => {
    setSelectedProduto({
      idProduto: 0,
      nomeProduto: "",
      valorKG: 0,
      indAtivo: true
    });
    setReadMode(false);
    setEditMode(false);
    setModalOpen(true);
  };
  if (loading) {
    return (
      <div className="justify-center items-center flex h-full">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-black border-t-transparent"></div>
        <p className="text-black ml-4">
          {isRefreshing ? "Atualizando dados..." : "Carregando..."}
        </p>
      </div>
    );
  }

  return (
    <div className="my-4 w-full p-10">
      <h1 className="text-primary-900 text-2xl font-extrabold">Produtos</h1>

      <PainelHeader
        title="Tabela de Produtos"
        onAddClientClick={handleAddProduct}
        buttonText="+ Adicionar Produto"
        itemSearch={productSearch}
        setItemSearch={setProductSearch}
      />

      <Divider />      <Table
        headerData={headerData}
        data={tableData}
        onClickRead={handleRead}
        onClickEdit={handleEdit}
        onClickDelete={confirmDelete}
        withoutId={true}
        withoutAtivo={true}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        itemsPerPage={20}
        totalItems={totalItems}
        showPagination={true}
        originalIndexes={originalIndexes}
      />

      {selectedProduto && (
        <DynamicModal
          modalName="Produto"
          data={selectedProduto}
          isEditMode={isEditMode}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          isReadOnly={readMode}
          onSave={handleSave}
          labelNames={["Nome do Produto", "Valor/Kg"]}
        />
      )}

      <ToastContainer position="top-center" />
    </div>
  );
}
