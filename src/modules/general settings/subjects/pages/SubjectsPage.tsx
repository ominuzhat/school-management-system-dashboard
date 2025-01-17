import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import CreateSubjects from "../components/CreateSubjects";
import { useGetSubjectsQuery } from "../api/subjectsEndPoints";
import useSubjectColumns from "../utils/SubjectsColumns";

const SubjectsPage = () => {
  const dispatch = useDispatch();
  const { data: getSubjectsData, isLoading } = useGetSubjectsQuery({});
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
                    title: "Add Subjects",
                    content: <CreateSubjects />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Subjects
            </Button>
          </Col>
        </Row>
      </Card>
      <Card>
        <Table
          loading={isLoading}
          total={getSubjectsData?.data?.length}
          dataSource={getSubjectsData?.data}
          columns={useSubjectColumns()}
        />
      </Card>
    </div>
  );
};

export default SubjectsPage;
