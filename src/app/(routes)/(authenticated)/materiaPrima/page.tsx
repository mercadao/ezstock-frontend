"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast"; // Alterado para react-hot-toast

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

import { useSearchStore } from "@/app/hooks/searchHook";

export default function MateriaPrimaPage() {
  const [materiasPrimas, setMateriasPrimas] = useState<MateriaPrima[]>([]);
  const [selectedMateriaPrima, setSelectedMateriaPrima] =
    useState<MateriaPrima | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [readMode, setReadMode] = useState(false);

  const router = useRouter();

  const { materiaPrimaSearch, setMateriaPrimaSearch } = useSearchStore();

  useEffect(() => {
    const fetchMateriasPrimas = async () => {
      try {
        const response = await getMateriaPrima();
        setMateriasPrimas(response);
      } catch (error) {
        console.error("Erro ao buscar matérias-primas:", error);
        toast.error("Erro ao buscar matérias-primas."); // Alterado
      } finally {
        setLoading(false);
      }
    };

    fetchMateriasPrimas();
  }, []);

  const filteredMateriaPrimaData = materiasPrimas.filter((materiaPrima) =>
    materiaPrima.dscMateriaPrima
      .toLowerCase()
      .includes(materiaPrimaSearch.toLowerCase())
  );

  const headerData = ["Descrição", "Ações"];

  const tableData = filteredMateriaPrimaData.map((materiaPrima) => [
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
    const materiaPrimaName = materiasPrimas[rowIndex].dscMateriaPrima;
  
    toast(
      (t) => (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <p className="text-[12px] font-semibold text-[#856404]">
              Tem certeza que deseja excluir a matéria-prima:
            </p>
          </div>
          <p className="text-[12px] text-[#856404]">{materiaPrimaName}?</p>
          <div className="flex w-full justify-between">
            <button
              onClick={() => {
                handleDelete(rowIndex);
                toast.dismiss(t.id); // Fechar o toast ao confirmar
              }}
              className="btn-confirm hover:text-green-400 text-[#856404]"
            >
              Confirmar
            </button>
            <button
              onClick={() => toast.dismiss(t.id)} // Fechar o toast ao cancelar
              className="btn-cancel hover:text-red-400 text-[#856404]"
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        position: 'top-center',
        duration: Infinity, // Não fechar automaticamente
        icon: '⚠️',
        style: {
          background: '#fff3cd', // Fundo amarelo
          color: '#856404', // Texto escuro
          border: '1px solid #ffeeba', // Borda suave
          padding: '16px',
          borderRadius: '8px',
        },
      }
    );
  };

  const handleDelete = async (rowIndex: number) => {
    const id = materiasPrimas[rowIndex].idMateriaPrima;
    try {
      await deleteMateriaPrima(id);
      toast.success("Matéria-prima deletada", {
        className: "bg-green-500 text-white p-4 rounded",
      });
      router.refresh(); // Recarrega a página após a exclusão bem-sucedida
    } catch (error) {
      toast.error("Erro ao deletar matéria-prima", {
        // Alterado para react-hot-toast
        className: "bg-red-500 text-white p-4 rounded",
      });
      console.error("Erro ao deletar matéria-prima", error);
    }
  };

  const handleSave = async (updatedMateriaPrima: MateriaPrima) => {
    const { idMateriaPrima, ...materiaPrimaSemId } = updatedMateriaPrima;

    try {
      if (isEditMode) {
        await editMateriaPrima(idMateriaPrima!, updatedMateriaPrima);
        toast.success("Matéria-prima editada com sucesso!", {
          // Alterado para react-hot-toast
          className: "bg-blue-500 text-white p-4 rounded",
        });
      } else {
        await addMateriaPrima(materiaPrimaSemId);
        toast.success("Nova matéria-prima adicionada!", {
          // Alterado para react-hot-toast
          className: "bg-green-500 text-white p-4 rounded",
        });
      }
      setModalOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Erro ao salvar matéria-prima.", {
        // Alterado para react-hot-toast
        className: "bg-red-500 text-white p-4 rounded",
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
        buttonText="+ Matéria-Prima"
        itemSearch={materiaPrimaSearch}
        setItemSearch={setMateriaPrimaSearch}
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
          modalName="Matéria Prima"
          data={selectedMateriaPrima}
          isEditMode={isEditMode}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          isReadOnly={readMode}
          onSave={handleSave}
          labelNames={["Nome da matéria prima"]}
        />
      )}

      <Toaster position="top-center" />
    </div>
  );
}
