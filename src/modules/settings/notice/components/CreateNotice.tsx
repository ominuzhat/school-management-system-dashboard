import { Col, Input, Row, Select, Switch, DatePicker } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateNoticeMutation } from "../api/noticeEndPoints";
import dayjs from "dayjs"; // Import dayjs
import {
  NoticeBoardCategory,
  NoticeBoardTargetAudience,
} from "../types/noticeTypes";

const { TextArea } = Input;
const { Option } = Select;

const CreateNotice = () => {
  const [create, { isLoading, isSuccess }] = useCreateNoticeMutation();

  const onFinish = (values: any): void => {
    // Convert dates to "YYYY-MM-DD" format using dayjs
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
    <div>
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
        <Row gutter={[16, 16]}>
          {/* Title */}
          <Col lg={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is required!" }]}
            >
              <Input placeholder="Enter Notice Title" />
            </Form.Item>
          </Col>
          {/* Category */}
          <Col lg={6}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Category is required!" }]}
            >
              <Select placeholder="Select Category">
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
          </Col>
          {/* Target Audience */}
          <Col lg={6}>
            <Form.Item
              label="Target Audience"
              name="target_audience"
              rules={[
                { required: true, message: "Target Audience is required!" },
              ]}
            >
              <Select placeholder="Select Target Audience">
                {(
                  [
                    "Students",
                    "Teachers",
                    "Parents",
                    "All",
                  ] as NoticeBoardTargetAudience[]
                ).map((audience) => (
                  <Option key={audience} value={audience}>
                    {audience}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          {/* Description */}
          <Col lg={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description is required!" }]}
            >
              <TextArea placeholder="Enter Description" rows={4} />
            </Form.Item>
          </Col>
          {/* Publish Date */}
          <Col lg={8}>
            <Form.Item label="Publish Date" name="publish_date">
              <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          {/* Expiry Date */}
          <Col lg={8}>
            <Form.Item label="Expiry Date" name="expiry_date">
              <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
            </Form.Item>
          </Col>{" "}
          {/* Publish Status */}
          <Col lg={8}>
            <Form.Item
              label="Publish Status"
              name="is_published"
              valuePropName="checked"
            >
              <Switch
                checkedChildren="Published"
                unCheckedChildren="Unpublished"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateNotice;
