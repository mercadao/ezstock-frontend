import { X } from "lucide-react";
import { useEffect } from "react";
import { motion } from "framer-motion";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (isOpen && target.id === "modal-overlay") {
        onClose();
      }
    }
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 300, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-white p-6 rounded-md w-full max-w-lg relative text-black max-h-[800px] overflow-auto"
      >
        <button onClick={onClose} className="absolute top-3 right-3">
          <X className="text-black hover:text-red-600" />
        </button>
        {children}
      </motion.div>
    </div>
  );
}
