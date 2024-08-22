import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TableRow from "@/app/components/molecules/TableRow";
import { TableCellProps } from "@/app/components/atoms/TableCell";

interface TableProps<T> {
    fetchData: () => Promise<T[]>;
    generateHeaders: (items: T[]) => TableCellProps[];
    mapRowData: (item: T, onInfoClick: (item: T) => void) => TableCellProps[];
    onInfoClick: (item: T) => void;
}

export default function Table<T>({
    fetchData,
    generateHeaders,
    mapRowData,
    onInfoClick,
}: TableProps<T>) {
    const [items, setItems] = useState<T[]>([]);
    const [headers, setHeaders] = useState<TableCellProps[]>([]);

    useEffect(() => {
        async function fetchItems() {
            try {
                const data = await fetchData();
                setItems(data);
                setHeaders(generateHeaders(data));
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            }
        }
        fetchItems();
    }, [fetchData, generateHeaders]);

    return (
        <div className="my-4 w-full">
            <div className="w-full border rounded-md overflow-x-auto drop-shadow-lg">
                <TableRow data={headers} isHeader={true} />
                {items.map((item, index) => (
                    <motion.div
                        key={(item as any).id}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 0.2,
                            delay: index * 0.2,
                        }}
                    >
                        <TableRow
                            data={mapRowData(item, onInfoClick)}
                            item={item} // Passa o item para a linha
                            onInfoClick={onInfoClick} // Passa a função de clique
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
