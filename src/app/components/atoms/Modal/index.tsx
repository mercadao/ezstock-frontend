import { motion } from "framer-motion";
import { X } from "lucide-react";
import Input from "../Input";
import Button from "../Button/DefaultButton";

interface InputConfig {
    type: string;
    placeholder: string;
    value?: string;
    checked?: boolean; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: React.ReactNode;
    name: string;
}

interface ModalProps {
    inputs: InputConfig[];
    isOpen: boolean;
    onClose: () => void;
    onAdd: () => void; 
}

export default function Modal({ inputs, isOpen, onClose, onAdd }: ModalProps) {
    
    if (!isOpen) return null;

    // Função para dividir os inputs em duas colunas
    const splitInputsIntoColumns = (inputs: InputConfig[]) => {
        const middleIndex = Math.ceil(inputs.length / 2);
        return [
            inputs.slice(0, middleIndex), // Primeira coluna
            inputs.slice(middleIndex)     // Segunda coluna
        ];
    };

    // Dividir os inputs em duas colunas
    const [leftColumn, rightColumn] = splitInputsIntoColumns(inputs);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full">
            <motion.div
                className="relative bg-white p-6 rounded-md w-full max-w-4xl h-fit"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div
                    className='w-full text-black flex justify-end hover:text-red-400 cursor-pointer'
                    onClick={onClose}
                >
                    <X size={32} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-4">
                        {leftColumn.map((input, index) => (
                            input.type === "checkbox" ? (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={input.checked ?? false} 
                                        onChange={input.onChange}
                                        className="mr-2 h-5 w-5"
                                        name={input.name}
                                    />
                                    {input.placeholder}
                                </div>
                            ) : (
                                <Input
                                    key={index}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    value={input.value ?? ""}
                                    onChange={input.onChange}
                                    icon={input.icon}
                                    name={input.name}
                                />
                            )
                        ))}
                    </div>
                    <div className="flex flex-col gap-4">
                        {rightColumn.map((input, index) => (
                            input.type === "checkbox" ? (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={input.checked ?? false} 
                                        onChange={input.onChange}
                                        className="mr-2 h-5 w-5"
                                        name={input.name}
                                    />
                                    {input.placeholder}
                                </div>
                            ) : (
                                <Input
                                    key={index}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    value={input.value ?? ""}
                                    onChange={input.onChange}
                                    icon={input.icon}
                                    name={input.name}
                                />
                            )
                        ))}
                    </div>
                </div>

                <Button
                    text='Adicionar'
                    onClick={onAdd}  
                />
            </motion.div>
        </div>
    );
}
