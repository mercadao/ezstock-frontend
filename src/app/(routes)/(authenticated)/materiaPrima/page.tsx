"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/navigation'; 
import "react-toastify/dist/ReactToastify.css";

// Components
import Divider from "@/app/components/atoms/Divider";
import PainelHeader from "@/app/components/molecules/PainelHeader";
import Table from "@/app/components/organisms/Table";
import DynamicModal from "@/app/components/molecules/DinamicModal";

// Services
import {
  getMateriaPrima,
  addMateriaPrima,
  editMateriaPrima,
  deleteMateriaPrima,
  MateriaPrima,
} from "@/app/services/materiaPrimaService";

export default function MateriaPrimaPage() {
  const [materiasPrimas, setMateriasPrimas] = useState<MateriaPrima[]>([]);
  const [selectedMateriaPrima, setSelectedMateriaPrima] =
    useState<MateriaPrima | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [readMode, setReadMode] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchMateriasPrimas = async () => {
      try {
        const response = await getMateriaPrima();
        setMateriasPrimas(response);
      } catch (error) {
        console.error("Erro ao buscar matérias-primas:", error);
        toast.error("Erro ao buscar matérias-primas.");
      } finally {
        setLoading(false);
      }
    };

    fetchMateriasPrimas();
  }, []);

  const headerData = ["Descrição", "Ações"];

  const tableData = materiasPrimas.map((materiaPrima) => [
    materiaPrima.dscMateriaPrima,
  ]);

  const handleRead = (rowIndex: number) => {
    const materiaPrima = materiasPrimas[rowIndex];
    setSelectedMateriaPrima(materiaPrima);
    setReadMode(true);
    setEditMode(false);
    setModalOpen(true);
  };

  const handleEdit = (rowIndex: number) => {
    const materiaPrima = materiasPrimas[rowIndex];
    setSelectedMateriaPrima(materiaPrima);
    setReadMode(false);
    setEditMode(true);
    setModalOpen(true);
  };

  const confirmDelete = (rowIndex: number) => {
    const id = materiasPrimas[rowIndex].idMateriaPrima;

    toast.warn(
      <>
        <p className="text-[12px]">
          Tem certeza que deseja excluir a matéria-prima:
        </p>
        <p>{materiasPrimas[rowIndex].dscMateriaPrima}?</p>
        <div className="flex w-full justify-between">
          <button
            onClick={() => handleDelete(rowIndex)}
            className="btn-confirm hover:text-green-400"
          >
            Confirmar
          </button>
          <button
            onClick={() => toast.dismiss()}
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
      }
    );
  };

  const handleDelete = async (rowIndex: number) => {
    const id = materiasPrimas[rowIndex].idMateriaPrima;
    try {
      await deleteMateriaPrima(id);
      toast.success(`Matéria-prima deletada`, {
        className: "bg-green-500 text-white p-4 rounded",
        progressClassName: "bg-white",
      });
      router.refresh(); // Recarrega a página após a exclusão bem-sucedida
    } catch (error) {
      toast.error(`Erro ao deletar matéria-prima`, {
        className: "bg-red-500 text-white p-4 rounded",
        progressClassName: "bg-white",
      });
      console.error(`Erro ao deletar matéria-prima`, error);
    }
  };

  const handleSave = async (updatedMateriaPrima: MateriaPrima) => {
    const { idMateriaPrima, ...materiaPrimaSemId } = updatedMateriaPrima;

    try {
      if (isEditMode) {
        await editMateriaPrima(idMateriaPrima!, updatedMateriaPrima);
        toast.success("Matéria-prima editada com sucesso!", {
          className: "bg-blue-500 text-white p-4 rounded",
          progressClassName: "bg-white",
        });
      } else {
        await addMateriaPrima(materiaPrimaSemId);
        toast.success("Nova matéria-prima adicionada!", {
          className: "bg-green-500 text-white p-4 rounded",
          progressClassName: "bg-white",
        });
      }
      setModalOpen(false);
      router.refresh(); // Recarrega a página após a adição ou edição bem-sucedida
    } catch (error) {
      toast.error("Erro ao salvar matéria-prima.", {
        className: "bg-red-500 text-white p-4 rounded",
        progressClassName: "bg-white",
      });
      console.error("Erro ao salvar matéria-prima:", error);
    }
  };

  const handleAddMateriaPrima = () => {
    setSelectedMateriaPrima({
      idMateriaPrima: 0,
      dscMateriaPrima: "",
    });
    setReadMode(false);
    setEditMode(false);
    setModalOpen(true);
  };

  if (loading) {
    return <p>Carregando matérias-primas...</p>;
  }

  return (
    <div className="my-4 w-full p-10">
      <h1 className="text-primary-900 text-2xl font-extrabold">
        Matérias-Primas
      </h1>

      <PainelHeader
        title="Tabela de Matérias-Primas"
        onAddClientClick={handleAddMateriaPrima}
      />

      <Divider />

      <Table
        headerData={headerData}
        data={tableData}
        onClickRead={handleRead}
        onClickEdit={handleEdit}
        onClickDelete={confirmDelete}
      />

      {selectedMateriaPrima && (
        <DynamicModal
          data={selectedMateriaPrima}
          isEditMode={isEditMode}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          isReadOnly={readMode}
          onSave={handleSave}
        />
      )}

      <ToastContainer position="top-center" />
    </div>
  );
}
