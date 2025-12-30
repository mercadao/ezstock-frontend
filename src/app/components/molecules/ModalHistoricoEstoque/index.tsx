"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { TransacaoEstoque, FiltroHistoricoEstoque } from "@/app/types";
import { buscarHistoricoEstoque } from "@/app/services/stockService";
import FiltrosHistoricoEstoque from "../FiltrosHistoricoEstoque";
import TabelaHistoricoEstoque from "../TabelaHistoricoEstoque";
import IndicadoresHistoricoEstoque from "../IndicadoresHistoricoEstoque";

interface ModalHistoricoEstoqueProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalHistoricoEstoque({ isOpen, onClose }: ModalHistoricoEstoqueProps) {
  const [transacoes, setTransacoes] = useState<TransacaoEstoque[]>([]);
  const [loading, setLoading] = useState(false);
  const [buscaRealizada, setBuscaRealizada] = useState(false);

  const handleBuscar = async (filtro: FiltroHistoricoEstoque) => {
    setLoading(true);
    setBuscaRealizada(false);

    try {
      const resultado = await buscarHistoricoEstoque(filtro);
      setTransacoes(resultado);
      setBuscaRealizada(true);
      
      if (resultado.length === 0) {
        toast.success("Busca concluída! Nenhuma transação encontrada.");
      } else {
        toast.success(`${resultado.length} transação(ões) encontrada(s)!`);
      }
    } catch (error: any) {
      console.error("Erro ao buscar histórico:", error);
      toast.error(error.message || "Erro ao buscar histórico de estoque");
      setTransacoes([]);
      setBuscaRealizada(true);
    } finally {
      setLoading(false);
    }
  };

  const handleExportar = () => {
    if (transacoes.length === 0) {
      toast.error("Não há dados para exportar");
      return;
    }

    try {
      const dadosExcel = transacoes.map((t) => ({
        ID: t.idTransacao,
        Data: new Date(t.dataTransacao).toLocaleDateString("pt-BR"),
        Produto: t.nomeProduto,
        Tipo: t.tipoTransacao === 1 ? "Entrada" : "Saída",
        "Quantidade (kg)": t.quantidadeKG.toFixed(2),
        "Valor (R$)": t.valorTransacao.toFixed(2),
        Usuário: t.nomeUsuario || "-",
        Cliente: t.nomeCliente || "-",
        Observação: t.observacao || "-",
      }));

      const csv = [
        Object.keys(dadosExcel[0]).join(","),
        ...dadosExcel.map((row) => Object.values(row).join(",")),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `historico_estoque_${new Date().toISOString().split("T")[0]}.csv`;
      link.click();

      toast.success("Arquivo exportado com sucesso!");
    } catch (error) {
      console.error("Erro ao exportar:", error);
      toast.error("Erro ao exportar dados");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-50 rounded-lg w-[95%] h-[95%] max-w-[1600px] max-h-[900px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-white rounded-t-lg">
          <h2 className="text-2xl font-bold text-gray-800">📦 Histórico de Estoque</h2>
          <div className="flex gap-3">
            {buscaRealizada && transacoes.length > 0 && (
              <button
                onClick={handleExportar}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                📥 Exportar
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Filtros */}
          <FiltrosHistoricoEstoque onBuscar={handleBuscar} />

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-md">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-600 mb-4"></div>
              <p className="text-gray-600 font-medium">Buscando transações...</p>
            </div>
          )}

          {/* Indicadores */}
          {!loading && buscaRealizada && transacoes.length > 0 && (
            <IndicadoresHistoricoEstoque transacoes={transacoes} />
          )}

          {/* Tabela */}
          {!loading && buscaRealizada && <TabelaHistoricoEstoque transacoes={transacoes} />}

          {/* Estado inicial */}
          {!loading && !buscaRealizada && (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-md">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-gray-600 text-lg font-medium">
                Configure os filtros e clique em Buscar para ver o histórico
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
