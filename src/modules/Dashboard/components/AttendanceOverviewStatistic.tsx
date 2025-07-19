import { Card, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const { Option } = Select;

const AttendanceOverviewStatistic = ({
  chartData,
  filterParams,
  setFilterParams,
}: any) => {
  const attendanceChartRef = useRef<HTMLDivElement>(null);

  const handleChange = (key: string, value: any) => {
    setFilterParams((prev: any) => ({ ...prev, [key]: value }));
  };

  // Initialize Attendance Chart
  useEffect(() => {
    if (!attendanceChartRef.current || !chartData) return;

    // Clean existing chart DOM if any
    attendanceChartRef.current.innerHTML = "";

    const options = {
      series: [
        {
          name: "Present",
          data: chartData.datasets.present || [],
          color: "#4CAF50",
        },
        {
          name: "Absent",
          data: chartData.datasets.absent || [],
          color: "#F44336",
        },
        {
          name: "Late",
          data: chartData.datasets.late || [],
          color: "#FF9800",
        },
        {
          name: "Half Day",
          data: chartData.datasets.half_day || [],
          color: "#2196F3",
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: chartData.labels.map((label: string) => {
          switch (filterParams.filter) {
            case "yearly":
              return `${label}`;
            case "monthly":
              return dayjs()
                .month(Number(label) - 1)
                .format("MMM");
            case "weekly":
            case "daily":
            default:
              return `Day ${label}`;
          }
        }),
        labels: {
          style: {
            colors: "#6B7280",
            fontSize: "12px",
          },
        },
      },

      yaxis: {
        title: {
          text: "Students",
          style: {
            color: "#6B7280",
            fontSize: "12px",
          },
        },
        labels: {
          style: {
            colors: "#6B7280",
            fontSize: "12px",
          },
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val + " Students";
          },
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        fontSize: "14px",
        markers: {
          radius: 12,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
      grid: {
        borderColor: "#F3F4F6",
        strokeDashArray: 4,
      },
    };

    const chart = new ApexCharts(attendanceChartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [chartData]);

  return (
    <div>
      <Card
        title={
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2">
            <p className="text-base font-semibold ">Attendance Overview</p>
            <div className="flex flex-wrap gap-2">
              <Select
                size="small"
                value={filterParams.type}
                onChange={(val) => handleChange("type", val)}
              >
                <Option value="student">Student</Option>
                <Option value="teacher">Teacher</Option>
                <Option value="employee">Employee</Option>
              </Select>

              <Select
                size="small"
                value={filterParams.filter}
                onChange={(val) => handleChange("filter", val)}
              >
                <Option value="daily">Daily</Option>
                <Option value="weekly">Weekly</Option>
                <Option value="monthly">Monthly</Option>
                <Option value="yearly">Yearly</Option>
              </Select>

              {(filterParams.filter === "monthly" ||
                filterParams.filter === "yearly") && (
                <DatePicker
                  size="small"
                  picker="year"
                  value={dayjs(`${filterParams.year}`, "YYYY")}
                  onChange={(date) => handleChange("year", date?.year())}
                />
              )}

              {filterParams.filter === "monthly" && (
                <DatePicker
                  size="small"
                  picker="month"
                  value={dayjs(`${filterParams.month}`, "M")}
                  onChange={(date) => handleChange("month", date?.month() + 1)}
                />
              )}

              {filterParams.filter === "daily" ||
              filterParams.filter === "weekly" ? (
                <DatePicker
                  size="small"
                  value={dayjs()}
                  onChange={(date) =>
                    handleChange("date", date?.format("YYYY-MM-DD"))
                  }
                />
              ) : null}
            </div>
          </div>
        }
      >
        <div ref={attendanceChartRef}> </div>
      </Card>
    </div>
  );
};

export default AttendanceOverviewStatistic;
