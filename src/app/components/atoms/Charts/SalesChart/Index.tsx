'use client';
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

export default function SalesChart() {
  const [series, setSeries] = useState<{ data: { x: string; y: number }[] }[]>([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://villavitoriaapi-production.up.railway.app/api/Estoque/ListaTransacao')
      .then(response => {
        const salesTransactions = response.data.filter((transaction: any) => transaction.tipoTransacao === 2);
  
        const groupedData = salesTransactions.reduce((acc: any, transaction: any) => {
          const productIndex = acc.findIndex((item: any) => item.x === `Produto ${transaction.idProduto}`);
          if (productIndex !== -1) {
            acc[productIndex].y += transaction.quantidadeKG;
          } else {
            acc.push({ x: ` ${transaction.nomeProduto}`, y: transaction.quantidadeKG });
          }
          return acc;
        }, []);
  
        // Pegar apenas as últimas 20 vendas
        const limitedData = groupedData.slice(-10);
  
        setSeries([{ data: limitedData }]);
        setCategories(limitedData.map((item: any) => item.x));
      })
      .catch(error => {
        console.error("Erro ao buscar transações:", error);
      });
  }, []);
  
  const options = {
    chart: {
      id: "sales-chart",
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
      categories: categories,
      labels: {
        show: true,
        style: {
          colors: ["#FFF"],
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: ["#FFF"],
        },
      },
    },
    fill: {
      colors: ["#D27339"],
      opacity: 1,
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#FFF"],
        fontWeight: "bold",
      },
    },
    grid: {
      show: true,
    },
    tooltip: {
      theme: "dark",
    },
    colors: ["#D27339"],
  };

  return (
    <Chart
      type="bar"
      options={options}
      series={series}
      height="100%"
      width="100%"
    />
  );
}
