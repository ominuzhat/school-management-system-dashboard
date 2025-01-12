import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import classesColumns from "../utils/ClassesColumns";
import CreateClass from "../components/CreateClass";

const ClassesPage = () => {
  const dispatch = useDispatch();
  return (
    <div className="space-y-5">
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          <Col lg={4} xs={24}>
            <Button
              type="primary"
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Add Class",
                    content: <CreateClass />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Class
            </Button>
          </Col>
        </Row>
      </Card>
      <Card>
        <Table
          loading={true}
          total={0}
          dataSource={[]}
          columns={classesColumns()}
        />
      </Card>
    </div>
  );
};

export default ClassesPage;
