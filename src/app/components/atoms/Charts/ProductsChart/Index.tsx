"use client";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

// Interface para representar os dados do estoque
interface Estoque {
  idEstoque: number;
  idProduto: number;
  quantidadeAtual: number;
  dataInicioValidade: string;
  dataFinalValidade: string;
  dataCadastro: string;
  nomeProduto: string;
}

export default function ProductsChart() {
  const [categories, setCategories] = useState<string[]>([]);
  const [seriesData, setSeriesData] = useState<number[]>([]);

  // Função para buscar os dados de estoque da API
  // Função para buscar os dados de estoque da API
const fetchEstoque = async () => {
  try {
    const response = await axios.get<Estoque[]>(
      "https://villavitoriaapi-production.up.railway.app/api/Estoque/ObterEstoque?somenteAtivos=true",
      {
        headers: { accept: "*/*" },
      }
    );

    // Mapeando os produtos únicos e suas quantidades
    const produtosUnicos = Array.from(
      new Set(response.data.map((estoque) => estoque.idProduto))
    );

    // Criando um objeto para mapear o idProduto para seu respectivo nome
    const nomeProdutosMap = response.data.reduce((acc, estoque) => {
      acc[estoque.idProduto] = estoque.nomeProduto;
      return acc;
    }, {} as Record<number, string>);

    const categorias = produtosUnicos.map((produtoId) => {
      return `${produtoId} - ${nomeProdutosMap[produtoId] || "Desconhecido"}`;
    });

    const series = produtosUnicos.map((produtoId) =>
      response.data
        .filter((estoque) => estoque.idProduto === produtoId)
        .reduce((acc, estoque) => acc + estoque.quantidadeAtual, 0) // Soma as quantidades do mesmo produto
    );

    setCategories(categorias);
    setSeriesData(series);
  } catch (error) {
    console.error("Erro ao buscar os dados de estoque:", error);
  }
};


  // Busca os dados ao montar o componente
  useEffect(() => {
    fetchEstoque();
  }, []);

  const options = {
    chart: {
      id: "apexchart-example",
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 14,
        left: 7,
        blur: 10,
        opacity: 0.1,
      },
    },
    labels: categories, // Atualiza as categorias dinamicamente
    fill: {
      opacity: 1,
      type: "solid",
    },
    dataLabels: {
      style: {
        colors: ["white"],
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: "dark", // Define o tema do tooltip (dark, light, ou personalizado)
      style: {
        fontSize: "12px", // Tamanho da fonte
        fontColor: "#FFFFFF", // Cor da fonte
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        color: "#9F572B",
        transparent: "true",
      },
    },
    stroke: {
      show: false,
    },
    legend: {
      show: false,
      fontWeight: "bold",
      fontFamily: "Poppins",
      fontSize: "10px",
      labels: {
        colors: "white",
      },
      markers: {
        offsetX: -5,
        strokeWidth: 2,
      },
    },
  };

  return (
    <Chart
      options={options}
      series={seriesData} // Atualiza a série dinamicamente
      type="donut"
      height="100%"
      width="100%"
    />
  );
}
