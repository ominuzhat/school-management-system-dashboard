import { Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";

import StudentInformation from "./StudentInformation";
import StudentsAttendance from "./StudentsAttendance";
import StudentDueWithCalendar from "./StudentDueWithCalendar";
import StudentClassTestReport from "../../../Dashboard/components/StudentClassTestReport";
import StudentPerformance from "./StudentPerformance";

const StudentView = () => {
  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row gutter={[24, 16]}>
          <Col lg={16}>
            <StudentInformation />
            <Row>
              <Col span={24} className="my-2">
                <StudentClassTestReport />
              </Col>
            </Row>
          </Col>
          <Col lg={8} >
            <StudentsAttendance />
            <StudentDueWithCalendar />
            <StudentPerformance />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default StudentView;
