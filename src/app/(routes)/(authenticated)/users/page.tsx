"use client";

import { useEffect, useState } from "react";
import Divider from "@/app/components/atoms/Divider";
import PainelHeader from "@/app/components/molecules/PainelHeader";
import Table from "@/app/components/organisms/Table";
import DynamicModal from "@/app/components/molecules/DinamicModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment';

import {
  getUsuarios,
  deleteUsuario,
  Usuario,
  editUsuario,
  postUsuario,
} from "@/app/services/userService";

export default function Usuarios() {
  const [userData, setUserData] = useState<Usuario[]>([]);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [readMode, setReadMode] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [isCreate, setIscreate] = useState(false);

  const headerData = [
    "ID",
    "Nome",
    "Email",
    "Data de Nascimento",
    "Ativo",
    "Ações",
  ];

  const fetchData = async () => {
    try {
      const users = await getUsuarios();
      setUserData(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRead = (rowIndex: number) => {

    const { indAtivo, ...filteredSetSelectedUser } = userData[rowIndex];
  
    setSelectedUser(filteredSetSelectedUser);
    setReadMode(true);
    setEditMode(false);
    setModalOpen(true);
  };
  

  const handleEdit = (rowIndex: number) => {

    const { indAtivo, ...filteredSetSelectedUser } = userData[rowIndex];

    setSelectedUser(filteredSetSelectedUser);
    setReadMode(false);
    setEditMode(true);
    setModalOpen(true);
  };

  const confirmDelete = (rowIndex: number) => {
    const toastId = `delete_${userData[rowIndex].idUsuario}`; 

    if (!toast.isActive(toastId)) {
      toast.warn(
        <>
          <p className="text-[12px]">Tem certeza que deseja excluir o usuário:</p>
          <p>{userData[rowIndex].nomeUsuario}?</p>
          <div className="flex w-full justify-between">
            <button
              onClick={() => handleDelete(rowIndex)}
              className="btn-confirm hover:text-green-400"
            >
              Confirmar
            </button>
            <button
              onClick={() => toast.dismiss(toastId)}
              className="btn-cancel hover:text-red-400"
            >
              Cancelar
            </button>
          </div>
        </>,
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
          toastId,
        }
      );
    }
  };

  const handleDelete = async (rowIndex: number) => {
    const id = userData[rowIndex].idUsuario;
    const toastId = `delete_${id}`;

    try {
      await deleteUsuario(id);
      await fetchData();

      if (!toast.isActive(toastId)) {
        toast.success(`Usuário deletado: ${id}`, {
          className: "bg-green-500 text-white p-4 rounded",
          progressClassName: "bg-white",
          toastId,
        });
      }
    } catch (error) {
      if (!toast.isActive(toastId)) {
        toast.error(`Erro ao deletar usuário: ${id}`, {
          className: "bg-red-500 text-white p-4 rounded",
          progressClassName: "bg-white",
          toastId,
        });
      }
      console.error(`Erro ao deletar usuário: ${id}`, error);
    }
  };

  const handleSave = async (updatedData: Usuario) => {

    const formattedDate = moment(updatedData.dataNascimentoUsuario, "DD/MM/YYYY").toISOString();
  
    const { idUsuario, ...userWithoutId } = {
      ...updatedData,
      dataNascimentoUsuario: formattedDate, 
    };
    
    const toastId = isEditMode ? `edit_${idUsuario}` : "create_new";
  
    console.log("update data: ", { ...updatedData, dataNascimentoUsuario: formattedDate });
  
    try {
      if (isEditMode) {
        await editUsuario(userWithoutId, idUsuario);
  
        if (!toast.isActive(toastId)) {
          toast.success("Usuário editado com sucesso!", {
            className: "bg-blue-500 text-white p-4 rounded",
            progressClassName: "bg-white",
            toastId,
          });
        }
      } else {
        await postUsuario(userWithoutId);
  
        if (!toast.isActive(toastId)) {
          toast.success("Novo usuário adicionado!", {
            className: "bg-green-500 text-white p-4 rounded",
            progressClassName: "bg-white",
            toastId,
          });
        }
      }
      setModalOpen(false);
      await fetchData();
    } catch (error) {
      if (!toast.isActive(toastId)) {
        toast.error("Erro ao salvar usuário.", {
          className: "bg-red-500 text-white p-4 rounded",
          progressClassName: "bg-white",
          toastId,
        });
      }
      console.error("Erro ao salvar usuário:", error);
    }
  };

  const handleAddUser = () => {
    setSelectedUser({
      idUsuario: 0,
      nomeUsuario: "",
      emailUsuario: "",
      senhaUsuario: "",
      dataNascimentoUsuario: "",
      indAtivo: false,
      imgPerfilUsuario: null,
    });
    setReadMode(false);
    setEditMode(false);
    setIscreate(true);
    setModalOpen(true);
  };

  return (
    <div className="my-4 w-full p-10">
      <h1 className="text-primary-900 text-2xl font-extrabold">Usuários</h1>

      <PainelHeader 
        title="Tabela de Usuários" 
        onAddClientClick={handleAddUser}
        buttonText="+ Adicionar usuário"
      />

      <Divider />

      <Table
        headerData={headerData}
        data={userData.map(user => [
          user.idUsuario,
          user.nomeUsuario,
          user.emailUsuario,
          new Date(user.dataNascimentoUsuario).toLocaleDateString(),
          user.indAtivo ? "Sim" : "Não",
        ])}
        onClickRead={handleRead}
        onClickEdit={handleEdit}
        onClickDelete={confirmDelete}
      />

      {selectedUser && (
        <DynamicModal
          data={selectedUser}
          isEditMode={isEditMode}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          isReadOnly={readMode}
          onSave={handleSave}
        />
      )}

      <ToastContainer containerId="userContainer" position="top-center" />
    </div>
  );
}
