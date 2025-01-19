import { Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";


import { useParams } from "react-router-dom";
import { useGetSingleSTeacherQuery } from "../api/teachersEndPoints";
import TeacherInformation from "./TeacherInformation";
import TeacherAttendance from "./TeacherAttendance";
import TeacherPerformance from "./TeacherPerformance";
import TeacherSubjects from "./TeacherSubjects";

const TeacherView = () => {
  const { teacherId } = useParams();
  const { data } = useGetSingleSTeacherQuery(Number(teacherId));

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row gutter={[24, 16]}>
          <Col lg={16}>
            <TeacherInformation data={data?.data && data?.data} />
            <Row>
              <Col span={24} className="my-2">
                <TeacherSubjects data={data?.data && data?.data}/>
              </Col>
            </Row>
          </Col>
          <Col lg={8}>
            <TeacherAttendance />
            <TeacherPerformance />
            {/* <StudentsAttendance />
            <StudentDueWithCalendar />
            <StudentPerformance /> */}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default TeacherView;
