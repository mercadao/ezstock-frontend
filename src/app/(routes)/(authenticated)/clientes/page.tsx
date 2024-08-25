"use client";

import { useState, useEffect } from "react";
import { Info, Edit, Trash } from "lucide-react";
import { Item } from "@/app/types/index";
import { getClients } from "@/app/services/getClients";

//components
import Table from "@/app/components/organisms/Table";
import Divider from "@/app/components/atoms/Divider";
import PainelHeader from "@/app/components/molecules/PainelHeader";
import SwitchPageHeader from "@/app/components/atoms/SwitchPageHeader";
import Modal from "@/app/components/molecules/Modal";
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

const mapRowData = (client: Item, onInfoClick: (item: Item) => void): TableCellProps[] => {


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
          <Edit className="cursor-pointer text-gray-500 hover:text-primary-400" size={20} />
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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleInfoClick = (item: Item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const clientes = await getClients();
      setFullItemsList(clientes);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="my-4 w-full p-10">
        <h1 className="text-primary-900 text-2xl font-extrabold">Clientes</h1>
        <div className="pb-3">
          <SwitchPageHeader itemHeader="" items={items} />
        </div>

        <PainelHeader title="Tabela de Clientes" />
        <Divider />
        <Table<Item>
          fetchData={async () => fullItemsList }
          generateHeaders={generateHeaders}
          mapRowData={(item) => mapRowData(item, handleInfoClick)}
        />
        <Modal isOpen={modalOpen} onClose={handleCloseModal} items={selectedItem} />
      </div>
    </>
  );
}
