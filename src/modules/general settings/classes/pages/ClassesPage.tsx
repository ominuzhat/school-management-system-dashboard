import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import CreateClass from "../components/CreateClass";
import { useGetClassesQuery } from "../api/classesEndPoints";
import useClassesColumns from "../utils/ClassesColumns";

const ClassesPage = () => {
  const dispatch = useDispatch();
  const { data: classList, isLoading } = useGetClassesQuery({});
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

      <Table
        loading={isLoading}
        total={classList?.data && classList?.data?.length}
        dataSource={classList?.data && classList?.data}
        columns={useClassesColumns()}
      />
    </div>
  );
};

export default ClassesPage;
