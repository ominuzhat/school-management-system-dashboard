import { Col, Input, Row, Select, Switch } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateRuleMutation } from "../api/rulesEndPoints";
import {
  NoticeBoardCategory,
  NoticeBoardTargetAudience,
} from "../../notice/types/noticeTypes";

const { TextArea } = Input;
const { Option } = Select;

const CreateRules = () => {
  const [create, { isLoading, isSuccess }] = useCreateRuleMutation();

  const onFinish = (values: any): void => {
    create(values);
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
          is_active: true,
        }}
      >
        <Row gutter={[16, 16]}>
          {/* Title */}
          <Col lg={8}>
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
                    "Student",
                    "Teacher",
                    "Employee",
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
          {/* Publish Status */}
          <Col lg={2}>
            <Form.Item label="Status" name="is_active" valuePropName="checked">
              <Switch checkedChildren="active" unCheckedChildren="inactive" />
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
        </Row>
      </Form>
    </div>
  );
};

export default CreateRules;
