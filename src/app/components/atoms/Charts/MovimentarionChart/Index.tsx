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
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
    fill: {
      colors: ["#FFFFFF"],
    },
  };

  const series = [
    {
      name: "series-1",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
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
