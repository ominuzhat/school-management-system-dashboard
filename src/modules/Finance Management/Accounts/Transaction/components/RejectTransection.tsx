import { Col, Input, Row } from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { useCreateTransferRejectMutation } from "../api/transactionEndPoints";

const { TextArea } = Input;

const RejectTransection = ({ record }: { record: any }) => {
  const [create, { isLoading, isSuccess }] = useCreateTransferRejectMutation();

  const onFinish = (values: any): void => {
    create({
      id: record,
      data: {
        notes: values.notes,
      },
    });
  };

  return (
    <div>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Row gutter={[16, 16]}>
          {/* Title */}

          <Col lg={24}>
            <Form.Item
              label="Notes"
              name="notes"
              rules={[{ required: true, message: "Notes is required!" }]}
            >
              <TextArea placeholder="Enter Notes" rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default RejectTransection;
