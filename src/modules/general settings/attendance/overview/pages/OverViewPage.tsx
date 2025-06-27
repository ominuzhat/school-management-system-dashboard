/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Table, Progress, DatePicker, Segmented, Typography } from "antd";
import { UserOutlined, TeamOutlined, BookOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const OverViewPage = () => {
  type UserType = "students" | "teachers" | "employees";
  const [userType, setUserType] = useState<UserType>("students");

  const attendanceData: Record<
    UserType,
    {
      total: number;
      present: number;
      absent: number;
      late: number;
      records: {
        id: number;
        name: string;
        present: number;
        absent: number;
        late: number;
        percentage: number;
      }[];
    }
  > = {
    students: {
      total: 245,
      present: 210,
      absent: 35,
      late: 12,
      records: [
        {
          id: 1,
          name: "John Doe",
          present: 18,
          absent: 2,
          late: 1,
          percentage: 90,
        },
        {
          id: 2,
          name: "Jane Smith",
          present: 19,
          absent: 1,
          late: 0,
          percentage: 95,
        },
      ],
    },
    teachers: {
      total: 32,
      present: 30,
      absent: 2,
      late: 0,
      records: [
        {
          id: 1,
          name: "Dr. Williams",
          present: 20,
          absent: 0,
          late: 0,
          percentage: 100,
        },
      ],
    },
    employees: {
      total: 48,
      present: 45,
      absent: 3,
      late: 5,
      records: [
        {
          id: 1,
          name: "Robert Johnson",
          present: 19,
          absent: 1,
          late: 2,
          percentage: 95,
        },
      ],
    },
  };

  const currentData = attendanceData[userType];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Present",
      dataIndex: "present",
      key: "present",
    },
    {
      title: "Absent",
      dataIndex: "absent",
      key: "absent",
    },
    {
      title: "Late",
      dataIndex: "late",
      key: "late",
    },
    {
      title: "Attendance %",
      dataIndex: "percentage",
      key: "percentage",
      render: (percent: any) => (
        <Progress
          percent={percent}
          size="small"
          status={percent < 80 ? "exception" : "normal"}
        />
      ),
    },
  ];

  // Custom styles for segmented control
  const segmentedStyle = {
    background: "#ffffff",
    padding: "4px",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  };

  const getActiveColor = () => {
    switch (userType) {
      case "students":
        return "#3498db";
      case "teachers":
        return "#e74c3c";
      case "employees":
        return "#2ecc71";
      default:
        return "#3498db";
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      {/* Custom styles for active segmented item */}
      <style>{`
        .custom-segmented .ant-segmented-item-selected {
          background-color: ${getActiveColor()} !important;
          color: white !important;
          border-radius: 6px !important;
          transition: all 0.3s ease;
        }
        .custom-segmented .ant-segmented-item:hover:not(.ant-segmented-item-selected) {
          background-color: #f0f2f5 !important;
        }
      `}</style>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          padding: "16px 24px",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title
          level={2}
          style={{
            color: "#2c3e50",
            margin: 0,
            textShadow: "1px 1px 2px rgba(255,255,255,0.5)",
          }}
        >
          Attendance Overview
        </Title>

        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Segmented
            options={[
              {
                label: (
                  <div style={{ padding: "0 8px" }}>
                    <TeamOutlined
                      style={{ color: "#3498db", marginRight: 8 }}
                    />
                    Students
                  </div>
                ),
                value: "students",
              },
              {
                label: (
                  <div style={{ padding: "0 8px" }}>
                    <UserOutlined
                      style={{ color: "#e74c3c", marginRight: 8 }}
                    />
                    Teachers
                  </div>
                ),
                value: "teachers",
              },
              {
                label: (
                  <div style={{ padding: "0 8px" }}>
                    <BookOutlined
                      style={{ color: "#2ecc71", marginRight: 8 }}
                    />
                    Employees
                  </div>
                ),
                value: "employees",
              },
            ]}
            value={userType}
            onChange={setUserType}
            style={segmentedStyle}
            className="custom-segmented"
          />

          <RangePicker
            onChange={(dates) => console.log(dates)}
            style={{
              width: "250px",
              border: "1px solid #dfe6e9",
              borderRadius: "8px",
              padding: "8px 12px",
              background: "#fff",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {/* Total Card - Blue Theme */}
        <Card
          style={{
            background: "#f0f9ff",
            borderColor: "#bae0ff",
          }}
        >
          <Text type="secondary">Total {userType}</Text>
          <Title level={3} style={{ color: "#1677ff" }}>
            {currentData.total}
          </Title>
        </Card>

        {/* Present Card - Green Theme */}
        <Card
          style={{
            background: "#f6ffed",
            borderColor: "#b7eb8f",
          }}
        >
          <Text type="secondary">Present</Text>
          <Title level={3} style={{ color: "#52c41a" }}>
            {currentData.present}
          </Title>
        </Card>

        {/* Absent Card - Red Theme */}
        <Card
          style={{
            background: "#fff2f0",
            borderColor: "#ffccc7",
          }}
        >
          <Text type="secondary">Absent</Text>
          <Title level={3} style={{ color: "#f5222d" }}>
            {currentData.absent}
          </Title>
        </Card>

        {/* Late Card - Gold Theme */}
        <Card
          style={{
            background: "#fffbe6",
            borderColor: "#ffe58f",
          }}
        >
          <Text type="secondary">Late Arrivals</Text>
          <Title level={3} style={{ color: "#faad14" }}>
            {currentData.late}
          </Title>
        </Card>
      </div>

      <Card
        title={`${
          userType.charAt(0).toUpperCase() + userType.slice(1)
        } Attendance Details`}
      >
        <Table
          columns={columns}
          dataSource={currentData.records}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <div
        style={{
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        <Card title="Attendance Trend">
          <div
            style={{
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text type="secondary">
              Attendance trend chart would appear here
            </Text>
          </div>
        </Card>
        <Card title="Attendance by Department/Class">
          <div
            style={{
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text type="secondary">
              Department/Class breakdown chart would appear here
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OverViewPage;
