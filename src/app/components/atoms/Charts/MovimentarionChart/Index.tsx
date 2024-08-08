"use client";
import React, { Component } from "react";
import Chart from "react-apexcharts";

export default function MovimentationChart() {
  const option = {
    chart: {
      id: "apexchart-example",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [
        "Produto 1",
        "Produto 2",
        "Produto 3",
        "Produto 4",
        "Produto 5",
        "Produto 6",
      ],
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
      style: {
        colors: ["#D27339"],
        weight: "bold",
      },
    },
    markers: {
      colors: ["#F44336", "#E91E63", "#9C27B0"],
    },
    colors: ["#F44336", "#E91E63", "#9C27B0"],
    grid: {
      show: true,
    },

    tooltip: {
      theme: "dark", // Define o tema do tooltip (dark, light, ou personalizado)
      style: {
        fontSize: "12px", // Tamanho da fonte
        fontColor: "FFFFFF", // Cor da fonte
      },
    },
  };

  const series = [
    {
      data: [
        {
          x: "Produto 1",
          y: 10,
        },
        {
          x: "Produto 2",
          y: 18,
        },
        {
          x: "Produto 3",
          y: 13,
        },
        {
          x: "Produto 4",
          y: 30,
        },
        {
          x: "Produto 5",
          y: 17,
        },
        {
          x: "Produto 6",
          y: 6,
        },
      ],
    },
  ];

  return (
    <Chart
      type="bar"
      options={option}
      series={series}
      height="100%"
      width="100%"
    />
  );
}
