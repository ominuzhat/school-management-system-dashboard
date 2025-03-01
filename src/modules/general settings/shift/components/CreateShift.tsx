import { Col, Input, Row, TimePicker } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateShiftMutation } from "../api/shiftEndPoints";

const { RangePicker } = TimePicker;

const CreateShift = () => {
  const [create, { isLoading, isSuccess }] = useCreateShiftMutation();
  const formatDisplay = "h:mm A"; // 12-hour format for display
  const formatSend = "HH:mm"; // 24-hour format to send

  const onFinish = (values: any): void => {
    const startTime = values.time_range?.[0]?.format(formatSend);
    const endTime = values.time_range?.[1]?.format(formatSend);

    // Send the times in 24-hour format
    create({
      name: values?.name,
      start_time: startTime,
      end_time: endTime,
    });
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{
          name: "",
        }}
      >
        <Row gutter={[16, 16]}>
          <Col lg={12}>
            <Form.Item
              label="Shift Name"
              name="name"
              rules={[{ required: true, message: "Shift Name is required!" }]}
            >
              <Input placeholder="Enter Shift Name" />
            </Form.Item>
          </Col>

          <Col lg={12}>
            <Form.Item
              label="Shift Time"
              name="time_range"
              rules={[{ required: true, message: "Shift Time is required!" }]}
            >
              <RangePicker format={formatDisplay} className="w-full" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateShift;
