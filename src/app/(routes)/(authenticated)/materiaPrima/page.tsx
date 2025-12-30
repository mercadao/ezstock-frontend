"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { 
  MdInventory2, 
  MdAdd, 
  MdRemove, 
  MdHistory, 
  MdRefresh,
  MdDashboard,
  MdEdit,
  MdLocalShipping,
  MdTrendingUp,
  MdWarning,
  MdCheckCircle,
  MdError
} from "react-icons/md";
import { FaBoxOpen, FaWeightHanging } from "react-icons/fa";
import { BiSolidPackage } from "react-icons/bi";

// Components
import Divider from "@/app/components/atoms/Divider";
import PainelHeader from "@/app/components/molecules/PainelHeader";
import Table from "@/app/components/organisms/Table";
import DynamicModal from "@/app/components/molecules/DinamicModal";
import ModalEstoqueEntrada from "@/app/components/molecules/ModalEstoqueEntrada";
import ModalEstoqueSaida from "@/app/components/molecules/ModalEstoqueSaida";
import ModalHistorico from "@/app/components/molecules/ModalHistoricoTransacoes";

// Services
import {
  getMateriaPrima,
  addMateriaPrima,
  editMateriaPrima,
  deleteMateriaPrima,
  MateriaPrima,
} from "@/app/services/materiaPrimaService";

import {
  listarEstoque,
  formatarQuantidade,
  formatarValor,
  EstoqueMateriaPrima,
} from "@/app/services/rawMaterialStockService";

import { useSearchStore } from "@/app/hooks/searchHook";
import { usePaginatedData, useDataRefresh } from "@/app/hooks/paginationHook";

export default function MateriaPrimaPage() {
  const [materiasPrimas, setMateriasPrimas] = useState<MateriaPrima[]>([]);
  const [estoque, setEstoque] = useState<EstoqueMateriaPrima[]>([]);
  const [selectedMateriaPrima, setSelectedMateriaPrima] =
    useState<MateriaPrima | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [readMode, setReadMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "crud">("dashboard");
  const [isModalEntradaOpen, setModalEntradaOpen] = useState(false);
  const [isModalSaidaOpen, setModalSaidaOpen] = useState(false);
  const [isModalHistoricoOpen, setModalHistoricoOpen] = useState(false);
  const [selectedEstoque, setSelectedEstoque] = useState<EstoqueMateriaPrima | undefined>();

  const router = useRouter();

  const { materiaPrimaSearch, setMateriaPrimaSearch } = useSearchStore();
  const { refresh, isRefreshing } = useDataRefresh();


  const fetchMateriasPrimas = async () => {
    try {
      const response = await getMateriaPrima();
      setMateriasPrimas(response);
    } catch (error) {
      console.error("Erro ao buscar matérias-primas:", error);
      toast.error("Erro ao buscar matérias-primas.");
    }
  };

  const fetchEstoque = async () => {
    try {
      const response = await listarEstoque();
      setEstoque(response);
    } catch (error) {
      console.error("Erro ao buscar estoque:", error);
      toast.error("Erro ao buscar estoque.");
    }
  };

  const handleRefreshData = async () => {
    setLoading(true);
    await Promise.all([fetchMateriasPrimas(), fetchEstoque()]);
    setLoading(false);
  };

  // Setup pagination
  const {
    paginatedData: paginatedMateriasPrimas,
    currentPage,
    totalPages,
    totalItems,
    goToPage,
    handleDataChange
  } = usePaginatedData({
    data: materiasPrimas,
    itemsPerPage: 20,
    searchTerm: materiaPrimaSearch,
    searchFields: ['dscMateriaPrima' as keyof MateriaPrima]
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await handleRefreshData();
      setLoading(false);
    };
    loadData();
  }, []);

  const handleAddMateriaPrima = () => {
    setSelectedMateriaPrima({
      idMateriaPrima: 0,
      dscMateriaPrima: "",
    });
    setReadMode(false);
    setEditMode(false);
    setModalOpen(true);
  };

  const handleEntrada = (est?: EstoqueMateriaPrima) => {
    setSelectedEstoque(est);
    setModalEntradaOpen(true);
  };

  const handleSaida = (est?: EstoqueMateriaPrima) => {
    setSelectedEstoque(est);
    setModalSaidaOpen(true);
  };

  const handleHistorico = (est?: EstoqueMateriaPrima) => {
    setSelectedEstoque(est);
    setModalHistoricoOpen(true);
  };

  const handleModalClose = () => {
    handleRefreshData();
    setSelectedEstoque(undefined);
  };

  const getIndicadorEstoque = (quantidade: number): { cor: string; label: string } => {
    if (quantidade === 0) {
      return { cor: "bg-red-100 border-red-300", label: "Sem Estoque" };
    }
    if (quantidade < 20) {
      return { cor: "bg-yellow-100 border-yellow-300", label: "Estoque Baixo" };
    }
    return { cor: "bg-green-100 border-green-300", label: "Normal" };
  };

  if (loading) {
    return (
      <div className="justify-center items-center flex h-full">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-black border-t-transparent"></div>
        <p className="text-black ml-4">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="my-4 w-full p-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary-900 rounded-lg shadow-md">
          <MdInventory2 className="text-white text-3xl" />
        </div>
        <div>
          <h1 className="text-primary-900 text-3xl font-bold">
            Gestão de Matéria Prima
          </h1>
          <p className="text-textGray text-sm mt-1">Controle completo do seu estoque</p>
        </div>
      </div>

      {/* Abas */}
      <div className="flex gap-2 mb-6 bg-borderGray p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-5 py-2.5 font-medium transition-all rounded-lg flex items-center gap-2 ${
            activeTab === "dashboard"
              ? "bg-primary-900 text-white shadow-md"
              : "text-offgray hover:text-brownText"
          }`}
        >
          <MdDashboard className="text-lg" />
          Dashboard de Estoque
        </button>
        <button
          onClick={() => setActiveTab("crud")}
          className={`px-5 py-2.5 font-medium transition-all rounded-lg flex items-center gap-2 ${
            activeTab === "crud"
              ? "bg-primary-900 text-white shadow-md"
              : "text-offgray hover:text-brownText"
          }`}
        >
          <MdEdit className="text-lg" />
          Cadastro de Matérias-Primas
        </button>
      </div>

      {/* TAB: DASHBOARD */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* Botões de Ação */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => handleEntrada()}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:opacity-80 transition-all shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
            >
              <MdAdd className="text-xl" />
              Nova Entrada
            </button>
            <button
              onClick={() => handleSaida()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:opacity-80 transition-all shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
            >
              <MdRemove className="text-xl" />
              Registrar Saída
            </button>
            <button
              onClick={() => handleRefreshData()}
              className="px-4 py-2 bg-primary-400 text-white rounded-lg hover:opacity-80 transition-all shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
            >
              <MdRefresh className="text-xl" />
              Atualizar
            </button>
          </div>

          {/* Cards de Estoque */}
          {estoque.length === 0 ? (
            <div className="text-center py-12 bg-offwhite rounded-lg border-2 border-dashed border-borderGray">
              <FaBoxOpen className="text-offgray text-5xl mx-auto mb-3" />
              <p className="text-textGray text-lg font-medium">
                Nenhum estoque cadastrado
              </p>
              <p className="text-offgray text-sm mt-1">
                Adicione matérias-primas primeiro
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {estoque.map((item) => {
                const indicador = getIndicadorEstoque(item.quantidadeKG);
                const isLowStock = item.quantidadeKG < 20;
                const isOutOfStock = item.quantidadeKG === 0;
                
                return (
                  <div
                    key={item.idMateriaPrima}
                    className="bg-white rounded-lg border border-borderGray shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="p-4">
                      {/* Cabeçalho */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-offwhite rounded-lg border border-borderGray">
                            <BiSolidPackage className="text-primary-900 text-xl" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-brownText text-base leading-tight">
                              {item.dscMateriaPrima}
                            </h3>
                            <div className="flex items-center gap-1 mt-1">
                              {isOutOfStock ? (
                                <MdError className="text-red-500 text-xs" />
                              ) : isLowStock ? (
                                <MdWarning className="text-yellow-600 text-xs" />
                              ) : (
                                <MdCheckCircle className="text-green-600 text-xs" />
                              )}
                              <span className={`text-xs font-medium ${
                                isOutOfStock ? 'text-red-600' : 
                                isLowStock ? 'text-yellow-600' : 
                                'text-green-600'
                              }`}>
                                {indicador.label}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Informações de Estoque */}
                      <div className="space-y-2 mb-3 bg-offwhite p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <FaWeightHanging className="text-offgray text-xs" />
                            <span className="text-textGray text-sm">Quantidade</span>
                          </div>
                          <span className="font-bold text-brownText">
                            {formatarQuantidade(item.quantidadeKG)} kg
                          </span>
                        </div>
                        <div className="h-px bg-borderGray" />
                        <div className="flex items-center justify-between">
                          <span className="text-textGray text-sm">Valor/kg</span>
                          <span className="font-semibold text-brownText text-sm">
                            {formatarValor(item.valorKG || 0)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <MdTrendingUp className="text-primary-900 text-xs" />
                            <span className="text-textGray text-sm">Valor Total</span>
                          </div>
                          <span className="font-bold text-primary-900">
                            {formatarValor(item.quantidadeKG * (item.valorKG || 0))}
                          </span>
                        </div>
                      </div>

                      {/* Botões de Ação */}
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => handleEntrada(item)}
                          className="px-2 py-2 text-xs bg-green-600 text-white rounded-lg hover:opacity-80 transition-all shadow-sm hover:shadow-md flex flex-col items-center gap-1 font-medium"
                          title="Registrar entrada"
                        >
                          <MdLocalShipping className="text-base" />
                          <span>Entrada</span>
                        </button>
                        <button
                          onClick={() => handleSaida(item)}
                          className="px-2 py-2 text-xs bg-red-600 text-white rounded-lg hover:opacity-80 transition-all shadow-sm hover:shadow-md flex flex-col items-center gap-1 font-medium"
                          title="Registrar saída"
                        >
                          <MdRemove className="text-base" />
                          <span>Saída</span>
                        </button>
                        <button
                          onClick={() => handleHistorico(item)}
                          className="px-2 py-2 text-xs bg-gray-400 text-white rounded-lg hover:opacity-80 transition-all shadow-sm hover:shadow-md flex flex-col items-center gap-1 font-medium"
                          title="Ver histórico"
                          
                        >
                          <MdHistory className="text-base" />
                          <span>Histórico <br></br> (EM MANUTENÇÃO)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB: CRUD */}
      {activeTab === "crud" && (
        <div className="space-y-4">
          <PainelHeader
            title="Tabela de Matérias-Primas"
            onAddClientClick={handleAddMateriaPrima}
            buttonText="+ Matéria-Prima"
            itemSearch={materiaPrimaSearch}
            setItemSearch={setMateriaPrimaSearch}
          />

          <Divider />

          <Table
            headerData={["Descrição"]}
            data={materiasPrimas.map((mp) => [mp.dscMateriaPrima])}
            onClickRead={(rowIndex) => {
              setSelectedMateriaPrima(materiasPrimas[rowIndex]);
              setReadMode(true);
              setEditMode(false);
              setModalOpen(true);
            }}
            onClickEdit={(rowIndex) => {
              setSelectedMateriaPrima(materiasPrimas[rowIndex]);
              setReadMode(false);
              setEditMode(true);
              setModalOpen(true);
            }}
            onClickDelete={(rowIndex) => {
              const id = materiasPrimas[rowIndex].idMateriaPrima;
              const name = materiasPrimas[rowIndex].dscMateriaPrima;
              toast((t) => (
                <div className="space-y-2">
                  <p className="text-sm font-semibold">
                    Deletar: {name}?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleDelete(id);
                        toast.dismiss(t.id);
                      }}
                      className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ));
            }}
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
        </div>
      )}

      {/* Modals */}
      <ModalEstoqueEntrada
        isOpen={isModalEntradaOpen}
        onClose={() => {
          setModalEntradaOpen(false);
          handleModalClose();
        }}
        onSave={handleModalClose}
        estoque={selectedEstoque}
      />

      <ModalEstoqueSaida
        isOpen={isModalSaidaOpen}
        onClose={() => {
          setModalSaidaOpen(false);
          handleModalClose();
        }}
        onSave={handleModalClose}
        estoque={selectedEstoque}
      />

      <ModalHistorico
        isOpen={isModalHistoricoOpen}
        onClose={() => {
          setModalHistoricoOpen(false);
          setSelectedEstoque(undefined);
        }}
        idMateriaPrimaPreselected={selectedEstoque?.idMateriaPrima}
      />

      <Toaster position="top-center" />
    </div>
  );

  async function handleDelete(id: number) {
    try {
      await deleteMateriaPrima(id);
      toast.success("Matéria-prima deletada!");
      handleRefreshData();
    } catch (error) {
      toast.error("Erro ao deletar matéria-prima");
    }
  }

  async function handleSave(updatedMateriaPrima: MateriaPrima) {
    const { idMateriaPrima, ...rest } = updatedMateriaPrima;
    try {
      if (isEditMode) {
        await editMateriaPrima(idMateriaPrima!, updatedMateriaPrima);
        toast.success("Matéria-prima atualizada!");
      } else {
        await addMateriaPrima(rest);
        toast.success("Matéria-prima adicionada!");
      }
      setModalOpen(false);
      handleRefreshData();
    } catch (error) {
      toast.error("Erro ao salvar matéria-prima");
    }
  }}