import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import { useDispatch } from "react-redux";
import { showModal } from "../../../../../app/features/modalSlice";
import CreateFees from "../components/CreateFees";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../../common/CommonAnt";
import { useGetFeesQuery } from "../api/feesEndpoints";
import useFeesColumns from "../utils/FeesColumns";
import { useAppSelector } from "../../../../../app/store";
import { FilterState } from "../../../../../app/features/filterSlice";

const FeesPage = () => {
  const dispatch = useDispatch();

  const { page_size, page } = useAppSelector(FilterState);

  const {
    data: feesList,
    isLoading,
    isFetching,
    refetch,
  } = useGetFeesQuery({ page_size: page_size, page: Number(page) || undefined });

  const dataLength = (feesList?.data as any[] | undefined)?.length ?? 0;

  const dataSource = (feesList?.data as any[] | undefined) ?? [];

  return (
    <div>
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
                    title: "Add Fees",
                    content: <CreateFees />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Fees
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
        columns={useFeesColumns()}
      />
    </div>
  );
};

export default FeesPage;
