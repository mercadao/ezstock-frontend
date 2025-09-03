"use client";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, Toaster } from "react-hot-toast";


// Components
import Divider from "@/app/components/atoms/Divider";
import PainelHeader from "@/app/components/molecules/PainelHeader";
import Table from "@/app/components/organisms/Table";
import DinamicModalStockPost from "@/app/components/molecules/ModalEstoque/post";
import DinamicModalStockReduce from "@/app/components/molecules/ModalEstoque/reduce";

// Services
import {
  getEstoques,
  postAdicionaEstoque,
  postBaixaEstoque,
  Estoque,
} from "@/app/services/stockService";

import { getProdutoEspecifico } from "@/app/services/productService";

// Hook
import { useSearchStore } from "@/app/hooks/searchHook";
import { usePaginatedData, useDataRefresh } from "@/app/hooks/paginationHook";
import DinamicModalStockGet from "@/app/components/molecules/ModalEstoque/get";

export default function EstoquePage() {
  const [estoques, setEstoques] = useState<Estoque[]>([]);
  const [produtos, setProdutos] = useState<{ [key: number]: string }>({});
  const [selectedEstoque, setSelectedEstoque] = useState<Estoque | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalPostOpen, setModalPostOpen] = useState(false);
  const [isModalReduceOpen, setModalReduceOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { estoqueSearch, setEstoqueSearch } = useSearchStore();
  const { refresh, isRefreshing } = useDataRefresh();

  // Fetch data function
  const fetchEstoques = async () => {
    try {
      const response = await getEstoques();

      const produtoNames: { [key: number]: string } = {};
      await Promise.all(
        response.map(async (estoque) => {
          try {
            const produtoResponse = await getProdutoEspecifico(
              estoque.idProduto
            );
            produtoNames[estoque.idProduto] =
              produtoResponse?.produto?.nomeProduto ||
              "Produto não encontrado";
          } catch {
            produtoNames[estoque.idProduto] = "Erro ao carregar produto";
          }
        })
      );

      setEstoques(response);
      setProdutos(produtoNames);
    } catch (error) {
      console.error("Erro ao buscar estoques:", error);
      toast.error("Erro ao buscar estoques.");
    }
  };

  // Setup pagination with custom filter
  const {
    paginatedData: paginatedEstoques,
    currentPage,
    totalPages,
    totalItems,
    goToPage,
    handleDataChange
  } = usePaginatedData({
    data: estoques,
    itemsPerPage: 20,
    searchTerm: estoqueSearch,
    filterFn: (estoque, searchTerm) => {
      const produtoNome = produtos[estoque.idProduto] || "";
      return produtoNome.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchEstoques();
      setLoading(false);
    };
    loadData();
  }, []);

  // Handle data change for pagination reset
  useEffect(() => {
    handleDataChange();
  }, [estoques, handleDataChange]);
  const handleRead = (rowIndex: number) => {
    const estoque = estoques[rowIndex];
    setSelectedEstoque(estoque);
    setModalOpen(true);
    setEditMode(false);
  };

  const handleAddEstoque = () => {
    setSelectedEstoque(null);
    setModalPostOpen(true);
    setEditMode(false);
  };

  const handleReduce = (rowIndex: number) => {
    const estoque = estoques[rowIndex];
    setSelectedEstoque(estoque);
    setModalReduceOpen(true);
    setEditMode(true);
  };

  const handleSave = async (data: Estoque) => {
    try {
      if (isEditMode) {
        await postBaixaEstoque(data);
        toast.success("Baixa de estoque realizada com sucesso!");
      } else {
        await postAdicionaEstoque(data);
        toast.success("Novo estoque adicionado com sucesso!");
      }
      setModalOpen(false);
      setModalPostOpen(false);
      setModalReduceOpen(false);
      
      // Refresh data after save
      await refresh(fetchEstoques);
    } catch (error) {
      toast.error("Erro ao salvar estoque.");
    }
  };
  if (loading || isRefreshing)
    return (
      <div className="justify-center items-center flex h-full">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-black border-t-transparent"></div>
        <p className="text-black ml-4">
          {isRefreshing ? "Atualizando dados..." : "Carregando..."}
        </p>
      </div>
    );

  const headerData = ["Nome Produto", "Qtd Total", "Ativo"];
  const tableData = paginatedEstoques.map((estoque) => [
    produtos[estoque.idProduto] || "Carregando...",
    estoque.quantidadeAtual,
    estoque.indAtivo ? "Sim" : "Não",
  ]);

  // Create mapping for original indexes to handle pagination correctly
  const originalIndexes = paginatedEstoques.map(estoque => 
    estoques.findIndex(e => e.idEstoque === estoque.idEstoque)
  );

  return (
    <div className="my-4 w-full p-10">
      <h1 className="text-primary-900 text-2xl font-extrabold">Estoque</h1>
      <PainelHeader
        title="Tabela de Estoques"
        onAddClientClick={handleAddEstoque}
        buttonText="+ Adicionar Estoque"
        itemSearch={estoqueSearch}
        setItemSearch={setEstoqueSearch}
      />
      <Divider />      <Table
        headerData={headerData}
        data={tableData}
        onClickRead={handleRead}
        onClickEdit={handleReduce}
        deleteHidden={true}
        isBaixaEstoque
        withoutAtivo={true}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        itemsPerPage={20}
        totalItems={totalItems}
        showPagination={true}
        originalIndexes={originalIndexes}
      />
      <DinamicModalStockPost
        isOpen={isModalPostOpen}
        onClose={() => setModalPostOpen(false)}
        initialData={selectedEstoque}
        onSave={handleSave}
      />
      <DinamicModalStockGet
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        estoqueId={selectedEstoque?.idEstoque || 0}
      />
      <DinamicModalStockReduce
        isOpen={isModalReduceOpen}
        onClose={() => setModalReduceOpen(false)}
        initialData={selectedEstoque}
        onSave={handleSave}
      />

      <Toaster position="top-center" />
    </div>
  );
}
