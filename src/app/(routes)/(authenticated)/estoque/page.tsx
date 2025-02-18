"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchEstoques();
  }, []);

  const filteredEstoques = estoques.filter((estoque) =>
    produtos[estoque.idProduto]
      ?.toLowerCase()
      .includes(estoqueSearch.toLowerCase())
  );

  const handleRead = (rowIndex: number) => {
    const estoque = filteredEstoques[rowIndex];
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
    const estoque = filteredEstoques[rowIndex];
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
      const updatedEstoques = await getEstoques();
      setEstoques(updatedEstoques);
    } catch (error) {
      toast.error("Erro ao salvar estoque.");
    }
  };

  if (loading)
    return (
      <div className="justify-center items-center flex h-full">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-black border-t-transparent"></div>
        <p className="text-black ml-4">Carregando...</p>
      </div>
    );

  const headerData = ["Nome Produto", "Qtd Total", "Ativo", "Ações"];
  const tableData = filteredEstoques.map((estoque) => [
    produtos[estoque.idProduto] || "Carregando...",
    estoque.quantidadeAtual,
    estoque.indAtivo ? "Sim" : "Não",
  ]);

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
      <Divider />
      <Table
        headerData={headerData}
        data={tableData}
        onClickRead={handleRead}
        onClickEdit={handleReduce}
        deleteHidden={true}
        isBaixaEstoque
        withoutAtivo={true}
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

      <ToastContainer position="top-center" />
    </div>
  );
}
