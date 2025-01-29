import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import { useGetPaymentQuery } from "../api/paymentEndPoints";
import usePaymentColumns from "../utils/paymentColumns";
import CreatePayment from "../components/CreatePayment";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const { data: paymentData, isLoading } = useGetPaymentQuery({});

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
                    title: "Add Payment ",
                    content: <CreatePayment />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Payment
            </Button>
          </Col>
        </Row>
      </Card>
      <Card>
        <Table
          loading={isLoading}
          total={paymentData?.data?.results?.length}
          dataSource={paymentData?.data?.results}
          columns={usePaymentColumns()}
        />
      </Card>
    </div>
  );
};

export default PaymentPage;
