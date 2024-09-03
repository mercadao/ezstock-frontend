"use client";

import { useState } from "react";
import Button from "@/app/components/atoms/Button/DefaultButton";
import Input from "@/app/components/atoms/Input";
import Modal from "@/app/components/molecules/Modal";
import { Produto } from "@/app/types"; 
import { editProduto } from "@/app/services/putProduct";
import { toast } from 'react-toastify';

export default function EditProductModal({ product, isOpen, onClose }: { product: Produto | null, isOpen: boolean, onClose: () => void }) {
    const [nomeProduto, setNomeProduto] = useState(product?.nomeProduto || "");
    const [valorKG, setValorKG] = useState(product?.valorKG || 0);
    const [indAtivo, setIndAtivo] = useState(product?.indAtivo || true);

    const handleEditProduct = async () => {
        if (nomeProduto && valorKG !== null && product) {
            const updatedProduct: Produto = {
                idProduto: product.idProduto,
                nomeProduto,
                indAtivo,
                valorKG,
            };

            try {
                await editProduto(updatedProduct);
                toast.success('Produto editado com sucesso!');
                onClose();
            } catch (error) {
                toast.error('Erro ao editar produto. Tente novamente.');
            }
        } else {
            toast.error('Por favor, preencha todos os campos.');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-semibold mb-4">Editar Produto</h2>
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
                    value={valorKG.toString()}
                />
            </div>
            <div className="mt-4 flex justify-end">
                <Button
                    text="Salvar"
                    onClick={handleEditProduct}
                    customColorText="text-offwhite"
                    customColorBg="bg-primary-900"
                />
            </div>
        </Modal>
    );
}
