import { Card, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { capitalize } from "../../../common/capitalize/Capitalize";
import { useLocation } from "react-router-dom";

const { Option } = Select;

const AttendanceOverviewStatistic = ({
  chartData,
  filterParams,
  setFilterParams,
}: any) => {
  const attendanceChartRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const isRootPath = location.pathname === "/";

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
              return `${dayjs(label).format("YYYY")}`;
            case "monthly":
              return `${dayjs(label).format("MMM YYYY")}`;
            case "weekly":
            case "daily":
            default:
              return `${label}`;
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
          text: `${capitalize(filterParams?.type)}`,
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
  }, [chartData, filterParams.filter, filterParams?.type]);

  return (
    <div>
      <Card
        title={
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2">
            <p className="text-base font-semibold ">Attendance Overview</p>

            {isRootPath && (
              <div className="flex flex-wrap gap-2">
                {/* Type Selector */}
                <Select
                  size="small"
                  value={filterParams.type}
                  onChange={(val) => handleChange("type", val)}
                >
                  <Option value="student">Student</Option>
                  <Option value="teacher">Teacher</Option>
                  <Option value="employee">Employee</Option>
                </Select>

                {/* Filter Selector */}
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

                {/* Year Picker for Monthly or Yearly */}
                {(filterParams.filter === "monthly" ||
                  filterParams.filter === "yearly") && (
                  <DatePicker
                    size="small"
                    picker="year"
                    value={
                      filterParams.year
                        ? dayjs(`${filterParams.year}`, "YYYY")
                        : null
                    }
                    onChange={(date) =>
                      handleChange("year", date ? date.year() : null)
                    }
                  />
                )}

                {/* Month Picker for Monthly */}
                {filterParams.filter === "monthly" && (
                  <DatePicker
                    size="small"
                    picker="month"
                    value={
                      filterParams.month
                        ? dayjs(`${filterParams.month}`, "M")
                        : null
                    }
                    onChange={(date) =>
                      handleChange("month", date ? date.month() + 1 : null)
                    }
                  />
                )}

                {/* Date Picker for Daily or Weekly */}
                {(filterParams.filter === "daily" ||
                  filterParams.filter === "weekly") && (
                  <DatePicker
                    size="small"
                    value={
                      filterParams.date
                        ? dayjs(filterParams.date, "YYYY-MM-DD")
                        : null
                    }
                    onChange={(date) =>
                      handleChange(
                        "date",
                        date ? date.format("YYYY-MM-DD") : null
                      )
                    }
                  />
                )}
              </div>
            )}
          </div>
        }
      >
        <div ref={attendanceChartRef}> </div>
      </Card>
    </div>
  );
};

export default AttendanceOverviewStatistic;
