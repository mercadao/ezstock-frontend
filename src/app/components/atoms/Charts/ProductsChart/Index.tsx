"use client";
import React, { Component } from "react";
import Chart from "react-apexcharts";

export default function ProductsChart() {
  const options = {
    chart: {
      id: "apexchart-example",
      toolbar: {
        show: false,
      },
    },
    labels: [
      "Produto 1",
      "Produto 2",
      "Produto 3",
      "Produto 4",
      "Produto 5",
      "Produto 6",
    ],
    colors: ["#662700", "#401800", "#1A0A00", "#522D16", "#9F572B"],
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
        color: "#D27339",
      },
    },
    stroke: {
      show: true,
      width: 3,
    },
    legend: {
      show: true,
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

  const series = [10, 20, 15, 30, 25, 40];

  return (
    <Chart
      options={options}
      series={series}
      type="donut"
      height="100%"
      width="100%"
    />
  );
}
