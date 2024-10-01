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
  getEstoques,
  postAdicionaEstoque,
  postBaixaEstoque,
  Estoque,
} from "@/app/services/stockService";
import { getProdutoEspecifico } from "@/app/services/productService"; 

import { useProductSearchStore } from "@/app/hooks/searchHook";

export default function EstoquePage() {
  const [estoques, setEstoques] = useState<Estoque[]>([]);
  const [produtos, setProdutos] = useState<{ [key: number]: string }>({});
  const [selectedEstoque, setSelectedEstoque] = useState<Estoque | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [readMode, setReadMode] = useState(false);

  const { productSearch, setProductSearch } = useProductSearchStore();

  useEffect(() => {
    const fetchEstoques = async () => {
      try {
        const response = await getEstoques();
        setEstoques(response);
        
        // Para cada estoque, busque o nome do produto e armazene no estado 'produtos'
        const produtoNames: { [key: number]: string } = {};
        await Promise.all(
          response.map(async (estoque) => {
            try {
              const produtoResponse = await getProdutoEspecifico(estoque.idProduto);
              if (produtoResponse.sucesso && produtoResponse.produto) {
                produtoNames[estoque.idProduto] = produtoResponse.produto.nomeProduto;
              } else {
                produtoNames[estoque.idProduto] = "Produto não encontrado";
              }
            } catch (error) {
              console.error(`Erro ao buscar produto ${estoque.idProduto}:`, error);
              produtoNames[estoque.idProduto] = "Erro ao carregar produto";
            }
          })
        );
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
    estoque.idProduto.toString().includes(productSearch)
  );

  const headerData = ["Nome Produto", "Qtd Total", "Ativo", "Ações"];

  const tableData = filteredEstoques.map((estoque) => [
    produtos[estoque.idProduto] || "Carregando...",
    estoque.quantidadeAtual,
    estoque.indAtivo ? "Sim" : "Não",
  ]);

  const handleRead = (rowIndex: number) => {
    const estoque = filteredEstoques[rowIndex];
    setSelectedEstoque(estoque);
    setReadMode(true);
    setEditMode(false);
    setModalOpen(true);
  };

  const handleAddEstoque = () => {
    setSelectedEstoque({
      idProduto: 0,
      idCliente: 0,
      idEstoque: 0,
      idUsuario: 0,
      valorNovo: 0,
      qtdTotalEmTela: 0,
      dataInicioValidade: "",
      dataFinalValidade: "",
      indAtivo: 1,
      tipoTransacao: 1,
    });
    setReadMode(false);
    setEditMode(false);
    setModalOpen(true);
  };

  const handleSave = async (updatedEstoque: Estoque) => {
    try {
      if (isEditMode) {
        await postBaixaEstoque(updatedEstoque);
        toast.success("Baixa de estoque realizada com sucesso!", {
          className: "bg-blue-500 text-white p-4 rounded",
          progressClassName: "bg-white",
        });
      } else {
        await postAdicionaEstoque(updatedEstoque);
        toast.success("Novo estoque adicionado!", {
          className: "bg-green-500 text-white p-4 rounded",
          progressClassName: "bg-white",
        });
      }
      setModalOpen(false);
      setEstoques(await getEstoques());
    } catch (error) {
      toast.error("Erro ao salvar estoque.", {
        className: "bg-red-500 text-white p-4 rounded",
        progressClassName: "bg-white",
      });
      console.error("Erro ao salvar estoque:", error);
    }
  };

  if (loading) {
    return <p>Carregando estoques...</p>;
  }

  return (
    <div className="my-4 w-full p-10">
      <h1 className="text-primary-900 text-2xl font-extrabold">Estoque</h1>

      <PainelHeader
        title="Tabela de Estoques"
        onAddClientClick={handleAddEstoque}
        buttonText="+ Adicionar Estoque"
        productSearch={productSearch}
        setProductSearch={setProductSearch}
      />

      <Divider />

      <Table
        headerData={headerData}
        data={tableData}
        onClickRead={handleRead}
      />

      {selectedEstoque && (
        <DynamicModal
          data={selectedEstoque}
          isEditMode={isEditMode}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          isReadOnly={readMode}
          onSave={handleSave}
        />
      )}

      <ToastContainer position="top-center" />
    </div>
  );
}
