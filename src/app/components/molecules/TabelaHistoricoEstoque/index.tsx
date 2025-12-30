"use client";
import { TransacaoEstoque } from "@/app/types";
import { 
  MdAdd, 
  MdRemove, 
  MdPerson, 
  MdBusiness,
  MdEvent,
  MdAttachMoney,
  MdInventory
} from "react-icons/md";
import { FaWeightHanging, FaBoxOpen } from "react-icons/fa";
import { BiSolidPackage } from "react-icons/bi";

interface TabelaHistoricoEstoqueProps {
  transacoes: TransacaoEstoque[];
}

export default function TabelaHistoricoEstoque({ transacoes }: TabelaHistoricoEstoqueProps) {
  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const formatarQuantidade = (quantidade: number) => {
    return quantidade.toFixed(2);
  };

  const getTipoLabel = (tipo: number) => {
    return tipo === 1 ? "Entrada" : "Saída";
  };

  const getTipoIcon = (tipo: number) => {
    return tipo === 1 ? <MdAdd className="text-lg" /> : <MdRemove className="text-lg" />;
  };

  const getTipoColor = (tipo: number) => {
    return tipo === 1 ? "bg-green-600" : "bg-red-600";
  };

  if (transacoes.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
        <FaBoxOpen className="text-gray-400 text-5xl mx-auto mb-3" />
        <p className="text-gray-600 text-lg font-medium">
          Nenhuma transação encontrada
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Ajuste os filtros e tente novamente
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {transacoes.map((t) => {
        const isEntrada = t.tipoTransacao === 1;
        
        return (
          <div
            key={t.idTransacao}
            className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="p-5">
              {/* Cabeçalho com Tipo e ID */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 ${getTipoColor(t.tipoTransacao)} rounded-lg shadow-md`}>
                    {getTipoIcon(t.tipoTransacao)}
                    <span className="sr-only">{getTipoLabel(t.tipoTransacao)}</span>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      isEntrada ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {getTipoLabel(t.tipoTransacao)}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">ID: #{t.idTransacao}</p>
                  </div>
                </div>
              </div>

              {/* Produto */}
              <div className="mb-3 pb-3 border-b border-gray-200">
                <div className="flex items-start gap-2">
                  <BiSolidPackage className="text-primary-900 text-xl mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Produto</p>
                    <h3 className="font-bold text-gray-900 text-base leading-tight">
                      {t.nomeProduto}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Informações Principais */}
              <div className="space-y-2.5 mb-4 bg-gray-50 p-3 rounded-lg">
                {/* Quantidade */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaWeightHanging className="text-gray-500 text-sm" />
                    <span className="text-gray-600 text-sm font-medium">Quantidade</span>
                  </div>
                  <span className="font-bold text-gray-900 text-base">
                    {formatarQuantidade(t.quantidadeKG)} kg
                  </span>
                </div>

                <div className="h-px bg-gray-200" />

                {/* Valor Total */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MdAttachMoney className="text-green-600 text-base" />
                    <span className="text-gray-600 text-sm font-medium">Valor Total</span>
                  </div>
                  <span className="font-bold text-green-600 text-base">
                    {formatarValor(t.valorTransacao)}
                  </span>
                </div>
              </div>

              {/* Informações Adicionais */}
              <div className="space-y-2 text-sm">
                {/* Data */}
                <div className="flex items-center gap-2 text-gray-600">
                  <MdEvent className="text-gray-400 flex-shrink-0" />
                  <span className="font-medium text-xs text-gray-500">Data:</span>
                  <span className="text-gray-800 font-semibold">{formatarData(t.dataTransacao)}</span>
                </div>

                {/* Usuário */}
                {t.nomeUsuario && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MdPerson className="text-gray-400 flex-shrink-0" />
                    <span className="font-medium text-xs text-gray-500">Usuário:</span>
                    <span className="text-gray-800 font-semibold truncate">{t.nomeUsuario}</span>
                  </div>
                )}

                {/* Cliente */}
                {t.nomeCliente && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MdBusiness className="text-gray-400 flex-shrink-0" />
                    <span className="font-medium text-xs text-gray-500">Cliente:</span>
                    <span className="text-gray-800 font-semibold truncate">{t.nomeCliente}</span>
                  </div>
                )}

                {/* Observação */}
                {t.observacao && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Observação</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{t.observacao}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
