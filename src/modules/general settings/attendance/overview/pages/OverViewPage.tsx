/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  Progress,
  DatePicker,
  Typography,
  Grid,
  Segmented,
  Space,
  Table,
} from "antd";
import { useState } from "react";
import { useGetOverviewAttendanceReportQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import dayjs from "dayjs";
import AttendanceOverviewStatistic from "../../../../Dashboard/components/AttendanceOverviewStatistic";
import OverallAttendanceStatistic from "../../../../Dashboard/components/OverallAttendanceStatistic";
import { capitalize } from "../../../../../common/capitalize/Capitalize";
import { LoadingOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { useBreakpoint } = Grid;

const OverViewPage = () => {
  const screens = useBreakpoint();
  const [filterParams, setFilterParams] = useState({
    filter: "daily",
    year: dayjs().year(),
    month: dayjs().month() + 1,
    date: undefined,
    start_date: undefined,
    end_date: undefined,
    type: "student",
    details: "1",
  });

  const { data: attendanceData, isLoading } =
    useGetOverviewAttendanceReportQuery(filterParams);

  const { chart_data: chartData, details } = attendanceData?.data || {};

  // --- Table Columns ---
  const columnsData: any = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Text strong>{capitalize(text)}</Text>,
      fixed: screens.md ? false : "left",
      width: 250,
    },
    {
      title: "Present",
      dataIndex: "present",
      key: "present",
      render: (val: number) => <span style={{ color: "#52c41a" }}>{val}</span>,
      responsive: ["xs", "sm", "md", "lg", "xl", "xxl"],
    },
    {
      title: "Absent",
      dataIndex: "absent",
      key: "absent",
      render: (val: number) => <span style={{ color: "#f5222d" }}>{val}</span>,
    },
    {
      title: "Late",
      dataIndex: "late",
      key: "late",
      render: (val: number) => <span style={{ color: "#faad14" }}>{val}</span>,
    },
    {
      title: "Attendance %",
      dataIndex: "attendance_percentage",
      key: "attendance_percentage",
      render: (percent: number) => {
        let status: "exception" | "active" | "normal" | "success" = "normal";
        let strokeColor = "#52c41a";

        if (percent < 40) {
          status = "exception";
          strokeColor = "#f5222d";
        } else if (percent < 60) {
          status = "active";
          strokeColor = "#1890ff";
        } else if (percent < 80) {
          status = "normal";
          strokeColor = "#13c2c2";
        } else {
          status = "success";
          strokeColor = "#52c41a";
        }

        return (
          <Progress
            percent={Number(percent.toFixed(2))}
            status={status}
            size={screens.xs ? "small" : "default"}
            strokeColor={strokeColor}
            strokeWidth={5}
            format={(p) => `${p}%`}
            style={{ minWidth: 80 }}
          />
        );
      },
    },
  ];

  // --- Active color per type ---
  const getActiveColor = () => {
    switch (filterParams?.type) {
      case "student":
        return "#78B9B5";
      case "teacher":
        return "#C562AF";
      case "employee":
        return "#EA5B6F";
      default:
        return "#3498db";
    }
  };

  const handleChange = (key: string, value: any) => {
    setFilterParams((prev: any) => ({ ...prev, [key]: value }));
  };

  const typeOptions = [
    { label: "Students", value: "student" },
    { label: "Teachers", value: "teacher" },
    { label: "Employees", value: "employee" },
  ];

  const filterOptions = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Yearly", value: "yearly" },
  ];

  return (
    <div className="w-full" style={{ padding: screens.xs ? "12px" : "24px" }}>
      {/* Custom Styles */}
      <style>{`
        .custom-segmented .ant-segmented-item-selected {
          background-color: ${getActiveColor()} !important;
          color: white !important;
          border-radius: 6px !important;
        }
        .custom-segmented .ant-segmented-item:hover:not(.ant-segmented-item-selected) {
          background-color: #f0f2f5 !important;
        }
      `}</style>

      {/* Header Section */}
      <Card
        className="filter-card"
        style={{
          marginBottom: 24,
          borderRadius: 12,
          background: "linear-gradient(135deg, #f5f7fa 0%, #e6f7ff 100%)",
          border: "none",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.09)",
        }}
        bodyStyle={{ padding: screens.xs ? "16px" : "24px" }}
      >
        <div
          className="
            flex flex-col md:flex-row md:items-center md:justify-between gap-4
          "
        >
          <Title
            level={3}
            className="!m-0"
            style={{
              color: "#2c3e50",
              fontSize: screens.xs ? "20px" : "24px",
              textAlign: screens.xs ? "center" : "left",
            }}
          >
            📊 Attendance Overview
          </Title>

          <Space
            direction={screens.md ? "horizontal" : "vertical"}
            size="middle"
            className="w-full md:w-auto flex-wrap justify-center"
          >
            <Segmented
              className="custom-segmented"
              options={typeOptions}
              value={filterParams.type}
              onChange={(val) => handleChange("type", val)}
              size={screens.xs ? "small" : "middle"}
              block={screens.xs}
            />
            <Segmented
              className="custom-segmented"
              options={filterOptions}
              value={filterParams.filter}
              onChange={(val) => handleChange("filter", val)}
              size={screens.xs ? "small" : "middle"}
              block={screens.xs}
            />
          </Space>
        </div>

        {/* Filter Pickers */}
        <div
          className="
            mt-4 flex flex-wrap gap-3 items-center 
            justify-start md:justify-end
          "
        >
          {(filterParams.filter === "monthly" ||
            filterParams.filter === "yearly") && (
            <DatePicker
              picker="year"
              value={
                filterParams.year ? dayjs(`${filterParams.year}`, "YYYY") : null
              }
              onChange={(date) =>
                handleChange("year", date ? date.year() : null)
              }
              style={{ width: screens.xs ? "100%" : 140 }}
              size={screens.xs ? "small" : "middle"}
            />
          )}

          {filterParams.filter === "monthly" && (
            <DatePicker
              picker="month"
              value={
                filterParams.month ? dayjs(`${filterParams.month}`, "M") : null
              }
              onChange={(date) =>
                handleChange("month", date ? date.month() + 1 : null)
              }
              style={{ width: screens.xs ? "100%" : 140 }}
              size={screens.xs ? "small" : "middle"}
            />
          )}

          {(filterParams.filter === "daily" ||
            filterParams.filter === "weekly") && (
            <DatePicker
              value={
                filterParams.date
                  ? dayjs(filterParams.date, "YYYY-MM-DD")
                  : null
              }
              onChange={(date) =>
                handleChange("date", date ? date.format("YYYY-MM-DD") : null)
              }
              style={{ width: screens.xs ? "100%" : 140 }}
              size={screens.xs ? "small" : "middle"}
            />
          )}

          <RangePicker
            onChange={(dates) => {
              if (dates && dates[0] && dates[1]) {
                handleChange("start_date", dates[0].format("YYYY-MM-DD"));
                handleChange("end_date", dates[1].format("YYYY-MM-DD"));
              } else {
                handleChange("start_date", null);
                handleChange("end_date", null);
              }
            }}
            style={{ width: screens.xs ? "100%" : 280 }}
            size={screens.xs ? "small" : "middle"}
          />
        </div>
      </Card>

      {/* Statistics */}
      {isLoading ? (
        <div className="text-center py-10">
          <LoadingOutlined style={{ fontSize: 48, color: getActiveColor() }} />
          <Text style={{ display: "block", marginTop: 16 }}>
            Loading attendance data...
          </Text>
        </div>
      ) : (
        <>
          <OverallAttendanceStatistic
            dashboardInfo={attendanceData?.data?.summary}
            loading={isLoading}
            type={filterParams.type}
          />

          <div className="my-6">
            <AttendanceOverviewStatistic
              chartData={chartData}
              filterParams={filterParams}
              setFilterParams={setFilterParams}
              loading={isLoading}
            />
          </div>

          {/* Table */}
          <Card
            title={
              <span style={{ color: "#2c3e50" }}>
                {`${capitalize(filterParams.type)} Attendance Details`}
              </span>
            }
            style={{
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.09)",
            }}
            bodyStyle={{ padding: screens.xs ? 8 : 16 }}
          >
            <Table
              columns={columnsData}
              dataSource={details || []}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: false,
                hideOnSinglePage: true,
              }}
              loading={isLoading}
              scroll={{ x: 600 }}
              size={screens.xs ? "small" : "middle"}
              style={{ borderRadius: 8 }}
            />
          </Card>
        </>
      )}
    </div>
  );
};

export default OverViewPage;
