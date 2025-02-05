import { Col, Input, Row } from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { useCreateAdditionalFeesMutation } from "../api/additionalFeeEndPoints";
import { ICreateAdditionalFee } from "../type/additionalFeeTypes";

const CreateAdditionalFees = () => {
  const [create, { isLoading, isSuccess }] = useCreateAdditionalFeesMutation();

  const onFinish = (values: ICreateAdditionalFee): void => {
    create(values);
  };

  return (
    <div>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item<ICreateAdditionalFee>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Enter Name" }]}
            >
              <Input placeholder="Enter Name" />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<ICreateAdditionalFee>
              label="Amount"
              name="amount"
              rules={[{ required: true, message: "Enter Amount" }]}
            >
              <Input placeholder="Enter Amount" type="number" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateAdditionalFees;
