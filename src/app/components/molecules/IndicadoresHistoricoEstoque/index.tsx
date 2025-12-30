"use client";
import { TransacaoEstoque } from "@/app/types";

interface IndicadoresHistoricoEstoqueProps {
  transacoes: TransacaoEstoque[];
}

export default function IndicadoresHistoricoEstoque({ transacoes }: IndicadoresHistoricoEstoqueProps) {
  const calcularIndicadores = () => {
    const entradas = transacoes.filter((t) => t.tipoTransacao === 1);
    const saidas = transacoes.filter((t) => t.tipoTransacao === 2);

    return {
      totalTransacoes: transacoes.length,
      totalEntradas: entradas.length,
      totalSaidas: saidas.length,
      valorTotalEntradas: entradas.reduce((sum, t) => sum + t.valorTransacao, 0),
      valorTotalSaidas: saidas.reduce((sum, t) => sum + t.valorTransacao, 0),
      quantidadeTotalEntradas: entradas.reduce((sum, t) => sum + t.quantidadeKG, 0),
      quantidadeTotalSaidas: saidas.reduce((sum, t) => sum + t.quantidadeKG, 0),
    };
  };

  const indicadores = calcularIndicadores();

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
      {/* Total de Transações */}
      <div className="bg-white rounded-lg shadow-md p-5 flex items-center gap-4">
        <div className="text-4xl">📊</div>
        <div>
          <h4 className="text-sm font-medium text-gray-600">Total de Transações</h4>
          <p className="text-3xl font-bold text-gray-900 mt-1">{indicadores.totalTransacoes}</p>
        </div>
      </div>

      {/* Entradas */}
      <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-green-500">
        <div className="flex items-center gap-4 mb-2">
          <div className="text-4xl">📥</div>
          <div>
            <h4 className="text-sm font-medium text-gray-600">Entradas</h4>
            <p className="text-3xl font-bold text-green-600">{indicadores.totalEntradas}</p>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <p className="text-xs text-gray-600">
            Quantidade: {indicadores.quantidadeTotalEntradas.toFixed(2)} kg
          </p>
          <p className="text-sm font-semibold text-green-700">
            {formatarValor(indicadores.valorTotalEntradas)}
          </p>
        </div>
      </div>

      {/* Saídas */}
      <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-red-500">
        <div className="flex items-center gap-4 mb-2">
          <div className="text-4xl">📤</div>
          <div>
            <h4 className="text-sm font-medium text-gray-600">Saídas</h4>
            <p className="text-3xl font-bold text-red-600">{indicadores.totalSaidas}</p>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <p className="text-xs text-gray-600">
            Quantidade: {indicadores.quantidadeTotalSaidas.toFixed(2)} kg
          </p>
          <p className="text-sm font-semibold text-red-700">
            {formatarValor(indicadores.valorTotalSaidas)}
          </p>
        </div>
      </div>

      {/* Saldo */}
      <div className="bg-white rounded-lg shadow-md p-5 border-l-4 border-blue-500">
        <div className="flex items-center gap-4">
          <div className="text-4xl">💰</div>
          <div>
            <h4 className="text-sm font-medium text-gray-600">Saldo Financeiro</h4>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {formatarValor(indicadores.valorTotalEntradas - indicadores.valorTotalSaidas)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
