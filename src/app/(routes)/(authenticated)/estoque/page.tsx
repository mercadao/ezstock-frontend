"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Divider from "@/app/components/atoms/Divider";
import PainelHeader from "@/app/components/molecules/PainelHeader";
import Table from "@/app/components/organisms/Table";
import DinamicModalStockPost from "@/app/components/molecules/DinamicModalStock/post";

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
import DinamicModalStockGet from "@/app/components/molecules/DinamicModalStock/get";

export default function EstoquePage() {
  const [estoques, setEstoques] = useState<Estoque[]>([]);
  const [produtos, setProdutos] = useState<{ [key: number]: string }>({});
  const [selectedEstoque, setSelectedEstoque] = useState<Estoque | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
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
              const produtoResponse = await getProdutoEspecifico(estoque.idProduto);
              produtoNames[estoque.idProduto] =
                produtoResponse?.produto?.nomeProduto || "Produto não encontrado";
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
    setModalOpen(true);
    setEditMode(false);
  };

  const handleEdit = (rowIndex: number) => {
    const estoque = filteredEstoques[rowIndex];
    setSelectedEstoque(estoque);
    setModalOpen(true);
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
      const updatedEstoques = await getEstoques();
      setEstoques(updatedEstoques);
    } catch (error) {
      toast.error("Erro ao salvar estoque.");
    }
  };

  if (loading) return <p>Carregando estoques...</p>;

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
        onClickEdit={handleEdit}
        deleteHidden={true}
      />
      {/* <DinamicModalStockPost
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        initialData={selectedEstoque}
        onSave={handleSave}
      /> */}
      <DinamicModalStockGet
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        estoqueId={selectedEstoque?.idEstoque || 0}
      />
      
      <ToastContainer position="top-center" />
    </div>
  );
}
