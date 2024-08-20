import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TableRow from "@/app/components/molecules/TableRow";
import { TableCellProps } from "@/app/components/atoms/TableCell";
import Modal from "@/app/components/molecules/Modal";
import EditProductModal from "@/app/components/molecules/Modal/EditModal";
import { toast } from "react-toastify";

interface TableProps<T> {
    fetchData: () => Promise<T[]>;
    deleteItem: (id: number) => Promise<void>;
    headers: TableCellProps[];
    mapRowData: (item: T) => TableCellProps[];
    renderDetails: (item: T) => JSX.Element;
    renderEditModal: (item: T | null, isOpen: boolean, onClose: () => void) => JSX.Element;
}

export default function Table<T extends { id: number }>({
    fetchData,
    deleteItem,
    headers,
    mapRowData,
    renderDetails,
    renderEditModal,
}: TableProps<T>) {
    const [items, setItems] = useState<T[]>([]);
    const [selectedItem, setSelectedItem] = useState<T | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        async function fetchItems() {
            try {
                const data = await fetchData();
                setItems(data);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        }
        fetchItems();
    }, [fetchData]);

    const handleOpenModal = (item: T) => {
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    const handleOpenEditModal = (item: T) => {
        setSelectedItem(item);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setSelectedItem(null);
        setIsEditModalOpen(false);
    };

    const handleDeleteItem = (item: T) => {
        toast(
            <div className="flex flex-col justify-center items-center py-2 gap-4">
                <p className="text-lg font-semibold text-gray-800 text-center">Tem certeza que deseja excluir este item?</p>
                <div className="flex w-full items-center justify-center gap-4">
                    <button
                        onClick={async () => {
                            try {
                                await deleteItem(item.id);
                                setItems((prevItems) =>
                                    prevItems.filter((p) => p.id !== item.id)
                                );
                                toast.dismiss();
                                toast.success("Item excluído com sucesso!");
                            } catch (error) {
                                toast.error("Erro ao excluir item. Tente novamente.");
                            }
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md shadow"
                    >
                        Sim
                    </button>
                    <button
                        onClick={() => toast.dismiss()}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-4 py-2 rounded-md shadow"
                    >
                        Não
                    </button>
                </div>
            </div>,
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
            }
        );
    };

    return (
        <div className="my-4 w-full">
            <div className="w-full border rounded-md overflow-x-auto drop-shadow-lg">
                <TableRow data={headers} isHeader={true} />
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 0.2,
                            delay: index * 0.2,
                        }}
                    >
                        <TableRow data={mapRowData(item)} />
                    </motion.div>
                ))}
            </div>

            <Modal isOpen={!!selectedItem && !isEditModalOpen} onClose={handleCloseModal}>
                {selectedItem && renderDetails(selectedItem)}
            </Modal>

            {renderEditModal(selectedItem, isEditModalOpen, handleCloseEditModal)}
        </div>
    );
}
