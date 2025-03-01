import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import { useGetTuitionFeePaymentQuery } from "../api/tuitionPaymentEndPoints";
import useTuitionFeePaymentColumns from "../utils/tuitionFeePaymentColumns";
import CreateTuitionFeePayment from "../components/CreateTuitionFeePayment";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";

const TuitionFeePaymentPage = () => {
  const dispatch = useDispatch();

  const { page_size, page } = useAppSelector(FilterState);

  const {
    data: paymentData,
    isLoading,
    isFetching,
    refetch,
  } = useGetTuitionFeePaymentQuery({
    page_size: page_size,
    page: Number(page) || undefined,
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
                    title: "Add Tuition Fee Payment",
                    content: <CreateTuitionFeePayment />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Tuition Fee Payment
            </Button>
          </Col>
        </Row>
      </Card>
      <Card>
        <Table
          rowKey={"id"}
          loading={isLoading || isFetching}
          refetch={refetch}
          total={paymentData?.data?.count}
          dataSource={paymentData?.data?.results}
          columns={useTuitionFeePaymentColumns()}
        />
      </Card>
    </div>
  );
};

export default TuitionFeePaymentPage;
