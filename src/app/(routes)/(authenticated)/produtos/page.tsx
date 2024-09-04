"use client";

import { useState } from "react";
import { Info, Edit, Trash, User, Weight } from "lucide-react";
import { Item } from "@/app/types/index";
import { getProdutos } from "@/app/services/getProdutos";
import { addProduto } from "@/app/services/postProducts";
import { editProduto } from "@/app/services/putProduct";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Table from "@/app/components/organisms/Table";
import Divider from "@/app/components/atoms/Divider";
import PainelHeader from "@/app/components/molecules/PainelHeader";
import SwitchPageHeader from "@/app/components/atoms/SwitchPageHeader";
import { TableCellProps } from "@/app/components/atoms/TableCell";
import Modal from "@/app/components/atoms/Modal";

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

const mapRowData = (product: Item, onInfoClick: (item: Item) => void, onEditClick: (item: Item) => void): TableCellProps[] => {
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
                    onClick={() => onEditClick(product)} 
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

export default function ProductsPage() {
    
    const [fullItemsList, setFullItemsList] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);  
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [inputValues, setInputValues] = useState({
        name: "",
        value: "",
    });

    const handleInfoClick = (item: Item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleEditClick = (item: Item) => {
        setSelectedItem(item);
        setInputValues({
            name: item.nomeProduto,
            value: item.valorKG.toString(),
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
        setInputValues(prevValues => ({
            ...prevValues,
            name: e.target.value
        }));
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues(prevValues => ({
            ...prevValues,
            value: e.target.value
        }));
    };

    const handleAddProduct = async () => {
        try {
            const newProduct = {
                nomeProduto: inputValues.name,
                valorKG: parseFloat(inputValues.value) || 0,
            };
            await addProduto(newProduct);
            setIsModalOpen(false);
            setInputValues({ name: "", value: "" });
            const products = await getProdutos();
            setFullItemsList(products);
            toast.success('Produto adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            toast.error('Erro ao adicionar o produto. Por favor, tente novamente.');
        }
    };

    const handleEditProduct = async () => {
        try {
            if (selectedItem) {
                const updatedProduct = {
                    idProduto: selectedItem.idProduto,
                    nomeProduto: inputValues.name,
                    valorKG: parseFloat(inputValues.value) || 0,
                    indAtivo: selectedItem.indAtivo,
                };
                await editProduto(updatedProduct);
                setIsEditModalOpen(false);
                setSelectedItem(null);
                setInputValues({ name: "", value: "" });
                const products = await getProdutos();
                setFullItemsList(products);
                toast.success('Produto editado com sucesso!');
            }
        } catch (error) {
            console.error('Erro ao editar produto:', error);
            toast.error('Erro ao editar o produto. Por favor, tente novamente.');
        }
    };

    const inputs = [
        {
            type: "text",
            placeholder: "Digite o nome do produto...",
            value: inputValues.name,
            onChange: handleNameChange,
            icon: <User />,
            name: "name"
        },
        {
            type: "number",
            placeholder: "Digite o valor do produto...",
            value: inputValues.value,
            onChange: handleValueChange,
            icon: <Weight />,
            name: "value"
        }
    ];

    return (
        <div className="my-4 w-full p-10">
            <h1 className="text-primary-900 text-2xl font-extrabold">
                Gerencie seus produtos
            </h1>
            <div className="pb-3">
                <SwitchPageHeader itemHeader="" items={items} />
            </div>

            <PainelHeader 
                title="Tabela de Produtos" 
                onAddProductClick={() => setIsModalOpen(true)} 
            />

            <Divider />

            <Table<Item>
                fetchData={async () => {
                    const products = await getProdutos();
                    setFullItemsList(products);
                    return products;
                }}
                generateHeaders={generateHeaders}
                mapRowData={(item) => mapRowData(item, handleInfoClick, handleEditClick)} // Passar handleEditClick
            />

            <Modal
                inputs={inputs}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onAdd={handleAddProduct}  
            />

            <Modal
                inputs={inputs}
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                onAdd={handleEditProduct}
            />
        </div>
    );
}
