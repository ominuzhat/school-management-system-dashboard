import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";
import { useGetLeaveQuery } from "../api/leaveEndPoints";
import { IGetLeave } from "../types/leaveTypes";
import CreateLeave from "../components/CreateLeave";
import useLeaveColumns from "../utils/LeaveColumns";

const LeavePage = () => {
  const dispatch = useDispatch();
  const { page_size, page } = useAppSelector(FilterState);

  const {
    data: classList,
    isLoading,
    isFetching,
    refetch,
  } = useGetLeaveQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength = (classList?.data as IGetLeave[] | undefined)?.length ?? 0;

  const dataSource = (classList?.data as IGetLeave[] | undefined) ?? [];

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
                    title: "Add Leave",
                    content: <CreateLeave />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Leave
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
        columns={useLeaveColumns()}
      />
    </div>
  );
};

export default LeavePage;
