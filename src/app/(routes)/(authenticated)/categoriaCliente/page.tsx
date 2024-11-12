"use client";

import { useEffect, useState } from "react";
import Divider from "@/app/components/atoms/Divider";
import PainelHeader from "@/app/components/molecules/PainelHeader";
import Table from "@/app/components/organisms/Table";
import DynamicModal from "@/app/components/molecules/DinamicModal";
import {
  getCategoriaClientes,
  deleteCategoriaCliente,
  CategoriaCliente,
  editCategoriaCliente,
  postCategoriaCliente,
} from "@/app/services/clientCategoryService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSearchStore } from "@/app/hooks/searchHook"; 

export default function ClienteCategorias() {
  const [clientCategoryData, setClientCategoryData] = useState<CategoriaCliente[]>([]);
  const [selectedClientCategory, setSelectedClientCategory] = useState<CategoriaCliente | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [readMode, setReadMode] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);

  const headerData = ["ID", "Nome da Categoria", "Ações"];

  // Usando o hook com as buscas de produto
  const { categoryClientsSearch, setCategoryClientsSearch } = useSearchStore();

  const fetchData = async () => {
    try {
      const response = await getCategoriaClientes();
      console.log(response);
      if (response.sucesso) {
        setClientCategoryData(response.categoriaCliente);
      } else {
        console.error("Erro: ", response.mensagem);
      }
    } catch (error) {
      console.error("Erro ao buscar categorias de clientes:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCategoryClientDada = clientCategoryData.filter((categoryClient) =>
    categoryClient.desCategoriaCliente.toLowerCase().includes(categoryClientsSearch.toLowerCase())
  );

  const handleRead = (rowIndex: number) => {
    setSelectedClientCategory(clientCategoryData[rowIndex]);
    setReadMode(true);
    setEditMode(false);
    setModalOpen(true);
  };

  const handleEdit = (rowIndex: number) => {
    setSelectedClientCategory(clientCategoryData[rowIndex]);
    setReadMode(false);
    setEditMode(true);
    setModalOpen(true);
  };

  const confirmDelete = (rowIndex: number) => {
    const toastId = `delete_${clientCategoryData[rowIndex].idCategoria}`; // Identificador único para o toast

    if (!toast.isActive(toastId)) {
      toast.warn(
        <>
          <p className="text-[12px]">Tem certeza que deseja excluir a categoria:</p>
          <p>{clientCategoryData[rowIndex].desCategoriaCliente}?</p>
          <div className="flex w-full justify-between">
            <button onClick={() => {
              handleDelete(rowIndex) 
              toast.dismiss();
            }} className="btn-confirm hover:text-green-400">
              Confirmar
            </button>
            <button onClick={() => toast.dismiss(toastId)} className="btn-cancel hover:text-red-400">
              Cancelar
            </button>
          </div>
        </>,
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
          toastId,
        }
      );
    }
  };

  const handleDelete = async (rowIndex: number) => {
    const id = clientCategoryData[rowIndex].idCategoria;
    const toastId = `delete_${id}`;

    try {
      await deleteCategoriaCliente(id);
      await fetchData();

      if (!toast.isActive(toastId)) {
        toast.success(`Categoria deletada: ${id}`, {
          className: "bg-green-500 text-white p-4 rounded",
          progressClassName: "bg-white",
          toastId,
        });
      }
    } catch (error) {
      if (!toast.isActive(toastId)) {
        toast.error(`Erro ao deletar categoria: ${id}`, {
          className: "bg-red-500 text-white p-4 rounded",
          progressClassName: "bg-white",
          toastId,
        });
      }
      console.error(`Erro ao deletar categoria: ${id}`, error);
    }
  };

  const handleSave = async (updatedData: CategoriaCliente) => {
    const { idCategoria, ...clientCategoryWithoutId } = updatedData;
    const toastId = isEditMode ? `edit_${idCategoria}` : "create_new";

    try {
      if (isEditMode) {
        await editCategoriaCliente(clientCategoryWithoutId, idCategoria);

        if (!toast.isActive(toastId)) {
          toast.success("Categoria editada com sucesso!", {
            className: "bg-blue-500 text-white p-4 rounded",
            progressClassName: "bg-white",
            toastId,
          });
        }
      } else {
        await postCategoriaCliente(clientCategoryWithoutId);

        if (!toast.isActive(toastId)) {
          toast.success("Nova categoria adicionada!", {
            className: "bg-green-500 text-white p-4 rounded",
            progressClassName: "bg-white",
            toastId,
          });
        }
      }
      setModalOpen(false);
      await fetchData();
    } catch (error) {
      if (!toast.isActive(toastId)) {
        toast.error("Erro ao salvar categoria.", {
          className: "bg-red-500 text-white p-4 rounded",
          progressClassName: "bg-white",
          toastId,
        });
      }
      console.error("Erro ao salvar categoria:", error);
    }
  };

  const handleAddClientCategory = () => {
    setSelectedClientCategory({
      idCategoria: 0,
      desCategoriaCliente: "",
    });
    setReadMode(false);
    setEditMode(false);
    setIsCreateMode(true);
    setModalOpen(true);
  };

  return (
    <div className="my-4 w-full p-10">
      <h1 className="text-primary-900 text-2xl font-extrabold">Categorias de Clientes</h1>

      <PainelHeader 
        title="Tabela de Categorias de Clientes" 
        onAddClientClick={handleAddClientCategory}
        buttonText="+ Categoria de Cliente"
        itemSearch={categoryClientsSearch}    
        setItemSearch={setCategoryClientsSearch} 
      />

      <Divider />

      <Table
        headerData={headerData}
        data={filteredCategoryClientDada.map((clientCategory) => [
          clientCategory.idCategoria,
          clientCategory.desCategoriaCliente,
        ])}
        onClickRead={handleRead}
        onClickEdit={handleEdit}
        onClickDelete={confirmDelete}
      />

      {selectedClientCategory && (
        <DynamicModal
          data={selectedClientCategory}
          isEditMode={isEditMode}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          isReadOnly={readMode}
          onSave={handleSave}
        />
      )}

      <ToastContainer containerId="clientCategoryContainer" position="top-center" />
    </div>
  );
}
