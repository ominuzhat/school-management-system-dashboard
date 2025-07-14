import { useRef, useEffect } from "react";
import { Card, Row, Col } from "antd";
import ApexCharts from "apexcharts";
import { useGetDashboardDataQuery } from "../api/dashoboardEndPoints";
import OverallStatistic from "../components/OverallStatistic";
import { Link } from "react-router-dom";

// const { Title } = Typography;

const Dashboard = () => {
  const { data: dashboardData } = useGetDashboardDataQuery({});

  const attendanceChartRef = useRef<HTMLDivElement>(null);
  const performanceChartRef = useRef<HTMLDivElement>(null);
  const feeCollectionChartRef = useRef<HTMLDivElement>(null);

  // Initialize Attendance Chart
  useEffect(() => {
    if (!attendanceChartRef.current) return;

    const options = {
      series: [
        {
          name: "Total Present",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 50, 63, 90],
          color: "#4CAF50",
        },
        {
          name: "Total Absent",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 99, 67, 26],
          color: "#F44336",
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
  }, []);

  // Initialize Performance Chart
  useEffect(() => {
    if (!performanceChartRef.current) return;

    const options = {
      series: [
        {
          name: "Performance",
          data: [85, 72, 86, 81, 84, 86, 94, 60, 62, 76, 71, 66],
        },
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true,
        },
        toolbar: {
          show: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
        colors: ["#3B82F6"],
      },
      markers: {
        size: 5,
        colors: ["#3B82F6"],
        strokeWidth: 0,
        hover: {
          size: 7,
        },
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
        labels: {
          style: {
            colors: "#6B7280",
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        min: 50,
        max: 100,
        labels: {
          style: {
            colors: "#6B7280",
            fontSize: "12px",
          },
        },
        title: {
          text: "Score (%)",
          style: {
            color: "#6B7280",
            fontSize: "12px",
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val + " %";
          },
        },
      },
      grid: {
        borderColor: "#F3F4F6",
        strokeDashArray: 4,
      },
    };

    const chart = new ApexCharts(performanceChartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  // Initialize Fee Collection Chart
  useEffect(() => {
    if (!feeCollectionChartRef.current) return;

    const options = {
      series: [
        {
          name: "Fee Collected",
          data: [
            125000, 135000, 142000, 138000, 147000, 158000, 163000, 149000,
            155000, 167000, 172000, 185000,
          ],
        },
      ],
      chart: {
        type: "area",
        height: 350,
        toolbar: {
          show: true,
        },
      },
      colors: ["#8B5CF6"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
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
        labels: {
          style: {
            colors: "#6B7280",
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          formatter: function (val: number) {
            return "৳" + val / 1000 + "K";
          },
          style: {
            colors: "#6B7280",
            fontSize: "12px",
          },
        },
        title: {
          text: "Amount (BDT)",
          style: {
            color: "#6B7280",
            fontSize: "12px",
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return "৳" + val.toLocaleString();
          },
        },
      },
      grid: {
        borderColor: "#F3F4F6",
        strokeDashArray: 4,
      },
    };

    const chart = new ApexCharts(feeCollectionChartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="p-4">
      <OverallStatistic dashboardInfo={dashboardData} />
      <br />
      {/* === Top Cards === */}
      {/* <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={8}>
          <Card title="Total Students" bordered={false}>
            <Title level={2}>1,245</Title>
            <p className="text-green-500">↑ 12% from last month</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="Attendance Rate" bordered={false}>
            <Title level={2}>89%</Title>
            <p className="text-green-500">↑ 3% from last month</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card title="Fee Collection" bordered={false}>
            <Title level={2}>৳1,850,000</Title>
            <p className="text-green-500">↑ 8% from last month</p>
          </Card>
        </Col>
      </Row> */}

      {/* === Main Charts === */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={12}>
          <Card title="Monthly Attendance" bordered={false}>
            <div ref={attendanceChartRef} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Academic Performance" bordered={false}>
            <div ref={performanceChartRef} />
          </Card>
        </Col>
      </Row>

      {/* Fee Collection Trend & Quick Actions */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} md={16}>
          <Card
            title="Fee Collection Trend"
            bordered={false}
            className="h-full"
            headStyle={{ borderBottom: "1px solid #f0f0f0", padding: "0 16px" }}
            bodyStyle={{ padding: "16px" }}
          >
            <div ref={feeCollectionChartRef} style={{ minHeight: "300px" }} />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            title="Quick Actions"
            bordered={false}
            className="h-full"
            headStyle={{ borderBottom: "1px solid #f0f0f0", padding: "0 16px" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
              <Link
                to="/admission/create-admission"
                className="flex items-center p-4 rounded transition-all hover:shadow-md"
                style={{
                  background:
                    "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                }}
              >
                <div className="text-white">
                  <div className="font-medium">New Admission</div>
                  <div className="text-sm opacity-80">Register new student</div>
                </div>
                <div className="ml-auto text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>

              <Link
                to="/collect-fee"
                className="flex items-center p-4 rounded transition-all hover:shadow-md"
                style={{
                  background:
                    "linear-gradient(135deg, #10B981 0%, #047857 100%)",
                }}
              >
                <div className="text-white">
                  <div className="font-medium">Collect Fee</div>
                  <div className="text-sm opacity-80">Process payments</div>
                </div>
                <div className="ml-auto text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>

              <Link
                to="/collect-attendance"
                className="flex items-center p-4 rounded transition-all hover:shadow-md"
                style={{
                  background:
                    "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
                }}
              >
                <div className="text-white">
                  <div className="font-medium">Attendance</div>
                  <div className="text-sm opacity-80">Mark daily presence</div>
                </div>
                <div className="ml-auto text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>

              <Link
                to="/notice"
                className="flex items-center p-4 rounded transition-all hover:shadow-md"
                style={{
                  background:
                    "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                }}
              >
                <div className="text-white">
                  <div className="font-medium">Notice</div>
                  <div className="text-sm opacity-80">Create announcements</div>
                </div>
                <div className="ml-auto text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>

              <Link
                to="/routine"
                className="flex items-center p-4 rounded transition-all hover:shadow-md"
                style={{
                  background:
                    "linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)",
                }}
              >
                <div className="text-white">
                  <div className="font-medium">Routine</div>
                  <div className="text-sm opacity-80">Manage schedules</div>
                </div>
                <div className="ml-auto text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>

              <Link
                to="/institute-profile"
                className="flex items-center p-4 rounded transition-all hover:shadow-md"
                style={{
                  background:
                    "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
                }}
              >
                <div className="text-white">
                  <div className="font-medium">Institute Profile</div>
                  <div className="text-sm opacity-80">Update settings</div>
                </div>
                <div className="ml-auto text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </Card>
        </Col>
      </Row>

      {/* === New Sections === */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Recent Activities" bordered={false}>
            <div className="space-y-4">
              {/* Single activity item */}
              <div className="flex items-start space-x-3">
                <span className="text-green-500">💰</span>
                <div>
                  <p className="font-medium">নতুন ফি পেমেন্ট</p>
                  <p className="text-gray-500 text-sm">৫ মিনিট আগে</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-blue-500">👨‍🎓</span>
                <div>
                  <p className="font-medium">নতুন ভর্তি</p>
                  <p className="text-gray-500 text-sm">১৫ মিনিট আগে</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-purple-500">📢</span>
                <div>
                  <p className="font-medium">উপস্থিতি নোটিস</p>
                  <p className="text-gray-500 text-sm">৩০ মিনিট আগে</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-pink-500">📊</span>
                <div>
                  <p className="font-medium">পরীক্ষার ফলাফল</p>
                  <p className="text-gray-500 text-sm">১ ঘণ্টা আগে</p>
                </div>
              </div>
            </div>
            <div className="mt-4 text-right">
              <a href="#" className="text-blue-600">
                সব কার্যক্রম দেখুন →
              </a>
            </div>
          </Card>
        </Col>{" "}
        <Col xs={12}>
          <Card title="Recent Notices" bordered={false}>
            <div>
              <p className="font-medium">নতুন বার্তা</p>
              <p className="text-gray-500 text-sm">৫টি নতুন অভিভাবকের বার্তা</p>
              <p className="text-gray-400 text-xs mt-1">১০ মিনিট আগে</p>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-6"></Row>
    </div>
  );
};

export default Dashboard;
