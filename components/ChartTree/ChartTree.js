"use client";
import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import ApexCharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartTree = () => {
  const [chartData, setChartData] = useState({
    series: [30, 60, 30], // Values for donut chart
    options: {
      chart: {
        type: "donut",
        height: 350,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%", // Donut size
            background: "transparent", // Background inside donut
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "16px",
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: "14px",
                offsetY: 10,
                formatter: (val) => `${val}%`,
              },
              total: {
                show: true,
                label: "Total",
                formatter: function (w) {
                  // Total percentage calculation
                  return (
                    w.globals.seriesTotals.reduce((a, b) => a + b, 0) + "%"
                  );
                },
              },
            },
          },
        },
      },
      labels: ["Product A", "Product B", "Product C"], // Labels for each section
      colors: ["#FF4560", "#00E396", "#008FFB"], // Custom colors for sections
      legend: {
        position: "bottom",
        horizontalAlign: "center",
      },
    },
  });

  return (
    <div>
      <h2>Donut Chart</h2>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        height={350}
      />
    </div>
  );
};

export default ChartTree;
