import React from "react";
// import "./style.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Chart = ({ chartData }) => {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
  };
  return <Line data={chartData} options={options} />;
};

export default Chart;
