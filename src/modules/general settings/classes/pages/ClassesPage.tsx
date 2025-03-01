import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import CreateClass from "../components/CreateClass";
import { useGetClassesQuery } from "../api/classesEndPoints";
import useClassesColumns from "../utils/ClassesColumns";
import { IClasses } from "../type/classesType";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";

const ClassesPage = () => {
  const dispatch = useDispatch();
  const { page_size, page } = useAppSelector(FilterState);


  
  const {
    data: classList,
    isLoading,
    isFetching,
    refetch,
  } = useGetClassesQuery({
    page_size: page_size,
    page: Number(page) || undefined,
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
        rowKey={"id"}
        loading={isLoading || isFetching}
        refetch={refetch}
        total={dataLength}
        dataSource={dataSource}
        columns={useClassesColumns()}
      />
    </div>
  );
};

export default ClassesPage;
