import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import CreateClass from "../components/CreateClass";
import { useGetClassesQuery } from "../api/classesEndPoints";
import useClassesColumns from "../utils/ClassesColumns";
import { IClasses } from "../type/classesType";
import { RootState } from "../../../../app/store";

const ClassesPage = () => {
  const dispatch = useDispatch();
  const { page_size, currentPage } = useSelector(
    (state: RootState) => state.filter
  );
  const { data: classList, isLoading } = useGetClassesQuery({
    page_size: page_size,
    page: currentPage,
  });

  const dataLength = (classList?.data as IClasses[] | undefined)?.length ?? 0;

  const dataSource = (classList?.data as IClasses[] | undefined) ?? [];

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
        total={dataLength}
        dataSource={dataSource}
        columns={useClassesColumns()}
      />
    </div>
  );
};

export default ClassesPage;
