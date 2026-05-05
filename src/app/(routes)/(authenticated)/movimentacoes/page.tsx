"use client";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  MdHistoryEdu,
  MdRefresh,
  MdSearch,
  MdFilterAltOff,
  MdAdd,
  MdEdit,
  MdDelete,
  MdInventory2
} from "react-icons/md";

import {
  listarMovimentacoes,
  Movimentacao,
  FiltroMovimentacao
} from "@/app/services/movimentacaoService";

const MODULOS = [
  { value: "", label: "Todos os módulos" },
  { value: "ESTOQUE", label: "Estoque" }
];

const ACOES = [
  { value: "", label: "Todas as ações" },
  { value: "INSERT", label: "Criação" },
  { value: "UPDATE", label: "Atualização" },
  { value: "DELETE", label: "Exclusão" }
];

const ITENS_POR_PAGINA = 20;

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});

const formatarData = (valor: string): string => {
  if (!valor) {
    return "—";
  }
  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) {
    return "—";
  }
  return dateTimeFormatter.format(data);
};

const traduzirAcao = (acao: string): string => {
  if (acao === "INSERT") {
    return "Criação";
  }
  if (acao === "UPDATE") {
    return "Atualização";
  }
  if (acao === "DELETE") {
    return "Exclusão";
  }
  return acao;
};

const obterCorAcao = (acao: string): string => {
  if (acao === "INSERT") {
    return "bg-green-100 text-green-800 border-green-300";
  }
  if (acao === "UPDATE") {
    return "bg-yellow-100 text-yellow-800 border-yellow-300";
  }
  if (acao === "DELETE") {
    return "bg-red-100 text-red-800 border-red-300";
  }
  return "bg-gray-100 text-gray-800 border-gray-300";
};

const obterIconeAcao = (acao: string) => {
  if (acao === "INSERT") {
    return <MdAdd className="text-base" />;
  }
  if (acao === "UPDATE") {
    return <MdEdit className="text-base" />;
  }
  if (acao === "DELETE") {
    return <MdDelete className="text-base" />;
  }
  return <MdHistoryEdu className="text-base" />;
};

const obterIconeModulo = (modulo: string) => {
  if (modulo === "ESTOQUE") {
    return <MdInventory2 className="text-primary-900 text-base" />;
  }
  return <MdHistoryEdu className="text-primary-900 text-base" />;
};

const FILTRO_INICIAL: FiltroMovimentacao = {
  idUsuario: null,
  modulo: "",
  acao: "",
  dataInicio: null,
  dataFim: null
};

export default function MovimentacoesPage() {
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagina, setPagina] = useState<number>(1);

  const [filtroModulo, setFiltroModulo] = useState<string>("");
  const [filtroAcao, setFiltroAcao] = useState<string>("");
  const [filtroDataInicio, setFiltroDataInicio] = useState<string>("");
  const [filtroDataFim, setFiltroDataFim] = useState<string>("");

  const carregarMovimentacoes = async (filtro: FiltroMovimentacao) => {
    setLoading(true);
    try {
      const registros = await listarMovimentacoes(filtro);
      setMovimentacoes(registros);
      setPagina(1);
    } catch (error) {
      toast.error("Erro ao carregar movimentações.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarMovimentacoes(FILTRO_INICIAL);
  }, []);

  const handleAplicarFiltros = () => {
    const filtro: FiltroMovimentacao = {
      modulo: filtroModulo || null,
      acao: filtroAcao || null,
      dataInicio: filtroDataInicio || null,
      dataFim: filtroDataFim || null
    };
    carregarMovimentacoes(filtro);
  };

  const handleLimparFiltros = () => {
    setFiltroModulo("");
    setFiltroAcao("");
    setFiltroDataInicio("");
    setFiltroDataFim("");
    carregarMovimentacoes(FILTRO_INICIAL);
  };

  const totalPaginas = Math.max(1, Math.ceil(movimentacoes.length / ITENS_POR_PAGINA));
  const inicio = (pagina - 1) * ITENS_POR_PAGINA;
  const movimentacoesPagina = movimentacoes.slice(inicio, inicio + ITENS_POR_PAGINA);

  return (
    <div className="my-4 w-full p-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary-900 rounded-lg shadow-md">
          <MdHistoryEdu className="text-white text-3xl" />
        </div>
        <div>
          <h1 className="text-primary-900 text-3xl font-bold">
            Histórico de Movimentações
          </h1>
          <p className="text-textGray text-sm mt-1">
            Auditoria das ações de criação, atualização e exclusão dos usuários
          </p>
        </div>
      </div>

      <div className="bg-white border border-borderGray rounded-lg p-4 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          <div>
            <label className="block text-textGray text-xs font-medium mb-1">
              Módulo
            </label>
            <select
              value={filtroModulo}
              onChange={(event) => setFiltroModulo(event.target.value)}
              className="w-full px-3 py-2 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 text-sm"
            >
              {MODULOS.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-textGray text-xs font-medium mb-1">
              Ação
            </label>
            <select
              value={filtroAcao}
              onChange={(event) => setFiltroAcao(event.target.value)}
              className="w-full px-3 py-2 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 text-sm"
            >
              {ACOES.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-textGray text-xs font-medium mb-1">
              Data início
            </label>
            <input
              type="date"
              value={filtroDataInicio}
              onChange={(event) => setFiltroDataInicio(event.target.value)}
              className="w-full px-3 py-2 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 text-sm"
            />
          </div>

          <div>
            <label className="block text-textGray text-xs font-medium mb-1">
              Data fim
            </label>
            <input
              type="date"
              value={filtroDataFim}
              onChange={(event) => setFiltroDataFim(event.target.value)}
              className="w-full px-3 py-2 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-900 text-sm"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleAplicarFiltros}
            className="px-4 py-2 bg-primary-900 text-white rounded-lg hover:opacity-80 transition-all shadow-sm hover:shadow-md flex items-center gap-2 text-sm font-medium"
          >
            <MdSearch className="text-base" />
            Aplicar filtros
          </button>
          <button
            onClick={handleLimparFiltros}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:opacity-80 transition-all shadow-sm hover:shadow-md flex items-center gap-2 text-sm font-medium"
          >
            <MdFilterAltOff className="text-base" />
            Limpar
          </button>
          <button
            onClick={handleAplicarFiltros}
            className="px-4 py-2 bg-primary-400 text-white rounded-lg hover:opacity-80 transition-all shadow-sm hover:shadow-md flex items-center gap-2 text-sm font-medium"
          >
            <MdRefresh className="text-base" />
            Atualizar
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-primary-900 border-t-transparent" />
          <p className="text-textGray ml-4">Carregando movimentações...</p>
        </div>
      )}

      {!loading && movimentacoes.length === 0 && (
        <div className="text-center py-12 bg-offwhite rounded-lg border-2 border-dashed border-borderGray">
          <MdHistoryEdu className="text-offgray text-5xl mx-auto mb-3" />
          <p className="text-textGray text-lg font-medium">
            Nenhuma movimentação encontrada
          </p>
          <p className="text-offgray text-sm mt-1">
            Ajuste os filtros ou aguarde novas ações no sistema
          </p>
        </div>
      )}

      {!loading && movimentacoes.length > 0 && (
        <>
          <div className="bg-white border border-borderGray rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-offwhite border-b border-borderGray">
                <tr>
                  <th className="text-left px-4 py-3 text-textGray font-semibold">Data/Hora</th>
                  <th className="text-left px-4 py-3 text-textGray font-semibold">Usuário</th>
                  <th className="text-left px-4 py-3 text-textGray font-semibold">Módulo</th>
                  <th className="text-left px-4 py-3 text-textGray font-semibold">Ação</th>
                  <th className="text-left px-4 py-3 text-textGray font-semibold">Registro</th>
                  <th className="text-left px-4 py-3 text-textGray font-semibold">Descrição</th>
                </tr>
              </thead>
              <tbody>
                {movimentacoesPagina.map((movimentacao) => (
                  <tr
                    key={movimentacao.idMovimentacao}
                    className="border-b border-borderGray hover:bg-offwhite transition-colors"
                  >
                    <td className="px-4 py-3 text-brownText whitespace-nowrap">
                      {formatarData(movimentacao.dataMovimentacao)}
                    </td>
                    <td className="px-4 py-3 text-brownText">
                      {movimentacao.nomeUsuario || `Usuário ${movimentacao.idUsuario}`}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {obterIconeModulo(movimentacao.modulo)}
                        <span className="text-brownText">{movimentacao.modulo}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border font-medium ${obterCorAcao(
                          movimentacao.acao
                        )}`}
                      >
                        {obterIconeAcao(movimentacao.acao)}
                        {traduzirAcao(movimentacao.acao)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-brownText">
                      {movimentacao.idRegistroAfetado ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-textGray">
                      {movimentacao.descricao || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-textGray text-sm">
              Mostrando {movimentacoesPagina.length} de {movimentacoes.length} movimentação(ões)
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPagina((atual) => Math.max(1, atual - 1))}
                disabled={pagina === 1}
                className="px-3 py-1.5 bg-white border border-borderGray rounded-lg text-sm font-medium text-brownText disabled:opacity-50 disabled:cursor-not-allowed hover:bg-offwhite transition-colors"
              >
                Anterior
              </button>
              <span className="text-textGray text-sm">
                Página {pagina} de {totalPaginas}
              </span>
              <button
                onClick={() => setPagina((atual) => Math.min(totalPaginas, atual + 1))}
                disabled={pagina === totalPaginas}
                className="px-3 py-1.5 bg-white border border-borderGray rounded-lg text-sm font-medium text-brownText disabled:opacity-50 disabled:cursor-not-allowed hover:bg-offwhite transition-colors"
              >
                Próxima
              </button>
            </div>
          </div>
        </>
      )}

      <Toaster position="top-center" />
    </div>
  );
}
