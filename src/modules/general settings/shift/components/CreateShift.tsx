import { Col, Input, Row } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateShiftMutation } from "../api/shiftEndPoints";
import dayjs from "dayjs";

const CreateShift = () => {
  const [create, { isLoading, isSuccess }] = useCreateShiftMutation();

  const onFinish = (values: any): void => {
    create({
      name: values?.name,
      start_time: dayjs(values.start_time, "HH:mm").format("HH:mm:ss"),
      end_time: dayjs(values.end_time, "HH:mm").format("HH:mm:ss"),
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

          <Col lg={6}>
            <Form.Item
              label="Shift Started Time"
              name="start_time"
              rules={[
                { required: true, message: "Shift Started Time is required!" },
              ]}
            >
              <input
                type="time"
                className="border border-gray-300 w-full rounded-lg px-3 py-0.5"
              ></input>
            </Form.Item>
          </Col>

          <Col lg={6}>
            <Form.Item
              label="Shift Ended Time"
              name="end_time"
              rules={[
                { required: true, message: "Shift Ended Time is required!" },
              ]}
            >
              <input
                type="time"
                className="border border-gray-300 w-full rounded-lg px-3 py-0.5"
              ></input>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateShift;
