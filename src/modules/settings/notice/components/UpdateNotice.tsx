import { useEffect } from "react";
import {
  Col,
  Input,
  Row,
  Select,
  Switch,
  DatePicker,
  Form as AntForm,
} from "antd";
import { Form } from "../../../../common/CommonAnt";
import {
  useGetSingleNoticeQuery,
  useUpdateNoticeMutation,
} from "../api/noticeEndPoints";
import dayjs from "dayjs"; // Import dayjs
import {
  NoticeBoardCategory,
  NoticeBoardTargetAudience,
} from "../types/noticeTypes";

const { TextArea } = Input;
const { Option } = Select;

const UpdateNotice = ({ record }: { record: number }) => {
  const { data: singleData } = useGetSingleNoticeQuery(Number(record));
  const [update, { isLoading, isSuccess }] = useUpdateNoticeMutation();
  const [form] = AntForm.useForm(); // Ant Design form instance

  useEffect(() => {
    if (singleData?.data) {
      form.setFieldsValue({
        title: singleData.data.title || "",
        description: singleData.data.description || "",
        category: singleData.data.category || undefined,
        target_audience: singleData.data.target_audience || undefined,
        is_published: singleData.data.is_published || false,
        publish_date: singleData.data.publish_date
          ? dayjs(singleData.data.publish_date)
          : null,
        expiry_date: singleData.data.expiry_date
          ? dayjs(singleData.data.expiry_date)
          : null,
      });
    }
  }, [singleData, form]);

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
    update({ id: record, data: payload });
  };

  return (
    <div>
      <Form
        form={form} // Attach form instance
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
      >
        <Row gutter={[16, 16]}>
          {/* Title */}
          <Col lg={12}>
            <Form.Item label="Title" name="title">
              <Input placeholder="Enter Notice Title" />
            </Form.Item>
          </Col>
          {/* Category */}
          <Col lg={6}>
            <Form.Item label="Category" name="category">
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
            <Form.Item label="Target Audience" name="target_audience">
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
          {/* Description */}
          <Col lg={24}>
            <Form.Item label="Description" name="description">
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
          </Col>
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

export default UpdateNotice;
