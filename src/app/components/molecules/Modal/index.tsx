import React from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div
                className="relative bg-white p-4 rounded-md w-full max-w-lg"
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
                {children}
            </motion.div>
        </div>
    );
}
