import { Col, Input, Row, Select, Switch, DatePicker, Card } from "antd";
import { Form } from "../../../../common/CommonAnt";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { useCreateHolidayMutation } from "../api/holidayEndPoints";

const { Option } = Select;

const CreateHoliday = () => {
  const [create, { isLoading, isSuccess }] = useCreateHolidayMutation();

  const onFinish = (values: any): void => {
    const payload = {
      ...values,
      publish_date: values.publish_date
        ? dayjs(values.publish_date).format("YYYY-MM-DD")
        : null,
      expiry_date: values.expiry_date
        ? dayjs(values.expiry_date).format("YYYY-MM-DD")
        : null,
    };
    create(payload);
  };

  return (
    <Card
      title="Create New Holiday"
      bordered={false}
      className="shadow-sm rounded-lg"
    >
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{
          title: "",
          description: "",
          category: undefined,
          target_audience: undefined,
          is_published: false,
          publish_date: null,
          expiry_date: null,
        }}
      >
        <Row gutter={[24, 16]}>
          {/* Title */}
          <Col xs={24} lg={12}>
            <Form.Item
              label={<span className="font-medium">Title</span>}
              name="title"
              rules={[{ required: true, message: "Title is required!" }]}
            >
              <Input
                placeholder="Enter Notice Title"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
          </Col>

          {/* Category */}
          {/* <Col xs={24} lg={6}>
            <Form.Item
              label={<span className="font-medium">Category</span>}
              name="category"
              rules={[{ required: true, message: "Category is required!" }]}
            >
              <Select
                placeholder="Select Category"
                size="large"
                className="rounded-lg"
              >
                {(
                  [
                    "General",
                    "Academic",
                    "Sports",
                    "Events",
                    "Examinations",
                    "Other",
                  ] as NoticeBoardCategory[]
                ).map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col> */}

          {/* Target Audience */}
          <Col xs={24} lg={6}>
            <Form.Item
              label={<span className="font-medium">Target Audience</span>}
              name="target_audience"
              rules={[
                { required: true, message: "Target Audience is required!" },
              ]}
            >
              <Select
                placeholder="Select Target Audience"
                size="large"
                className="rounded-lg"
              >
                {(["Student", "Teacher", "Employee", "All"] as any[]).map(
                  (audience) => (
                    <Option key={audience} value={audience}>
                      {audience}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>

          {/* Rich Text Editor */}
          <Col xs={24}>
            <Form.Item
              label={<span className="font-medium">Description</span>}
              name="description"
              rules={[{ required: true, message: "Description is required!" }]}
            >
              <div
                className="rounded-lg border border-gray-200 overflow-hidden"
                data-color-mode="light"
              >
                <TextArea placeholder="Description" />
              </div>
            </Form.Item>
          </Col>

          {/* Publish Date */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={<span className="font-medium">Publish Date</span>}
              name="publish_date"
            >
              <DatePicker
                format="YYYY-MM-DD"
                style={{ width: "100%" }}
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
          </Col>

          {/* Expiry Date */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={<span className="font-medium">Expiry Date</span>}
              name="expiry_date"
            >
              <DatePicker
                format="YYYY-MM-DD"
                style={{ width: "100%" }}
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
          </Col>

          {/* Publish Status */}
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label={<span className="font-medium">Publish Status</span>}
              name="is_published"
              valuePropName="checked"
            >
              <div className="flex items-center h-full">
                <Switch
                  checkedChildren="Published"
                  unCheckedChildren="Draft"
                  className="bg-gray-300"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Toggle to publish immediately
                </span>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default CreateHoliday;
