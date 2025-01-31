import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import { useGetTuitionFeePaymentQuery } from "../api/tuitionPaymentEndPoints";
import useTuitionFeePaymentColumns from "../utils/tuitionFeePaymentColumns";
import CreateTuitionFeePayment from "../components/CreateTuitionFeePayment";

const TuitionFeePaymentPage = () => {
  const dispatch = useDispatch();
  const { data: paymentData, isLoading } = useGetTuitionFeePaymentQuery({});

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
          loading={isLoading}
          total={paymentData?.data?.results?.length}
          dataSource={paymentData?.data?.results}
          columns={useTuitionFeePaymentColumns()}
        />
      </Card>
    </div>
  );
};

export default TuitionFeePaymentPage;
