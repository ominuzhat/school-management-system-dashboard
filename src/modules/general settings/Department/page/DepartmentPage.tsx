import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import { useGetDepartmentQuery } from "../api/departmentEndPoints";
import CreateDepartmentModal from "../components/CreateDepartmentModal";
import useDepartmentColumns from "../utils/departmentColumns";
import { IGetDepartment } from "../types/departmentType";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";

const DepartmentPage = () => {
  const dispatch = useDispatch();
  const { page_size, page } = useAppSelector(FilterState);
  const {
    data: departmentData,
    isLoading,
    isFetching,
    refetch,
  } = useGetDepartmentQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength =
    (departmentData?.data as IGetDepartment[] | undefined)?.length ?? 0;

  const dataSource =
    (departmentData?.data as IGetDepartment[] | undefined) ?? [];

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
                    title: "Add Department ",
                    content: <CreateDepartmentModal />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Department
            </Button>
          </Col>
        </Row>
      </Card>
      <Card>
        <Table
          rowKey={"id"}
          loading={isLoading || isFetching}
          refetch={refetch}
          total={dataLength}
          dataSource={dataSource}
          columns={useDepartmentColumns()}
        />
      </Card>
    </div>
  );
};

export default DepartmentPage;
