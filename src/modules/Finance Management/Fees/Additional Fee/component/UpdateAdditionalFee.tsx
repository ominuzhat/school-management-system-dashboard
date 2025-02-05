import { Col, Row, Form, Button, Input } from "antd";
import { useEffect } from "react";
import {
  useGetAdditionalSingleFeesQuery,
  useUpdateAdditionalFeesMutation,
} from "../api/additionalFeeEndPoints";
import { ICreateAdditionalFee } from "../type/additionalFeeTypes";

const UpdateAdditionalFee = ({ record }: any) => {
  const [form] = Form.useForm();
  const [update, { isLoading }] = useUpdateAdditionalFeesMutation();
  const { data: singleData } = useGetAdditionalSingleFeesQuery(Number(record));

  useEffect(() => {
    if (singleData?.data) {
      form.setFieldsValue({
        name: singleData?.data?.name,
        amount: singleData?.data?.amount,
      });
    }
  }, [form, singleData]);

  const onFinish = (values: any): void => {
    update({ id: record, data: values });
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item<ICreateAdditionalFee> label="Name" name="name">
              <Input placeholder="Enter Name" />
            </Form.Item>
          </Col>
          <Col lg={8}>
            <Form.Item<ICreateAdditionalFee> label="Amount" name="amount">
              <Input placeholder="Enter Amount" type="number" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Update Additional
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateAdditionalFee;
