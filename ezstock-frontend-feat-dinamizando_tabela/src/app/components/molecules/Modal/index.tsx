import React from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    items: any; 
}

const renderValue = (value: any) => {
    if (Array.isArray(value)) {
        return (
            <ul className="list-disc pl-5">
                {value.map((v, i) => (
                    <li key={i} className="text-black">{renderValue(v)}</li>
                ))}
            </ul>
        );
    } else if (typeof value === 'object' && value !== null) {
        return (
            <div className="space-y-2">
                {Object.keys(value).map((key) => (
                    <div key={key} className="p-2 flex rounded-md">
                        <p className="font-bold text-black">{key}:</p>
                        <div className="pl-4">
                            {renderValue(value[key])}
                        </div>
                    </div>
                ))}
            </div>
        );
    } else {
        return <p className="text-black">{value?.toString() || 'N/A'}</p>;
    }
};

export default function Modal({ isOpen, onClose, items }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div
                className="relative bg-white p-6 rounded-md w-full max-w-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <button
                    className="absolute top-2 right-2 text-gray-700 hover:text-red-600"
                    onClick={onClose}
                    aria-label="Fechar"
                >
                    X
                </button>
                <div className="space-y-4">
                    {Array.isArray(items) ? (
                        items.map((item, index) => (
                            <div key={index} className="flex p-4">
                                {renderValue(item)}
                            </div>
                        ))
                    ) : (
                        <div className="flex p-4">
                            {renderValue(items)}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
