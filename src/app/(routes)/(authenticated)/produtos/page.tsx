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

export default function ProductsPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [readMode, setReadMode] = useState(false);

  // Usando o hook com as buscas de produto
  const { productSearch, setProductSearch } = useSearchStore();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await getProdutos();
        setProdutos(response);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        toast.error("Erro ao buscar produtos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const filteredProdutos = produtos.filter((produto) =>
    produto.nomeProduto.toLowerCase().includes(productSearch.toLowerCase())
  );

  const headerData = ["ID", "Nome do Produto", "Ativo", "Valor/Kg", "Ações"];

  const tableData = filteredProdutos.map((produto) => [
    produto.idProduto,
    produto.nomeProduto,
    produto.indAtivo ? "Sim" : "Não",
    produto.valorKG,
  ]);

  const handleRead = (rowIndex: number) => {
    const produto = filteredProdutos[rowIndex];
    setSelectedProduto(produto);
    setReadMode(true);
    setEditMode(false);
    setModalOpen(true);
  };

  const handleEdit = (rowIndex: number) => {
    const produto = filteredProdutos[rowIndex];
    setSelectedProduto(produto);
    setReadMode(false);
    setEditMode(true);
    setModalOpen(true);
  };

  const confirmDelete = (rowIndex: number) => {
    const id = filteredProdutos[rowIndex].idProduto;

    toast.warn(
      <>
        <p className="text-[12px]">Tem certeza que deseja excluir o produto:</p>
        <p>{filteredProdutos[rowIndex].nomeProduto}?</p>
        <div className="flex w-full justify-between">
          <button
            onClick={() => handleDelete(rowIndex)}
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

  const handleDelete = async (rowIndex: number) => {
    const id = filteredProdutos[rowIndex].idProduto;
    try {
      await deleteProduto(id);
      toast.success(`Produto deletado: ${id}`, {
        className: "bg-green-500 text-white p-4 rounded",
        progressClassName: "bg-white",
      });
      setProdutos(produtos.filter((p) => p.idProduto !== id));
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
      setProdutos(await getProdutos());
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
      indAtivo: false,
    });
    setReadMode(false);
    setEditMode(false);
    setModalOpen(true);
  };

  if (loading) {
    return <p>Carregando produtos...</p>;
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

      <Divider />

      <Table
        headerData={headerData}
        data={tableData}
        onClickRead={handleRead}
        onClickEdit={handleEdit}
        onClickDelete={confirmDelete}
      />

      {selectedProduto && (
        <DynamicModal
          data={selectedProduto}
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
