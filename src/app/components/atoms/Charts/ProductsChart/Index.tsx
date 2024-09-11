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
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 14,
        left: 7,
        blur: 10,
        opacity: 0.1,
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
