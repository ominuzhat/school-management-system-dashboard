import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import CreateSubjects from "../components/CreateSubjects";
import { useGetSubjectsQuery } from "../api/subjectsEndPoints";
import useSubjectColumns from "../utils/SubjectsColumns";
import { RootState } from "../../../../app/store";

const SubjectsPage = () => {
  const dispatch = useDispatch();

  const { page_size, currentPage } = useSelector(
    (state: RootState) => state.filter
  );
  const { data: getSubjectsData, isLoading } = useGetSubjectsQuery({
    page_size: page_size,
    page: currentPage,
  });
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
          total={getSubjectsData?.data?.results?.length}
          dataSource={getSubjectsData?.data?.results}
          columns={useSubjectColumns()}
        />
      </Card>
    </div>
  );
};

export default SubjectsPage;
