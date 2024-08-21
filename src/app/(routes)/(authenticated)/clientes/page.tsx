import React from "react";

export default function Clientes() {
  return (
    <>
      <div>Clientes</div>
    </>
  );
}


// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import TableRow from "@/app/components/molecules/TableRow";
// import { TableCellProps } from "@/app/components/atoms/TableCell";
// import { Info, Edit, Trash } from "lucide-react";
// import { getClientes } from "@/app/services/getClientes"; // Atualize o caminho se necessário
// import { Cliente } from "@/app/types/index"; // Atualize se o tipo Cliente estiver em um arquivo diferente
// import Modal from "@/app/components/molecules/Modal";
// import EditClienteModal from "@/app/components/molecules/Modal/EditClienteModal"; // Atualize o caminho se necessário
// import PainelHeader from "@/app/components/molecules/PainelHeader";
// import Divider from "@/app/components/atoms/Divider";
// import { deleteCliente } from "@/app/services/deleteCliente"; // Atualize o caminho se necessário
// import { toast } from "react-toastify";

// export default function ClientesTable() {
//     const [clientes, setClientes] = useState<Cliente[]>([]);
//     const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//     useEffect(() => {
//         async function fetchClientes() {
//             try {
//                 const clientesData = await getClientes();
//                 setClientes(clientesData);
//             } catch (error) {
//                 console.error("Erro ao carregar clientes:", error);
//             }
//         }
//         fetchClientes();
//     }, []);

//     const handleOpenModal = (cliente: Cliente) => {
//         setSelectedCliente(cliente);
//     };

//     const handleCloseModal = () => {
//         setSelectedCliente(null);
//     };

//     const handleOpenEditModal = (cliente: Cliente) => {
//         setSelectedCliente(cliente);
//         setIsEditModalOpen(true);
//     };

//     const handleCloseEditModal = () => {
//         setSelectedCliente(null);
//         setIsEditModalOpen(false);
//     };

//     const handleDeleteCliente = (cliente: Cliente) => {
//         toast(
//             <div className="flex flex-col justify-center items-center py-2 gap-4">
//                 <p className="text-lg font-semibold text-gray-800 text-center">Tem certeza que deseja excluir este cliente?</p>
//                 <div className="flex w-full items-center justify-center gap-4">
//                     <button
//                         onClick={async () => {
//                             try {
//                                 await deleteCliente(cliente.idCliente);
//                                 setClientes((prevClientes) =>
//                                     prevClientes.filter((c) => c.idCliente !== cliente.idCliente)
//                                 );
//                                 toast.dismiss(); // Fecha o toast
//                                 toast.success("Cliente excluído com sucesso!");
//                             } catch (error) {
//                                 toast.error("Erro ao excluir cliente. Tente novamente.");
//                             }
//                         }}
//                         className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md shadow"
//                     >
//                         Sim
//                     </button>
//                     <button
//                         onClick={() => toast.dismiss()}
//                         className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-4 py-2 rounded-md shadow"
//                     >
//                         Não
//                     </button>
//                 </div>
//             </div>,
//             {
//                 position: "top-center",
//                 autoClose: false,
//                 closeOnClick: false,
//                 draggable: false,
//             }
//         );        
//     };

//     const headerData: TableCellProps[] = [
//         { text: "ID", type: "header" },
//         { text: "Nome", type: "header" },
//         { text: "Email", type: "header" },
//         { text: "Telefone", type: "header" },
//         { text: "Ações", type: "header" },
//     ];

//     const rowsData: TableCellProps[][] = clientes.map((cliente) => [
//         { text: cliente.idCliente.toString(), type: "body" },
//         { text: cliente.nomeCliente, type: "body" },
//         { text: cliente.emailCliente, type: "body" },
//         { text: cliente.telefoneCliente, type: "body" },
//         {
//             icon: (
//                 <div className="flex space-x-2">
//                     <Info
//                         className="cursor-pointer text-gray-500 hover:text-yellow-400"
//                         size={20}
//                         onClick={() => handleOpenModal(cliente)}
//                     />
//                     <Edit
//                         className="cursor-pointer text-gray-500 hover:text-primary-400"
//                         size={20}
//                         onClick={() => handleOpenEditModal(cliente)}
//                     />
//                     <Trash
//                         className="cursor-pointer text-gray-500 hover:text-red-500"
//                         size={20}
//                         onClick={() => handleDeleteCliente(cliente)}
//                     />
//                 </div>
//             ),
//             type: "body",
//         },
//     ]);

//     return (
//         <div className="my-4 w-full">
//             <PainelHeader title="Clientes" />
//             <Divider />
//             <div className="w-full border rounded-md overflow-x-auto drop-shadow-lg">
//                 <TableRow data={headerData} isHeader={true} />
//                 {rowsData.map((row, index) => (
//                     <motion.div
//                         key={clientes[index].idCliente}
//                         initial={{ y: -20, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         transition={{
//                             duration: 0.2,
//                             delay: index * 0.2,
//                         }}
//                     >
//                         <TableRow data={row} />
//                     </motion.div>
//                 ))}
//             </div>

//             <Modal isOpen={!!selectedCliente && !isEditModalOpen} onClose={handleCloseModal}>
//                 {selectedCliente && (
//                     <>
//                         <h2 className="text-xl font-semibold mb-4 text-black">Detalhes do Cliente</h2>
//                         <p className="text-black">
//                             <strong>ID:</strong> {selectedCliente.idCliente}
//                         </p>
//                         <p className="text-black">
//                             <strong>Nome:</strong> {selectedCliente.nomeCliente}
//                         </p>
//                         <p className="text-black">
//                             <strong>Email:</strong> {selectedCliente.emailCliente}
//                         </p>
//                         <p className="text-black">
//                             <strong>Telefone:</strong> {selectedCliente.telefoneCliente}
//                         </p>
//                     </>
//                 )}
//             </Modal>

//             <EditClienteModal
//                 cliente={selectedCliente}
//                 isOpen={isEditModalOpen}
//                 onClose={handleCloseEditModal}
//             />
//         </div>
//     );
// }
