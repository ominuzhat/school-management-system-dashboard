import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import { useGetRoutineQuery } from "../api/routineEndPoints";
import { IGetRoutine } from "../type/routineTypes";
import { Link } from "react-router-dom";

const RoutinePages = () => {
  const { data: classList, isLoading } = useGetRoutineQuery({});

  const dataLength =
    (classList?.data as IGetRoutine[] | undefined)?.length ?? 0;
  const dataSource = (classList?.data as IGetRoutine[] | undefined) ?? [];

  return (
    <div className="space-y-5">
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          <Col lg={4} xs={24}>
            <Link to="/routine/create-routine">
              <Button type="primary" icon={<PlusOutlined />} className="w-full">
                Add Routine
              </Button>
            </Link>
          </Col>
        </Row>
      </Card>

      <Table
        loading={isLoading}
        total={dataLength}
        dataSource={dataSource}
        // columns={useClassesColumns()}
      />
    </div>
  );
};

export default RoutinePages;
