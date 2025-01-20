/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import { useGetSingleFeesQuery } from "../api/feesEndpoints";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import { Badge, Col, Row, Table } from "antd";
import useClassesColumns from "../utils/ClassesColumns";
import useStudentsColumns from "../utils/StudentsColumns";
import useSubjectsColumns from "../utils/SubjectsColumns";
import useSingleFeesColumns from "../utils/FessColumns";

const FeesView = () => {
  const { feesId } = useParams();
  const { data, isLoading } = useGetSingleFeesQuery(Number(feesId));

  const { fee_type, grade_level, student, subject, fees } = data?.data || {};

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <h1 className="my-5">
        <span className="font-semibold">Fees Type :</span> {fee_type}
      </h1>

      <Row gutter={[16, 16]}>
        {grade_level && grade_level.length > 0 && (
          <Col lg={grade_level && grade_level.length > 10 ? 24 : 12}>
            <Badge.Ribbon text="Class" placement="start">
              <Table
                loading={isLoading}
                pagination={false}
                dataSource={grade_level}
                columns={useClassesColumns()}
              />
            </Badge.Ribbon>
          </Col>
        )}

        {student && student.length > 0 && (
          <Col lg={student && student.length > 10 ? 24 : 12}>
            <Badge.Ribbon text="Students" placement="start">
              <Table
                loading={isLoading}
                pagination={false}
                dataSource={student}
                columns={useStudentsColumns()}
              />
            </Badge.Ribbon>
          </Col>
        )}

        {subject && subject.length > 0 && subject.length > 0 && (
          <Col lg={subject && subject.length > 10 ? 24 : 12}>
            <Badge.Ribbon text="Subjects" placement="start">
              <Table
                loading={isLoading}
                pagination={false}
                dataSource={student}
                columns={useSubjectsColumns()}
              />
            </Badge.Ribbon>
          </Col>
        )}

        {fees && fees.length > 0 && (
          <Col lg={fees && fees.length > 10 ? 24 : 12}>
            <Badge.Ribbon text="Fees" placement="start">
              <Table
                loading={isLoading}
                pagination={false}
                dataSource={fees}
                columns={useSingleFeesColumns()}
              />
            </Badge.Ribbon>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default FeesView;
