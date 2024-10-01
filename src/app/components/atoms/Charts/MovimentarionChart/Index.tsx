"use client";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

// Interface para representar a transação de estoque
interface TransacaoEstoque {
  idTransacao: number;
  idProduto: number;
  idUsuario: number;
  idEstoque: number;
  idCliente: number;
  tipoTransacao: number;
  quantidadeKG: number;
  dataTransacao: string;
  valorTransacao: number;
}

export default function MovimentationChart() {
  const [categories, setCategories] = useState<string[]>([]);
  const [seriesData, setSeriesData] = useState<{ x: string; y: number }[]>([]);

  // Função para buscar as últimas transações de estoque
  const fetchTransacoes = async () => {
    try {
      const response = await axios.get<TransacaoEstoque[]>(
        "https://villavitoriaapi-production.up.railway.app/api/Estoque/ListaTransacao",
        {
          headers: { accept: "text/plain" },
        }
      );

      // Mapeando as categorias e os dados da série
      const categorias = response.data.map(
        (transacao, index) => `Produto ${transacao.idProduto} - Transação ${index + 1}`
      );
      const series = response.data.map((transacao, index) => ({
        x: `Produto ${transacao.idProduto} - Transação ${index + 1}`,
        y: transacao.quantidadeKG,
      }));

      setCategories(categorias);
      setSeriesData(series);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  // Busca os dados da API ao montar o componente
  useEffect(() => {
    fetchTransacoes();
  }, []);

  const option = {
    chart: {
      id: "apexchart-example",
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
    },
    xaxis: {
      categories: categories, // Atualiza as categorias dinamicamente
      labels: {
        show: false, // Esconde os indicadores do eixo X
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      colors: ["#FFFFFF"],
      opacity: 1,
      type: "solid",
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#D27339"],
        weight: "bold",
      },
    },
    markers: {
      colors: ["#F44336", "#E91E63", "#9C27B0"],
    },
    colors: ["#FFFFFF"],
    grid: {
      show: true,
    },
    tooltip: {
      theme: "dark",
      style: {
        fontSize: "12px",
        color: "FFFFFF",
      },
    },
  };

  const series = [
    {
      data: seriesData, // Atualiza os dados da série dinamicamente
    },
  ];

  return (
    <Chart
      type="line"
      options={option}
      series={series}
      height="100%"
      width="100%"
    />
  );
}
