import { Col, Input, Row, Select, Switch, Form as AntForm } from "antd";
import { Form } from "../../../../common/CommonAnt";
import {
  useGetSingleRuleQuery,
  useUpdateRuleMutation,
} from "../api/rulesEndPoints";
import {
  NoticeBoardCategory,
  NoticeBoardTargetAudience,
} from "../../notice/types/noticeTypes";
import { useEffect } from "react";

const { TextArea } = Input;
const { Option } = Select;

const UpdateRules = ({ record }: any) => {
  const { data: singleData } = useGetSingleRuleQuery(Number(record));
  const [update, { isLoading, isSuccess }] = useUpdateRuleMutation();
  const [form] = AntForm.useForm();

  console.log(singleData);

  useEffect(() => {
    if (singleData?.data) {
      form.setFieldsValue({
        title: singleData.data.title || "",
        description: singleData.data.description || "",
        category: singleData.data.category || undefined,
        target_audience: singleData.data.target_audience || undefined,
        is_active: singleData.data.is_published || false,
      });
    }
  }, [singleData, form]);

  const onFinish = (values: any): void => {
    update({ id: record, data: values });
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        form={form}
      >
        <Row gutter={[16, 16]}>
          {/* Title */}
          <Col lg={8}>
            <Form.Item
              label="Title"
              name="title"
            >
              <Input placeholder="Enter Notice Title" />
            </Form.Item>
          </Col>
          {/* Category */}
          <Col lg={6}>
            <Form.Item
              label="Category"
              name="category"
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
            >
              <TextArea placeholder="Enter Description" rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UpdateRules;
