"use client";

import Button from "@/app/components/atoms/Button/DefaultButton";
import Input from "@/app/components/atoms/Input";
import { Search, Plus } from "lucide-react";

interface PainelHeaderProps {
    title: string;
    onAddClientClick: () => void;
    buttonText?: string;
    itemSearch: string;            
    setItemSearch: (value: string) => void;  
}

export default function PainelHeader({
    title,
    onAddClientClick,
    buttonText,
    itemSearch,            
    setItemSearch,
}: PainelHeaderProps) {

    return (
        <div className="w-full bg-white shadow-md rounded-lg p-6 mt-8 border border-gray-200">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-primary-900">{title}</h1>

                <div className="flex items-center gap-6">
                    <div className="w-80">
                        <Input
                            onChange={(e) => setItemSearch(e.target.value)}
                            placeholder="Pesquisar..."
                            type="text"
                            value={itemSearch}  
                            icon={<Search />}
                        />
                    </div>
                    <Button
                        text={`${buttonText}`}
                        onClick={onAddClientClick}
                        customColorText="text-white"
                        customColorBg="bg-primary-900 hover:bg-primary-800"
                        customWidth="w-auto px-6 py-2"
                        
                    />
                </div>
            </div>
        </div>
    );
}
