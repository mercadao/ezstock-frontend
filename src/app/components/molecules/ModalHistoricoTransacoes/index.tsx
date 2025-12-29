"use client";

import { useState, useEffect } from "react";
import Modal from "@/app/components/atoms/Modal";
import {
  buscarHistoricoTransacoes,
  formatarDataTransacao,
  formatarQuantidade,
  obterSímboloTransacao,
  RegistroMateriaPrima,
  TRANSACTION_TYPE,
  FiltroHistorico,
} from "@/app/services/rawMaterialStockService";
import { getMateriaPrima, MateriaPrima } from "@/app/services/materiaPrimaService";
import toast from "react-hot-toast";

interface ModalHistoricoProps {
  isOpen: boolean;
  onClose: () => void;
  idMateriaPrimaPreselected?: number;
}

export default function ModalHistorico({
  isOpen,
  onClose,
  idMateriaPrimaPreselected,
}: ModalHistoricoProps) {
  const [registros, setRegistros] = useState<RegistroMateriaPrima[]>([]);
  const [materiasPrimas, setMateriasPrimas] = useState<MateriaPrima[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filtros, setFiltros] = useState<FiltroHistorico>({
    idMateriaPrima: idMateriaPrimaPreselected,
    dataInicio: "",
    dataFim: "",
    tipoTransacao: null,
  });

  useEffect(() => {
    if (isOpen) {
      loadMateriaPrimas();
      loadHistorico();
    }
  }, [isOpen]);

  const loadMateriaPrimas = async () => {
    try {
      const dados = await getMateriaPrima();
      setMateriasPrimas(dados);
    } catch (error) {
      console.error("Erro ao carregar matérias-primas:", error);
    }
  };

  const loadHistorico = async () => {
    setIsLoading(true);
    try {
      const dados = await buscarHistoricoTransacoes(filtros);
      setRegistros(dados);
    } catch (error) {
      toast.error("Erro ao buscar histórico de transações");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFiltroChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({
      ...prev,
      [name]:
        name === "tipoTransacao"
          ? value === ""
            ? null
            : parseInt(value)
          : value,
    }));
  };

  const handleFiltrar = () => {
    loadHistorico();
  };

  const handleLimparFiltros = () => {
    setFiltros({
      idMateriaPrima: idMateriaPrimaPreselected,
      dataInicio: "",
      dataFim: "",
      tipoTransacao: null,
    });
  };

  const handleExportar = () => {
    const csv = [
      ["Data", "Matéria Prima", "Tipo", "Quantidade (kg)", "Observação"],
      ...registros.map((r) => [
        formatarDataTransacao(r.dataTransacao),
        r.dscMateriaPrima,
        r.dscTipoTransacao,
        formatarQuantidade(r.quantidadeKG),
        r.observacao,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "historico_materias_primas.csv");
    link.click();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <h2 className="text-lg font-bold text-gray-800 mb-4">📋 Histórico de Transações</h2>
      <div className="space-y-4 max-h-[80vh] flex flex-col">
        {/* Filtros */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
          <h3 className="font-semibold text-gray-800">Filtros</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Matéria Prima */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Matéria Prima
              </label>
              <select
                name="idMateriaPrima"
                value={filtros.idMateriaPrima || ""}
                onChange={handleFiltroChange}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas</option>
                {materiasPrimas.map((mp) => (
                  <option key={mp.idMateriaPrima} value={mp.idMateriaPrima}>
                    {mp.dscMateriaPrima}
                  </option>
                ))}
              </select>
            </div>

            {/* Data Início */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Data Início
              </label>
              <input
                type="date"
                name="dataInicio"
                value={filtros.dataInicio || ""}
                onChange={handleFiltroChange}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Data Fim */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Data Fim
              </label>
              <input
                type="date"
                name="dataFim"
                value={filtros.dataFim || ""}
                onChange={handleFiltroChange}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Tipo de Transação */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <select
                name="tipoTransacao"
                value={filtros.tipoTransacao || ""}
                onChange={handleFiltroChange}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos</option>
                <option value={TRANSACTION_TYPE.ENTRADA}>Entradas</option>
                <option value={TRANSACTION_TYPE.SAIDA}>Saídas</option>
              </select>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={handleLimparFiltros}
              className="px-3 py-1 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Limpar Filtros
            </button>
            <button
              type="button"
              onClick={handleFiltrar}
              disabled={isLoading}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition disabled:bg-gray-400"
            >
              {isLoading ? "Carregando..." : "Filtrar"}
            </button>
          </div>
        </div>

        {/* Lista de Registros */}
        <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg">
          {registros.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <p className="text-sm">Nenhum registro encontrado</p>
            </div>
          ) : (
            <div className="space-y-3 p-4">
              {registros.map((registro) => (
                <div
                  key={registro.idRegistro}
                  className={`p-3 rounded-lg border-l-4 ${
                    registro.tipoTransacao === TRANSACTION_TYPE.ENTRADA
                      ? "border-l-green-500 bg-green-50"
                      : "border-l-red-500 bg-red-50"
                  }`}
                >
                  {/* Data e Tipo */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {obterSímboloTransacao(registro.tipoTransacao)}
                      </span>
                      <span className="font-medium text-gray-800">
                        {registro.dscMateriaPrima}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      📅 {formatarDataTransacao(registro.dataTransacao)}
                    </span>
                  </div>

                  {/* Quantidade */}
                  <div className="text-sm font-bold mb-1">
                    {registro.tipoTransacao === TRANSACTION_TYPE.ENTRADA
                      ? "✅ ENTRADA"
                      : "❌ SAÍDA"}
                    :{" "}
                    <span className="text-lg">
                      {registro.tipoTransacao === TRANSACTION_TYPE.ENTRADA
                        ? "+"
                        : "-"}
                      {formatarQuantidade(registro.quantidadeKG)} kg
                    </span>
                  </div>

                  {/* Observação */}
                  {registro.observacao && (
                    <p className="text-xs text-gray-600 mt-2 p-2 bg-white rounded border border-gray-200">
                      💬 {registro.observacao}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rodapé com Exportar */}
        {registros.length > 0 && (
          <div className="flex justify-end gap-2 pt-2 border-t">
            <button
              type="button"
              onClick={handleExportar}
              className="px-3 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              📥 Exportar CSV
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
