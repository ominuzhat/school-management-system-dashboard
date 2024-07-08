import React, { useEffect, useRef } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { Card } from "antd";

const RestaurantWiseSalesGraph: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options: ApexOptions = {
      series: [
        {
          name: "Sokher Rannaghor",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "Cafe Cino",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
        {
          name: "Cafee House",
          data: [15, 42, 52, 25, 75, 45, 32],
        },
      ],
      chart: {
        type: "area",
        height: 450,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Fundamental Analysis of Stocks",
        align: "left",
      },
      subtitle: {
        text: "Price Movements",
        align: "left",
      },

      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: "left",
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      responsive: [
        {
          breakpoint: 1000,
          options: {
            plotOptions: {
              bar: {
                horizontal: false,
              },
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };

    if (chartRef.current) {
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, []);

  return <Card id="chart" ref={chartRef} />;
};

export default RestaurantWiseSalesGraph;
