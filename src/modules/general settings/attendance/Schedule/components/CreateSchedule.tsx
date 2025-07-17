import { Col, Input, Row, Switch } from "antd";

import dayjs from "dayjs";
import { useCreateScheduleMutation } from "../api/scheduleEndPoints";
import { Form } from "../../../../../common/CommonAnt";

const CreateSchedule = () => {
  const [create, { isLoading, isSuccess }] = useCreateScheduleMutation();

  const onFinish = (values: any): void => {
    const formattedValues = {
      ...values,
      start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
      ...(values.end_date && {
        end_date: dayjs(values.end_date).format("YYYY-MM-DD"),
      }),
    };
    create(formattedValues);
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{
          name: "",
          flexible: 10,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col lg={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name is required!" }]}
            >
              <Input placeholder="Enter Name" />
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
          <Col lg={12}>
            <Form.Item label="Time In Flexibility (In Minutes)" name="flexible">
              <Input placeholder="Enter Time In Flexibility (In Minutes)" type="number" />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item label="Status" name="is_active" valuePropName="checked">
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateSchedule;
