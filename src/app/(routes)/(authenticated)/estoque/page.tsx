"use client";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, Toaster } from "react-hot-toast";
import {
  MdInventory2,
  MdAdd,
  MdRemove,
  MdHistory,
  MdRefresh,
  MdWarning,
  MdCheckCircle,
  MdError,
  MdVisibility,
  MdEvent
} from "react-icons/md";
import { FaBoxOpen, FaWeightHanging } from "react-icons/fa";
import { BiSolidPackage } from "react-icons/bi";

// Components
import DinamicModalStockPost from "@/app/components/molecules/ModalEstoque/post";
import DinamicModalStockReduce from "@/app/components/molecules/ModalEstoque/reduce";
import DinamicModalStockGet from "@/app/components/molecules/ModalEstoque/get";
import ModalHistoricoEstoque from "@/app/components/molecules/ModalHistoricoEstoque";

// Services
import {
  getEstoques,
  postAdicionaEstoque,
  postBaixaEstoque,
  Estoque,
} from "@/app/services/stockService";

// Hook
import { useSearchStore } from "@/app/hooks/searchHook";
import { usePaginatedData, useDataRefresh } from "@/app/hooks/paginationHook";

const VALIDADE_FALLBACK = "—";
const VALIDADE_SEM_DATA = "Sem validade";
const VALIDADE_VENCIDO = "Vencido";
const VALIDADE_PROXIMA = "Vence em breve";
const VALIDADE_OK = "Em validade";
const DIAS_ALERTA_VENCIMENTO = 3;
const MS_POR_DIA = 1000 * 60 * 60 * 24;

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const formatValidade = (value?: string): string => {
  if (!value) {
    return VALIDADE_FALLBACK;
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return VALIDADE_FALLBACK;
  }
  return dateFormatter.format(parsed);
};

const getStatusValidade = (value?: string): { label: string; classe: string } => {
  if (!value) {
    return { label: VALIDADE_SEM_DATA, classe: "text-textGray" };
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return { label: VALIDADE_SEM_DATA, classe: "text-textGray" };
  }
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const diffDias = Math.ceil((parsed.getTime() - hoje.getTime()) / MS_POR_DIA);

  if (diffDias < 0) {
    return { label: VALIDADE_VENCIDO, classe: "text-red-600" };
  }
  if (diffDias <= DIAS_ALERTA_VENCIMENTO) {
    return { label: VALIDADE_PROXIMA, classe: "text-yellow-600" };
  }
  return { label: VALIDADE_OK, classe: "text-green-600" };
};

export default function EstoquePage() {
  const [estoques, setEstoques] = useState<Estoque[]>([]);
  const [selectedEstoque, setSelectedEstoque] = useState<Estoque | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalPostOpen, setModalPostOpen] = useState(false);
  const [isModalReduceOpen, setModalReduceOpen] = useState(false);
  const [isModalHistoricoOpen, setModalHistoricoOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { estoqueSearch, setEstoqueSearch } = useSearchStore();
  const { refresh, isRefreshing } = useDataRefresh();
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEstoques = async () => {
    try {
      const response = await getEstoques();
      setEstoques(response);
    } catch (error) {
      toast.error("Erro ao buscar estoques.");
    }
  };

  const {
    paginatedData: paginatedEstoques,
    currentPage,
    totalPages,
    totalItems,
    goToPage,
    handleDataChange
  } = usePaginatedData({
    data: estoques,
    itemsPerPage: 20,
    searchTerm: estoqueSearch,
    filterFn: (estoque, searchTerm) => {
      const produtoNome = estoque.nomeProduto || "";
      return produtoNome.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchEstoques();
      setLoading(false);
    };
    loadData();
  }, []);

  // Handle data change for pagination reset
  useEffect(() => {
    handleDataChange();
  }, [estoques, handleDataChange]);

  const handleRead = (estoque: Estoque) => {
    setSelectedEstoque(estoque);
    setModalOpen(true);
    setEditMode(false);
  };

  const handleAddEstoque = () => {
    setSelectedEstoque(null);
    setModalPostOpen(true);
    setEditMode(false);
  };

  const handleReduce = (estoque: Estoque) => {
    setSelectedEstoque(estoque);
    setModalReduceOpen(true);
    setEditMode(true);
  };

  const handleRefreshData = async () => {
    setLoading(true);
    await fetchEstoques();
    setLoading(false);
  };

  const handleSave = async (data: Estoque) => {
    try {
      if (isEditMode) {
        await postBaixaEstoque(data);
        toast.success("Baixa de estoque realizada com sucesso!");
      } else {
        await postAdicionaEstoque(data);
        toast.success("Novo estoque adicionado com sucesso!");
      }
      setModalOpen(false);
      setModalPostOpen(false);
      setModalReduceOpen(false);
      
      // Refresh data after save
      await refresh(fetchEstoques);
    } catch (error) {
      toast.error("Erro ao salvar estoque.");
    }
  };

  const getIndicadorEstoque = (quantidade: number): { cor: string; label: string; icon: any } => {
    if (quantidade === 0) {
      return { cor: "bg-red-100 border-red-300", label: "Sem Estoque", icon: MdError };
    }
    if (quantidade < 50) {
      return { cor: "bg-yellow-100 border-yellow-300", label: "Estoque Baixo", icon: MdWarning };
    }
    return { cor: "bg-green-100 border-green-300", label: "Normal", icon: MdCheckCircle };
  };

  const filteredEstoques = paginatedEstoques.filter((estoque) => {
    const produtoNome = estoque.nomeProduto?.toLowerCase() || "";
    return produtoNome.includes(searchTerm.toLowerCase());
  });

  if (loading || isRefreshing) {
    return (
      <div className="justify-center items-center flex h-full">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-black border-t-transparent"></div>
        <p className="text-black ml-4">
          {isRefreshing ? "Atualizando dados..." : "Carregando..."}
        </p>
      </div>
    );
  }

  return (
    <div className="my-4 w-full p-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary-900 rounded-lg shadow-md">
          <MdInventory2 className="text-white text-3xl" />
        </div>
        <div>
          <h1 className="text-primary-900 text-3xl font-bold">
            Gestão de Estoque
          </h1>
          <p className="text-textGray text-sm mt-1">Controle completo dos seus produtos</p>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-3 flex-wrap mb-6">
        <button
          onClick={handleAddEstoque}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:opacity-80 transition-all shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
        >
          <MdAdd className="text-xl" />
          Adicionar Estoque
        </button>
        <button
          onClick={() => setModalHistoricoOpen(true)}
          
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:opacity-80 transition-all shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
        >
          <MdHistory className="text-xl" />
          Ver Histórico
        </button>
        <button
          onClick={handleRefreshData}
          className="px-4 py-2 bg-primary-400 text-white rounded-lg hover:opacity-80 transition-all shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
        >
          <MdRefresh className="text-xl" />
          Atualizar
        </button>
      </div>

      {/* Busca */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Buscar produto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900"
        />
      </div>

      {/* Cards de Estoque */}
      {filteredEstoques.length === 0 ? (
        <div className="text-center py-12 bg-offwhite rounded-lg border-2 border-dashed border-borderGray">
          <FaBoxOpen className="text-offgray text-5xl mx-auto mb-3" />
          <p className="text-textGray text-lg font-medium">
            {searchTerm ? "Nenhum produto encontrado" : "Nenhum estoque cadastrado"}
          </p>
          <p className="text-offgray text-sm mt-1">
            {searchTerm ? "Tente outra busca" : "Adicione produtos ao estoque"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEstoques.map((estoque) => {
            const indicador = getIndicadorEstoque(estoque.quantidadeAtual || 0);
            const isLowStock = (estoque.quantidadeAtual || 0) < 50;
            const isOutOfStock = (estoque.quantidadeAtual || 0) === 0;
            const IconComponent = indicador.icon;
            const validadeLabel = formatValidade(estoque.dataFinalValidade);
            const statusValidade = getStatusValidade(estoque.dataFinalValidade);

            return (
              <div
                key={estoque.idEstoque}
                className="bg-white rounded-lg border border-borderGray shadow-md hover:shadow-xl transition-all duration-300"
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
                          {estoque.nomeProduto || "Produto não identificado"}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                          <IconComponent className={`text-xs ${
                            isOutOfStock ? 'text-red-500' :
                            isLowStock ? 'text-yellow-600' :
                            'text-green-600'
                          }`} />
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
                      <span className="font-bold text-brownText text-lg">
                        {estoque.quantidadeAtual || 0} kg
                      </span>
                    </div>
                    <div className="h-px bg-borderGray" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <MdEvent className="text-offgray text-sm" />
                        <span className="text-textGray text-sm">Validade</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-semibold text-brownText text-sm">
                          {validadeLabel}
                        </span>
                        <span className={`text-xs font-medium ${statusValidade.classe}`}>
                          {statusValidade.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleRead(estoque)}
                      className="px-2 py-2 text-xs bg-gray-600 text-white rounded-lg hover:opacity-80 transition-all shadow-sm hover:shadow-md flex flex-col items-center gap-1 font-medium"
                      title="Ver detalhes"
                    >
                      <MdVisibility className="text-base" />
                      <span>Ver</span>
                    </button>
                    <button
                      onClick={() => handleAddEstoque()}
                      className="px-2 py-2 text-xs bg-green-600 text-white rounded-lg hover:opacity-80 transition-all shadow-sm hover:shadow-md flex flex-col items-center gap-1 font-medium"
                      title="Adicionar ao estoque"
                    >
                      <MdAdd className="text-base" />
                      <span>Adicionar</span>
                    </button>
                    <button
                      onClick={() => handleReduce(estoque)}
                      className="px-2 py-2 text-xs bg-red-600 text-white rounded-lg hover:opacity-80 transition-all shadow-sm hover:shadow-md flex flex-col items-center gap-1 font-medium"
                      title="Dar baixa"
                    >
                      <MdRemove className="text-base" />
                      <span>Baixa</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <DinamicModalStockPost
        isOpen={isModalPostOpen}
        onClose={() => setModalPostOpen(false)}
        initialData={selectedEstoque}
        onSave={handleSave}
      />
      <DinamicModalStockGet
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        estoqueId={selectedEstoque?.idEstoque || 0}
      />
      <DinamicModalStockReduce
        isOpen={isModalReduceOpen}
        onClose={() => setModalReduceOpen(false)}
        initialData={selectedEstoque}
        onSave={handleSave}
      />

      <ModalHistoricoEstoque
        isOpen={isModalHistoricoOpen}
        onClose={() => setModalHistoricoOpen(false)}
      />

      <Toaster position="top-center" />
    </div>
  );
}