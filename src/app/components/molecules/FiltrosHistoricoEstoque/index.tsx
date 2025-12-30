"use client";
import { useState, useEffect } from "react";
import { FiltroHistoricoEstoque } from "@/app/types";
import { getProdutos } from "@/app/services/productService";
import { getClients } from "@/app/services/clientService";

interface FiltrosHistoricoEstoqueProps {
  onBuscar: (filtro: FiltroHistoricoEstoque) => void;
}

export default function FiltrosHistoricoEstoque({ onBuscar }: FiltrosHistoricoEstoqueProps) {
  const [filtro, setFiltro] = useState<FiltroHistoricoEstoque>({
    idProduto: null,
    dataInicio: null,
    dataFim: null,
    tipoTransacao: null,
    idCliente: null,
  });

  const [produtos, setProdutos] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);

  useEffect(() => {
    carregarProdutos();
    carregarClientes();
  }, []);

  const carregarProdutos = async () => {
    try {
      const response = await getProdutos();
      setProdutos(response);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  const carregarClientes = async () => {
    try {
      const response = await getClients();
      setClientes(response);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    }
  };

  const handleBuscar = () => {
    const filtroLimpo: FiltroHistoricoEstoque = {
      idProduto: filtro.idProduto || null,
      dataInicio: filtro.dataInicio || null,
      dataFim: filtro.dataFim || null,
      tipoTransacao: filtro.tipoTransacao || null,
      idCliente: filtro.idCliente || null,
    };
    onBuscar(filtroLimpo);
  };

  const handleLimpar = () => {
    setFiltro({
      idProduto: null,
      dataInicio: null,
      dataFim: null,
      tipoTransacao: null,
      idCliente: null,
    });
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md mb-5">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Filtros de Pesquisa</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Filtro por Produto */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">Produto</label>
          <select
            value={filtro.idProduto || ""}
            onChange={(e) =>
              setFiltro({ ...filtro, idProduto: e.target.value ? Number(e.target.value) : null })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium bg-white"
          >
            <option value="" className="text-gray-500">Todos os Produtos</option>
            {produtos.map((p) => (
              <option key={p.idProduto} value={p.idProduto} className="text-gray-900">
                {p.nomeProduto}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Tipo */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">Tipo de Transação</label>
          <select
            value={filtro.tipoTransacao || ""}
            onChange={(e) =>
              setFiltro({ ...filtro, tipoTransacao: e.target.value ? Number(e.target.value) : null })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium bg-white"
          >
            <option value="" className="text-gray-500">Todos os Tipos</option>
            <option value="1" className="text-gray-900">Entrada</option>
            <option value="2" className="text-gray-900">Saída</option>
          </select>
        </div>

        {/* Filtro por Cliente */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">Cliente</label>
          <select
            value={filtro.idCliente || ""}
            onChange={(e) =>
              setFiltro({ ...filtro, idCliente: e.target.value ? Number(e.target.value) : null })
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium bg-white"
          >
            <option value="" className="text-gray-500">Todos os Clientes</option>
            {clientes.map((c) => (
              <option key={c.idCliente} value={c.idCliente} className="text-gray-900">
                {c.nomeCliente}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Data Início */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">Data Início</label>
          <input
            type="date"
            value={filtro.dataInicio || ""}
            onChange={(e) => setFiltro({ ...filtro, dataInicio: e.target.value || null })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium bg-white"
          />
        </div>

        {/* Filtro por Data Fim */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-600">Data Fim</label>
          <input
            type="date"
            value={filtro.dataFim || ""}
            onChange={(e) => setFiltro({ ...filtro, dataFim: e.target.value || null })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium bg-white"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleBuscar}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
        >
          🔍 Buscar
        </button>
        <button
          onClick={handleLimpar}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
        >
          🗑️ Limpar Filtros
        </button>
      </div>
    </div>
  );
}
