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
  const { data, isFetching, isLoading, refetch } = useGetSingleSTeacherQuery(
    Number(teacherId)
  );

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row gutter={[24, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={16}>
            <TeacherInformation data={data?.data && data?.data} />
            <Row>
              <Col span={24} className="my-2">
                <TeacherSubjects
                  data={data?.data && data?.data}
                  isFetching={isFetching}
                  isLoading={isLoading}
                  refetch={refetch}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={8}>
            <TeacherAttendance />
            <TeacherPerformance />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default TeacherView;
