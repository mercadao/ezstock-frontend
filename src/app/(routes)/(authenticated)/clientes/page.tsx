"use client";

import { useState, useEffect } from "react";
import { Info, Edit, Trash } from "lucide-react";
import { Item } from "@/app/types/index";
import { getClients } from "@/app/services/getClients";
import { postClient } from "@/app/services/postClient";
import { putClient } from "@/app/services/putClient" // Certifique-se de que esta função está importada
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Table from "@/app/components/organisms/Table";
import Divider from "@/app/components/atoms/Divider";
import PainelHeader from "@/app/components/molecules/PainelHeader";
import SwitchPageHeader from "@/app/components/atoms/SwitchPageHeader";
import Modal from "@/app/components/atoms/Modal";
import { TableCellProps } from "@/app/components/atoms/TableCell";

const items = [
  { name: "Cliente", route: "/clientes" },
  { name: "Categoria Cliente", route: "/clientes/categoriaCliente" },
];  

const generateHeaders = (): TableCellProps[] => {
  return [
    { text: "Nome", type: "header" },
    { text: "Email", type: "header" },
    { text: "Telefone", type: "header" },
    { text: "Cidade", type: "header" },
    { text: "CEP", type: "header" },
    { text: "Ações", type: "header" },
  ];
};

const mapRowData = (client: Item, onInfoClick: (item: Item) => void, onEditClick: (item: Item) => void): TableCellProps[] => {
  const rowData: TableCellProps[] = [
    { text: client.nomeCliente?.toString() || "N/A", type: "body" },
    { text: client.emailCliente?.toString() || "N/A", type: "body" },
    { text: client.telefoneCliente?.toString() || "N/A", type: "body" },
    { text: client.cidade?.toString() || "N/A", type: "body" },
    { text: client.cep?.toString() || "N/A", type: "body" },
    {
      icon: (
        <div className="flex space-x-2">
          <Info
            className="cursor-pointer text-gray-500 hover:text-yellow-400"
            size={20}
            onClick={() => onInfoClick(client)}
          />
          <Edit
            className="cursor-pointer text-gray-500 hover:text-primary-400"
            size={20}
            onClick={() => onEditClick(client)}
          />
          <Trash className="cursor-pointer text-gray-500 hover:text-red-500" size={20} />
        </div>
      ),
      type: "body",
    },
  ];

  return rowData;
};

export default function Clientes() {
  const [fullItemsList, setFullItemsList] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [inputValues, setInputValues] = useState({
    nomeCliente: "",
    emailCliente: "",
    telefoneCliente: "",
    cidade: "",
    cep: "",
    inscricaoEstadual: "",
    cnpj: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    estado: "",
    logradouro: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const clientes = await getClients();
      setFullItemsList(clientes);
    };

    fetchData();
  }, []);

  const handleInfoClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleEditClick = (item: Item) => {
    setSelectedItem(item);
    setInputValues({
      nomeCliente: item.nomeCliente || "",
      emailCliente: item.emailCliente || "",
      telefoneCliente: item.telefoneCliente || "",
      cidade: item.cidade || "",
      cep: item.cep || "",
      inscricaoEstadual: item.inscricaooEstadual || "",
      cnpj: item.cnpj || "",
      endereco: item.endereco || "",
      numero: item.numero || "",
      complemento: item.complemento || "",
      bairro: item.bairro || "",
      estado: item.estado || "",
      logradouro: item.logradouro || ""
    });
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);  
    setSelectedItem(null);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      nomeCliente: e.target.value,
    }));
  }

const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      cep: e.target.value,
    }));
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      emailCliente: e.target.value,
    }));
  }

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      telefoneCliente: e.target.value,
    }));
  }

  const handleCidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      cidade: e.target.value,
    }));
  }

  const handleInscricaoEstadualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      inscricaoEstadual: e.target.value,
    }));
  }

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      cnpj: e.target.value,
    }));
  }

  const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      endereco: e.target.value,
    }));
  }

  const handleNumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      numero: e.target.value,
    }));
  }

  const handleComplementoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      complemento: e.target.value,
    }));
  }

  const handleBairroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      bairro: e.target.value,
    }));
  }

  const handleEstadoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      estado: e.target.value,
    }));
  }

  const handleLogradouroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      logradouro: e.target.value,
    }));
  }


  const handleAddClient = async () => {
    try {
      const newClient = { ...inputValues };
      await postClient(newClient);
      setIsModalOpen(false);
      setInputValues({ nomeCliente: "", emailCliente: "", telefoneCliente: "", cidade: "", cep: "", inscricaoEstadual: "", cnpj: "", endereco: "", numero: "", complemento: "", bairro: "", estado: "", logradouro: "" });
      const clients = await getClients();
      setFullItemsList(clients);
      toast.success('Cliente adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
      toast.error('Erro ao adicionar o cliente. Por favor, tente novamente.');
    }
  };

  const handleEditClient = async () => {
    try {
      if (selectedItem) {
        const updatedClient = { ...inputValues, idCliente: selectedItem.idCliente };
        await putClient(updatedClient);
        setIsEditModalOpen(false);
        setSelectedItem(null);
        setInputValues({ nomeCliente: "", emailCliente: "", telefoneCliente: "", cidade: "", cep: "" , inscricaoEstadual: "", cnpj: "", endereco: "", numero: "", complemento: "", bairro: "", estado: "" });
        const clients = await getClients();
        setFullItemsList(clients);
        toast.success('Cliente editado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao editar cliente:', error);
      toast.error('Erro ao editar o cliente. Por favor, tente novamente.');
    }
  };

  const inputs = [
    {
      type: "text",
      placeholder: "Digite o nome do cliente...",
      value: inputValues.nomeCliente,
      onChange: handleNameChange,
      name: "nomeCliente"
    },
    {
      type: "email",
      placeholder: "Digite o email do cliente...",
      value: inputValues.emailCliente,
      onChange: handleEmailChange,
      name: "emailCliente"
    },
    {
      type: "text",
      placeholder: "Digite o telefone do cliente...",
      value: inputValues.telefoneCliente,
      onChange: handleTelefoneChange,
      name: "telefoneCliente"
    },
    {
      type: "text",
      placeholder: "Digite a cidade do cliente...",
      value: inputValues.cidade,
      onChange: handleCidadeChange,
      name: "cidade"
    },
    {
      type: "text",
      placeholder: "Digite o CEP do cliente...",
      value: inputValues.cep,
      onChange: handleCepChange,
      name: "cep"
    },
    {
      type: "text",
      placeholder: "Digite a inscrição estadual do cliente...",
      value: inputValues.inscricaoEstadual,
      onChange: handleInscricaoEstadualChange,
      name: "inscricaoEstadual"
    },
    {
      type: "text",
      placeholder: "Digite o CNPJ do cliente...",
      value: inputValues.cnpj,
      onChange: handleCnpjChange,
      name: "cnpj"
    },
    {
      type: "text",
      placeholder: "Digite o endereço do cliente...",
      value: inputValues.endereco,
      onChange: handleEnderecoChange,
      name: "endereco"
    },
    {
      type: "text",
      placeholder: "Digite o número do cliente...",
      value: inputValues.numero,
      onChange: handleNumeroChange,
      name: "numero"
    },
    {
      type: "text",
      placeholder: "Digite o complemento do cliente...",
      value: inputValues.complemento,
      onChange: handleComplementoChange,
      name: "complemento"
    },
    {
      type: "text",
      placeholder: "Digite o bairro do cliente...",
      value: inputValues.bairro,
      onChange: handleBairroChange,
      name: "bairro"
    },
    {
      type: "text",
      placeholder: "Digite o estado do cliente...",
      value: inputValues.estado,
      onChange: handleEstadoChange,
      name: "estado"
    },
    {
      type: "text",
      placeholder: "Digite o Logradouro do cliente...",
      value: inputValues.logradouro,
      onChange: handleLogradouroChange,
      name: "logradouro"
    }
  ];

  return (
    <div className="my-4 w-full p-10">
      <h1 className="text-primary-900 text-2xl font-extrabold">Clientes</h1>
      <div className="pb-3">
        <SwitchPageHeader itemHeader="" items={items} />
      </div>

      <PainelHeader title="Tabela de Clientes" onAddProductClick={() => setIsModalOpen(true)} />
      <Divider />
      <Table<Item>
        fetchData={async () => {
          const clients = await getClients();
          setFullItemsList(clients);
          return clients;
        }}
        generateHeaders={generateHeaders}
        mapRowData={(item) => mapRowData(item, handleInfoClick, handleEditClick)}
      />
      <Modal
        inputs={inputs}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddClient}
        title="Adicionar Cliente"
      />
      <Modal
        inputs={inputs}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onAdd={handleEditClient}
        title="Editar Cliente"
      />
    </div>
  );
}
