"use client";

import Button from "@/app/components/atoms/Button/DefaultButton";
import SmallButton from "@/app/components/atoms/Button/SmallButton";
import Input from "@/app/components/atoms/Input";
import FilterIcon from "../../../../../public/assets/icons/FilterIcon";
import SwapIcon from "../../../../../public/assets/icons/SwapIcon";
import { useProductStore } from "@/app/hooks/productHook";

// Define a interface para as propriedades do PainelHeader
interface PainelHeaderProps {
    title: string;
    onAddProductClick: () => void;
}

export default function PainelHeader({ title, onAddProductClick }: PainelHeaderProps) {
    const setSearchQuery = useProductStore((state) => state.setSearchQuery);

    return (
        <div className="w-full flex justify-between items-center mt-8">
            <h1 className="text-2xl font-bold text-primary-900">{title}</h1>

            <div className="flex gap-4">
                <Button
                    text="+ Adicionar produto"
                    onClick={onAddProductClick} // Chama a função ao clicar
                    customColorText="text-offwhite"
                    customColorBg="bg-primary-900"
                />

                <div className="w-[200px]">
                    <Input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Pesquisar produtos"
                        type="text"
                        value=""
                    />
                </div>

                <div className="text-primary-900 hover:text-white">
                    <SmallButton icon={<FilterIcon />} />
                </div>

                <div className="text-primary-900 hover:text-white">
                    <SmallButton icon={<SwapIcon />} />
                </div>
            </div>

        </div>
    );
}
