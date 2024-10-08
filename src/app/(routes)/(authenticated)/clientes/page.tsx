"use client";

import { useEffect, useState } from "react";
import Divider from "@/app/components/atoms/Divider";
import PainelHeader from "@/app/components/molecules/PainelHeader";
import Table from "@/app/components/organisms/Table";
import DynamicModal from "@/app/components/molecules/DinamicModal";

// import SwitchPageHeader from "@/app/components/atoms/SwitchPageHeader";

import {
  getClients,
  deleteClient,
  Cliente,
  editClient,
  postClient,
} from "@/app/services/clientService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CategoriaCliente } from '../../../services/clientCategoryService';

export default function Clientes() {
  const [clientData, setClientData] = useState<Cliente[]>([]);
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [readMode, setReadMode] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isCreate, setIscreate] = useState(false);

  const headerData = [
    "ID",
    "Nome",
    "Email",
    "Telefone",
    "CNPJ",
    "Cidade",
    "Estado",
    "Ações",
  ];

  const fetchData = async () => {
    try {
      const clients = await getClients();
      setClientData(clients);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRead = (rowIndex: number) => {
    setSelectedClient(clientData[rowIndex]);
    setReadMode(true);
    setEditMode(false);
    setModalOpen(true);
  };

  const handleEdit = (rowIndex: number) => {
    setSelectedClient(clientData[rowIndex]);
    setReadMode(false);
    setEditMode(true);
    setModalOpen(true);
  };

  const confirmDelete = (rowIndex: number) => {
    const id = clientData[rowIndex].idCliente;

    toast.warn(
      <>
        <p className="text-[12px]">Tem certeza que deseja excluir o cliente:</p>
        <p>{clientData[rowIndex].nomeCliente}?</p>
        <div className="flex w-full justify-between">
          <button onClick={() => handleDelete(rowIndex)} className="btn-confirm hover:text-green-400">
            Confirmar
          </button>
          <button onClick={() => toast.dismiss()} className="btn-cancel hover:text-red-400">
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
    const id = clientData[rowIndex].idCliente;
    try {
      await deleteClient(id);
      await fetchData();
      toast.success(`Cliente deletado: ${id}`, {
        className: "bg-green-500 text-white p-4 rounded",
        progressClassName: "bg-white",
      });
    } catch (error) {
      toast.error(`Erro ao deletar cliente: ${id}`, {
        className: "bg-red-500 text-white p-4 rounded",
        progressClassName: "bg-white",
      });
      console.error(`Erro ao deletar cliente: ${id}`, error);
    }
  };

  const handleSave = async (updatedData: Cliente) => {
    const { idCliente, ...clientWithoutId } = updatedData;

    // Garantir que idCategoria e numero sejam números
    clientWithoutId.idCategoria = Number(clientWithoutId.idCategoria);
    clientWithoutId.numero = Number(clientWithoutId.numero);

    try {
      if (isEditMode) {
        await editClient(clientWithoutId, idCliente);
        toast.success("Cliente editado com sucesso!", {
          className: "bg-blue-500 text-white p-4 rounded",
          progressClassName: "bg-white",
        });
      } else {
        await postClient(clientWithoutId);
        toast.success("Novo cliente adicionado!", {
          className: "bg-green-500 text-white p-4 rounded",
          progressClassName: "bg-white",
        });
      }
      setModalOpen(false);
      await fetchData(); 
    } catch (error) {
      toast.error("Erro ao salvar cliente.", {
        className: "bg-red-500 text-white p-4 rounded",
        progressClassName: "bg-white",
      });
      console.error("Erro ao salvar cliente:", error);
    }
  };
  const items = [
    { name: "Cliente", route: "/clientes" },
    { name: "Categoria Cliente", route: "/clientes/categoriaCliente" },
  ];  

  const handleAddClient = () => {
    setSelectedClient({
      idCliente: 0,
      nomeCliente: "",
      emailCliente: "",
      telefoneCliente: "",
      cnpj: "",
      cidade: "",
      estado: "",
      idCategoria: 0,
      inscricaoEstadual: "",
      bairro: "",
      logradouro: "",
      numero: 0,
      complemento: "",
      cep: "",
    });
    setReadMode(false);
    setEditMode(false);
    setIscreate(true)
    setModalOpen(true);
  };

  return (
    <div className="my-4 w-full p-10">
      <h1 className="text-primary-900 text-2xl font-extrabold">Clientes</h1>

      {/* <SwitchPageHeader itemHeader="" items={items} /> */}


      <PainelHeader
        title="Tabela de Clientes"
        onAddClientClick={handleAddClient}
      />

      <Divider />

      <Table
        headerData={headerData}
        data={clientData.map(client => [
          client.idCliente,
          client.nomeCliente,
          client.emailCliente,
          client.telefoneCliente,
          client.cnpj,
          client.cidade,
          client.estado,
        ])}
        onClickRead={handleRead}
        onClickEdit={handleEdit}
        onClickDelete={confirmDelete}
      />

      {selectedClient && (
        <DynamicModal
          data={selectedClient}
          isEditMode={isEditMode}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          isReadOnly={readMode}
          onSave={handleSave}
        />
      )}

      <ToastContainer position="top-center"/>
    </div>
  );
}
