import React from "react";
import OverallStatistic from "../components/OverallStatistic";

import WelcomeCalendarSection from "../components/Welcome&CalendarSection";
import StudentsAttendance from "../components/StudentsAttendance";
import { Col, Row } from "antd";
import EstimatedMonth from "../components/EstimatedMonth";
import { useGetDashboardDataQuery } from "../api/dashoboardEndPoints";

const Dashboard: React.FC = () => {
  const { data: dashboardData } = useGetDashboardDataQuery({});

  return (
    <React.Fragment>
      <OverallStatistic dashboardInfo={dashboardData} />
      <br />
      <WelcomeCalendarSection />

      <br />
      <Row gutter={[12, 0]}>
        <Col span={24} lg={16}>
          <StudentsAttendance />
        </Col>
        <Col span={24} lg={8}>
          <EstimatedMonth />
        </Col>
      </Row>

      <br />
      {/* <RestaurantWiseSalesGraph /> */}
    </React.Fragment>
  );
};

export default Dashboard;
