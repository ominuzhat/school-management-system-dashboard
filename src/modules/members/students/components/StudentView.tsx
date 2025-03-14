import { Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";

import StudentInformation from "./StudentInformation";
import StudentsAttendance from "./StudentsAttendance";
import StudentClassTestReport from "../../../Dashboard/components/StudentClassTestReport";
import StudentPerformance from "./StudentPerformance";
import { useGetSingleStudentQuery } from "../api/studentEndPoints";
import { useParams } from "react-router-dom";
import StudentFeeReport from "./StudentFeeReport";

const StudentView = () => {
  const { studentId } = useParams();
  const { data } = useGetSingleStudentQuery(Number(studentId));


  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row gutter={[24, 16]}>
          <Col lg={16}>
            <StudentInformation data={data?.data && data?.data} />
            <Row>
              <Col span={24} className="my-2">
                <StudentClassTestReport />
              </Col>
            </Row>
          </Col>
          <Col lg={8}>
            <StudentsAttendance data={data?.data && data?.data} />
            <StudentFeeReport data={data?.data && data?.data} />
            {/* <StudentDueWithCalendar /> */}
            <StudentPerformance />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default StudentView;
