import { Card } from "antd";
import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const EstimatedMonth = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options = {
      series: [44000, 55000, 10000],
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Estimation", "Collections", "Remainings"],
      responsive: [
        {
          breakpoint: 980,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      tooltip: {
        y: {
          formatter: function (value: number) {
            return `Tk ${value.toLocaleString()}`;
          },
        },
      },
    };

    if (chartRef.current) {
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, []);

  return (
    <div>
      <Card title="Estimated Fee This Month">
        <div id="chart" ref={chartRef} />
      </Card>
    </div>
  );
};

export default EstimatedMonth;
