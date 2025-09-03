"use client"

import { useEffect, useState } from "react";
import Divider from "@/app/components/atoms/Divider";
import PainelHeader from "@/app/components/molecules/PainelHeader";
import Table from "@/app/components/organisms/Table";
import DynamicModal from "@/app/components/molecules/DinamicModal";
import { getCategoriaClientes } from "@/app/services/clientCategoryService";

import {
  getClients,
  deleteClient,
  Cliente,
  editClient,
  postClient,
} from "@/app/services/clientService";
import { toast, Toaster } from "react-hot-toast";

import { useSearchStore } from "@/app/hooks/searchHook"; 
import { usePaginatedData, useDataRefresh } from "@/app/hooks/paginationHook";

export default function Clientes() {
  const [clientData, setClientData] = useState<Cliente[]>([]);
  const [clientCategorysData, setClientCategorysData] = useState<any[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [readMode, setReadMode] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isCreate, setIscreate] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  
  // Usando o hook com as buscas de produto
  const { clientsSearch, setClientsSearch } = useSearchStore();
  const { refresh, isRefreshing } = useDataRefresh();
  const headerData = [
    "ID",
    "Nome",
    "Email",
    "Telefone",
    "CNPJ",
    "Cidade",
    "Estado",
  ];

  // Função para buscar os clientes
  const fetchClients = async () => {
    try {
      const clients = await getClients();
      setClientData(clients);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  // Função para buscar as categorias de clientes e mapear as opções
  const fetchClientCategories = async () => {
    try {
      const clienteCategoryData = await getCategoriaClientes();
      // Mapeando as categorias para o formato correto
      const options = clienteCategoryData.categoriaCliente.map((category: any) => ({
        value: category.idCategoria,
        label: category.desCategoriaCliente,
      }));

      setClientCategorysData(clienteCategoryData);
      setCategoryOptions(options); // Atualizando categoryOptions dinamicamente
    } catch (error) {
      console.error("Erro ao buscar categorias de clientes:", error);
    }
  };
  // Função principal que chama as duas funções acima
  const fetchData = async () => {
    await fetchClients();
    await fetchClientCategories();
  };

  // Setup pagination
  const {
    paginatedData: paginatedClients,
    currentPage,
    totalPages,
    totalItems,
    goToPage,
    handleDataChange
  } = usePaginatedData({
    data: clientData,
    itemsPerPage: 20,
    searchTerm: clientsSearch,
    searchFields: ['nomeCliente' as keyof Cliente]
  });

  useEffect(() => {
    fetchData();
  }, []);

  // Handle data change for pagination reset
  useEffect(() => {
    handleDataChange();
  }, [clientData, handleDataChange]);
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
    const clientName = clientData[rowIndex].nomeCliente;
  
    toast(
      (t) => (
        <div className="space-y-2">
          <p className="text-[12px]">Tem certeza que deseja excluir o cliente:</p>
          <p>{clientName}?</p>
          <div className="flex w-full justify-between">
            <button
              onClick={() => {
                handleDelete(rowIndex);
                toast.dismiss(t.id); // Dismiss the toast after confirming
              }}
              className="btn-confirm hover:text-green-400"
            >
              Confirmar
            </button>
            <button
              onClick={() => toast.dismiss(t.id)} // Dismiss the toast on cancel
              className="btn-cancel hover:text-red-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        position: 'top-center',
        duration: Infinity, // Prevent the toast from closing automatically
        icon: '⚠️',
        style: {
          background: '#fff3cd',
          color: '#856404',
          border: '1px solid #ffeeba',
        },
      }
    );
  };
  const handleDelete = async (rowIndex: number) => {
    const id = clientData[rowIndex].idCliente;
    try {
      await deleteClient(id);
      toast.success(`Cliente deletado: ${id}`, {
        className: "bg-green-500 text-white p-4 rounded",
      });
      
      // Refresh data after delete
      await refresh(fetchData);
    } catch (error) {
      toast.error(`Erro ao deletar cliente: ${id}`, {
        className: "bg-red-500 text-white p-4 rounded",
      });
      console.error(`Erro ao deletar cliente: ${id}`, error);
    }
  };

  const handleSave = async (updatedData: Cliente) => {
    const { idCliente, ...clientWithoutId } = updatedData;
    const toastId = isEditMode ? `edit_${idCliente}` : "create_new";

    clientWithoutId.idCategoria = Number(clientWithoutId.idCategoria);

    if (isProcessing) return;

    setIsProcessing(true); 

    try {
      if (isEditMode) {
        await editClient(clientWithoutId, idCliente);

        toast.dismiss(toastId);
        toast.success("Cliente editado com sucesso!", {
          className: "bg-blue-500 text-white p-4 rounded",
        });
      } else {
        await postClient(clientWithoutId);

        toast.dismiss(toastId); 
        toast.success("Novo cliente adicionado!", {
          className: "bg-green-500 text-white p-4 rounded",
        });
      }      setModalOpen(false);

      await refresh(fetchData);
    } catch (error) {
      toast.dismiss(toastId); 
      toast.error("Erro ao salvar cliente.", {
        className: "bg-red-500 text-white p-4 rounded",
      });
      console.error("Erro ao salvar cliente:", error);
    } finally {
      setIsProcessing(false); 
    }
  };


  const handleAddClient = () => {
    setSelectedClient({
      idCliente: 0,
      nomeCliente: "",
      emailCliente: "",
      telefoneCliente: "",
      cnpj: "",
      cidade: "",
      estado: "",
      idCategoria: null ,
      inscricaoEstadual: "",
      bairro: "",
      logradouro: "",
      numero: 0,
      complemento: "",
      cep: "",
    });
    setReadMode(false);
    setEditMode(false);
    setIscreate(true);
    setModalOpen(true);
  };
  const labelNames = [
    "Nome do Cliente",
    "Email do Cliente", 
    "Telefone do Cliente",
    "CNPJ",
    "Inscrição Estadual",
    "Estado",
    "Cidade",
    "Bairro",
    "Logradouro",
    "Numero",
    "Complemento",
    "CEP",
  ];
  

  return (
    <div className="my-4 w-full p-10">
      <h1 className="text-primary-900 text-2xl font-extrabold">Clientes</h1>

      {/* <SwitchPageHeader itemHeader="" items={items} /> */}

      <PainelHeader
        title="Tabela de Clientes"
        onAddClientClick={handleAddClient}
        buttonText="+ Adicionar cliente"
        itemSearch={clientsSearch}    
        setItemSearch={setClientsSearch}  
      />

      <Divider />      <Table
        headerData={headerData}
        data={paginatedClients.map((client: Cliente) => [
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
        withoutId
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        itemsPerPage={20}
        totalItems={totalItems}
        showPagination={true}
        originalIndexes={paginatedClients.map((client: Cliente) => 
          clientData.findIndex(c => c.idCliente === client.idCliente)
        )}
      />

      {selectedClient && (
        <DynamicModal
          modalName="Cliente"
          data={selectedClient}
          isEditMode={isEditMode}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          isReadOnly={readMode}
          onSave={handleSave}
          selectLabel="Categoria do Cliente"  
          selectOptions={categoryOptions} 
          labelNames={labelNames}
        />
      )}

      <Toaster position="top-center" />
    </div>
  );
}
