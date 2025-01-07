import { Card } from "antd";
import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const StudentsAttendance = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const options = {
      series: [
        {
          name: "Total Present",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 50, 63, 90],
        },
        {
          name: "Total Absent",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 99, 67, 26],
        },
      ],
      chart: {
        type: "bar",
        height: 300,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
          borderRadius: 2,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 5,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        title: {
          text: "ATTENDANCE",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val + " Students ";
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
    <Card>
      <div id="chart" ref={chartRef} />
    </Card>
  );
};

export default StudentsAttendance;
