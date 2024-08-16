"use client";

import { useState } from "react";
import Button from "@/app/components/atoms/Button/DefaultButton";
import SmallButton from "@/app/components/atoms/Button/SmallButton";
import Input from "@/app/components/atoms/Input";
import FilterIcon from "../../../../../public/assets/icons/FilterIcon";
import SwapIcon from "../../../../../public/assets/icons/SwapIcon";
import Modal from "@/app/components/molecules/Modal";
import { useProductStore } from "@/app/hooks/productHook";
import { Produto } from "@/app/types"; 
import { addProduto } from "@/app/services/postProducts";
import { toast } from 'react-toastify';

export default function PainelHeader() {

    const setSearchQuery = useProductStore((state) => state.setSearchQuery);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nomeProduto, setNomeProduto] = useState("");
    const [valorKG, setValorKG] = useState<number | null>(null);
    const [indAtivo, setIndAtivo] = useState(true);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddProduct = async () => {
        if (nomeProduto && valorKG !== null) {
            const newProduct: Produto = {
                idProduto: Math.floor(Math.random() * 1000), 
                nomeProduto,
                indAtivo,
                valorKG,
            };

            try {
                await addProduto(newProduct);
                toast.success('Produto adicionado com sucesso!');
                setIsModalOpen(false); 
            } catch (error) {
                toast.error('Erro ao adicionar produto. Tente novamente.');
                console.error('Erro ao adicionar produto:', error);
            }
        } else {
            toast.error('Por favor, preencha todos os campos.');
        }
    };

    return (
        <div className="w-full flex justify-between mt-8">
            <div>
                <Button
                    text="+ Adicionar produto"
                    onClick={() => setIsModalOpen(true)}
                    customColorText="text-offwhite"
                    customColorBg="bg-primary-900"
                />
            </div>

            <div className="flex gap-4">
                <div className="w-[200px]">
                <div className="w-[200px]">
                    <Input
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Pesquisar produtos"
                            type="text"
                            value=""
                        />
                    </div>
                </div>

                <div className="text-primary-900 hover:text-white">
                    <SmallButton icon={<FilterIcon />} />
                </div>

                <div className="text-primary-900 hover:text-white">
                    <SmallButton icon={<SwapIcon />} />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-xl font-semibold mb-4">Adicionar Produto</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
                    <Input
                        onChange={(e) => setNomeProduto(e.target.value)}
                        placeholder="Nome do Produto"
                        type="text"
                        value={nomeProduto}
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Valor por KG</label>
                    <Input
                        onChange={(e) => setValorKG(parseFloat(e.target.value))}
                        placeholder="Valor por KG"
                        type="number"
                        value={valorKG?.toString() || ""}
                    />
                </div>
                <div className="mt-4 flex justify-end">
                    <Button
                        text="Adicionar"
                        onClick={handleAddProduct}
                        customColorText="text-offwhite"
                        customColorBg="bg-primary-900"
                    />
                </div>
            </Modal>
        </div>
    );
}
