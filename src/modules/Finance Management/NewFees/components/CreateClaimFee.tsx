import { useCreateClaimFeesMutation } from "../../Fees/Collect Fee/api/collectFeeEndPoints";
import { Col, Row, Select, Button, DatePicker, Form, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetAdmissionSessionQuery } from "../../../general settings/admission session/api/admissionSessionEndPoints";
import { useGetClassesQuery } from "../../../general settings/classes/api/classesEndPoints";
import { useGetShiftQuery } from "../../../general settings/shift/api/shiftEndPoints";
import { useGetSectionQuery } from "../../../general settings/Section/api/sectionEndPoints";
import dayjs from "dayjs";

const { Option } = Select;

const CreateClaimFee = () => {
  const { data: sessionData } = useGetAdmissionSessionQuery({});
  const { data: classData } = useGetClassesQuery({});
  const { data: shiftData } = useGetShiftQuery({});
  const { data: sectionData } = useGetSectionQuery({});
  const [create] = useCreateClaimFeesMutation();

  const onFinish = (values: any): void => {
    const formattedMonths = values.months?.map((month: dayjs.Dayjs) =>
      dayjs(month).startOf("month").format("YYYY-MM-01")
    ) || [dayjs().startOf("month").format("YYYY-MM-01")];

    const formattedData = {
      ...values,
      months: formattedMonths,
      session: values.session,
      grade_level: values.grade_level,
      section: values.section,
      shift: values.shift,
    };

    create(formattedData);
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          months: [dayjs()], // Initialize with current month
        }}
      >
        <Row gutter={[16, 16]}>
          {/* Months Field - Dynamic list */}
          <Col span={24}>
            <Form.List name="months">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name]}
                        rules={[
                          { required: true, message: "Month is required" },
                        ]}
                      >
                        <DatePicker
                          picker="month"
                          format="YYYY-MM"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Month
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>

          {/* Session */}
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Session"
              name="session"
              rules={[{ required: true, message: "Session is required!" }]}
            >
              <Select placeholder="Select Session" allowClear showSearch>
                {Array.isArray(sessionData?.data) &&
                  sessionData?.data?.map((data: any) => (
                    <Option key={data.id} value={data.id}>
                      {data?.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Class (Grade Level) */}
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item label="Class" name="grade_level">
              <Select placeholder="Select Class" allowClear>
                {Array.isArray(classData?.data) &&
                  classData?.data?.map((data: any) => (
                    <Option key={data.id} value={data.id}>
                      {data.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Shift */}
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item label="Shift" name="shift">
              <Select placeholder="Select shift" allowClear>
                {Array.isArray(shiftData?.data) &&
                  shiftData?.data?.map((shift: any) => (
                    <Option key={shift.id} value={shift.id}>
                      {shift.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Section */}
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item label="Section" name="section">
              <Select placeholder="Select Section" allowClear>
                {Array.isArray(sectionData?.data) &&
                  sectionData?.data?.map((shift: any) => (
                    <Option key={shift.id} value={shift.id}>
                      {shift.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateClaimFee;
