"use client"

import { useState } from "react";
import { Info, Edit, Trash } from "lucide-react";
import { Item } from "@/app/types/index";

//components
import Table from "@/app/components/organisms/Table";
import Divider from "@/app/components/atoms/Divider";
import PainelHeader from "@/app/components/molecules/PainelHeader";
import SwitchPageHeader from "@/app/components/atoms/SwitchPageHeader";
import Modal from "@/app/components/molecules/Modal";
import { TableCellProps } from "@/app/components/atoms/TableCell";
import { getMateriaPrima } from "@/app/services/getMateriaPrima";

const items = [
    { name: "Item 1", route: "/item1" },
    { name: "Item 2", route: "/item2" },
    { name: "Item 3", route: "/item3" },
];

const generateHeaders = (products: Item[]): TableCellProps[] => {
    if (products.length === 0) return [];

    const keys = Object.keys(products[0]);
    const headers: TableCellProps[] = keys.map(key => ({
        text: key === 'idProduto' ? 'ID' : 
              key === 'nomeProduto' ? 'Nome' : 
              key === 'valorKG' ? 'Valor por KG' : 
              key === 'dataCriacao' ? 'Data de Criação' : 
              key,
        type: 'header'
    }));
    headers.push({ text: "Ações", type: "header" });
    return headers;
};

const mapRowData = (product: Item, onInfoClick: (item: Item) => void): TableCellProps[] => {
    const keys = Object.keys(product);
    const rowData: TableCellProps[] = keys.map(key => {
        if (key === 'valorKG') {
            return {
                text: product[key] ? `${(product[key] as number).toFixed(2)} R$` : 'N/A',
                type: 'body'
            };
        }
        return {
            text: product[key]?.toString() || 'N/A',
            type: 'body'
        };
    });

    rowData.push({
        icon: (
            <div className="flex space-x-2">
                <Info
                    className="cursor-pointer text-gray-500 hover:text-yellow-400"
                    size={20}
                    onClick={() => onInfoClick(product)}
                />
                <Edit
                    className="cursor-pointer text-gray-500 hover:text-primary-400"
                    size={20}
                />
                <Trash
                    className="cursor-pointer text-gray-500 hover:text-red-500"
                    size={20}
                />
            </div>
        ),
        type: "body",
    });

    return rowData;
};

export default function materiaPrima() {
    const [fullItemsList, setFullItemsList] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInfoClick = (item: Item) => {
        setSelectedItem(item);
        setIsModalOpen(true); 
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); 
        setSelectedItem(null);
    };

    return (
        <div className="my-4 w-full p-10">
            <h1 className="text-primary-900 text-2xl font-extrabold">
                Gerencie sua materia prima
            </h1>
            <div className="pb-3">
                <SwitchPageHeader itemHeader="" items={items} />
            </div>

            <PainelHeader title="Materia Prima" />

            <Divider />

            <Table<Item>
                fetchData={async () => {
                    const products = await getMateriaPrima();
                    setFullItemsList(products);
                    return products.slice(0, 3);
                }}
                generateHeaders={generateHeaders}
                mapRowData={(item) => mapRowData(item, handleInfoClick)}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                items={selectedItem}
            />
        </div>
    );
}
