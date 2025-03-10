import { Col, Input, Row, Select, TimePicker } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateSectionMutation } from "../api/sectionEndPoints";
import { ICreateSection } from "../types/sectionTypes";
import { useGetClassesQuery } from "../../classes/api/classesEndPoints";
import { IClasses } from "../../classes/type/classesType";
import moment from "moment";

const { Option } = Select;

const CreateSection = () => {
  const { data: classData } = useGetClassesQuery({});
  const [create, { isLoading, isSuccess }] = useCreateSectionMutation();

  const onFinish = (values: any): void => {
    // Convert moment objects to a desired format (e.g., string) before submitting
    const formattedValues = {
      ...values,
      start_time: values.start_time ? values.start_time.format("h:mm A") : null,
      end_time: values.end_time ? values.end_time.format("h:mm A") : null,
    };
    create(formattedValues);
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        // initialValues={{ is_active: true }}
      >
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item<ICreateSection>
              label="Class"
              name="grade_level"
              rules={[{ required: true, message: "Class" }]}
            >
              <Select className="w-full" placeholder="Select Class" allowClear>
                {Array.isArray(classData?.data) &&
                  classData.data.map((data: IClasses) => (
                    <Option key={data.id} value={data.id}>
                      {data.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item<ICreateSection>
              label="Section Name"
              name="name"
              rules={[{ required: true, message: "Section Name" }]}
            >
              <Input placeholder="Section Name" />
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item<ICreateSection>
              label="Capacity"
              name="capacity"
              rules={[{ required: true, message: "Capacity" }]}
            >
              <Input placeholder="Capacity" type="number" />
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item<ICreateSection>
              label="Start Time"
              name="start_time"
              rules={[{ required: true, message: "Start Time" }]}
            >
              <TimePicker
                use12Hours
                format="h:mm A"
                placeholder="Select Start Time"
                showNow={false}
                minuteStep={5} // Optional: Adjust minute steps
                popupClassName="time-picker-popup" // Optional: Customize the popup style
              />
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item<ICreateSection>
              label="End Time"
              name="end_time"
              rules={[{ required: true, message: "End Time" }]}
            >
              <TimePicker
                use12Hours
                format="h:mm A"
                placeholder="Select End Time"
                showNow={false}
                minuteStep={5} // Optional: Adjust minute steps
                popupClassName="time-picker-popup" // Optional: Customize the popup style
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateSection;