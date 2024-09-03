import { motion } from "framer-motion";
import { User, Weight, X } from "lucide-react";
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

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full">
                <motion.div
                    className="relative bg-white p-6 rounded-md w-full max-w-lg h-fit"
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

                    <div className='flex justify-center items-center pb-8 flex-col gap-4 h-full w-full'>
                        {inputs.map((input, index) => (
                            input.type === "checkbox" ? (
                                <div key={index} className="flex items-center justify-start w-full">
                                    <input
                                        type="checkbox"
                                        checked={input.checked ?? false} 
                                        onChange={input.onChange}
                                        className="mr-2 h-5 w-5"
                                        name={input.name} // Adicione o name
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
                                    name={input.name} // Adicione o name
                                />
                            )
                        ))}

                        <Button
                            text='adicionar'
                            onClick={onAdd}  
                        />
                    </div>
                </motion.div>
            </div>
        </>
    );
}
