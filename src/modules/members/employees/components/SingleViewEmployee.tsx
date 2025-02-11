import { useParams } from "react-router-dom";
import { useGetSingleEmployeeQuery } from "../api/employeeEndPoints";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { Card, Row, Col } from "antd";
import EmployeeInformation from "./EmployeeInformation";
import EmployeeAttendance from "./EmployeeAttendance";
import EmployeePerformance from "./EmployeePerformance";

const SingleViewEmployee = () => {
  const { employeeId } = useParams();
  const { data: singleEmployee } = useGetSingleEmployeeQuery(
    Number(employeeId)
  );
  const employee = singleEmployee?.data;

  return (
    <div className="container">
      <div className="my-5">
        <BreadCrumb />
      </div>

      <Card>
        <Row gutter={[24, 16]}>
          <Col lg={16}>
            <EmployeeInformation data={employee && employee} />
            <Row>
              <Col span={24} className="my-2">
                {/* more details */}
              </Col>
            </Row>
          </Col>
          <Col lg={8}>
            <EmployeeAttendance />
            <EmployeePerformance />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SingleViewEmployee;
