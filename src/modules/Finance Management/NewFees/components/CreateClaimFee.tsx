import { useCreateClaimFeesMutation } from "../../Fees/Collect Fee/api/collectFeeEndPoints";
import {
  Col,
  Row,
  Select,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Card,
  Typography,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetAdmissionSessionQuery } from "../../../general settings/admission session/api/admissionSessionEndPoints";
import { useGetClassesQuery } from "../../../general settings/classes/api/classesEndPoints";
import { useGetShiftQuery } from "../../../general settings/shift/api/shiftEndPoints";
import { useGetSectionQuery } from "../../../general settings/Section/api/sectionEndPoints";
import dayjs from "dayjs";
import { getMonthName } from "../../../../common/components/TextView";

const { Option } = Select;
const { Text } = Typography;

const CreateClaimFee = () => {
  const { data: sessionData } = useGetAdmissionSessionQuery({});
  const { data: classData } = useGetClassesQuery({});
  const { data: shiftData } = useGetShiftQuery({});
  const { data: sectionData } = useGetSectionQuery({});
  const [create] = useCreateClaimFeesMutation();
  const [form] = Form.useForm();

  const onFinish = (values: any): void => {
    const formattedMonths = values.months.map((monthObj: any) => {
      const monthDate = dayjs(monthObj.month)
        .startOf("month")
        .format("YYYY-MM-DD");
      return {
        month: monthDate,
        add_ons: monthObj.add_ons || [],
      };
    });

    const formattedData = {
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
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          months: [{ month: dayjs(), add_ons: [] }],
        }}
      >
        <Card>
          <Form.List name="months">
            {(fields, { add, remove }) => {
              // Define soft color palette
              const bgColors = [
                "bg-blue-50",
                "bg-green-50",
                "bg-yellow-50",
                "bg-purple-50",
                "bg-pink-50",
                "bg-indigo-50",
              ];

              return (
                <div className="space-y-3">
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Form.Item
                      shouldUpdate={(prevValues, curValues) =>
                        prevValues.months?.[name]?.month !==
                        curValues.months?.[name]?.month
                      }
                      noStyle
                      key={key}
                    >
                      {({ getFieldValue }) => {
                        const monthValue = getFieldValue([
                          "months",
                          name,
                          "month",
                        ]);
                        const bgColor = bgColors[index % bgColors.length];

                        return (
                          <div className={`border rounded p-3 ${bgColor}`}>
                            <div className="flex justify-between items-center mb-2">
                              <Text strong>{getMonthName(monthValue)}</Text>
                              <button
                                type="button"
                                onClick={() => remove(name)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <MinusCircleOutlined />
                              </button>
                            </div>

                            <Form.Item
                              {...restField}
                              name={[name, "month"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Month is required",
                                },
                              ]}
                              className="mb-3"
                            >
                              <DatePicker
                                picker="month"
                                format="MMMM YYYY"
                                style={{ width: 200 }}
                              />
                            </Form.Item>

                            {/* Add-ons for each month */}
                            <Form.List name={[name, "add_ons"]}>
                              {(
                                addOnFields,
                                { add: addAddOn, remove: removeAddOn }
                              ) => (
                                <div className="space-y-2">
                                  {addOnFields.map(
                                    ({
                                      key: addOnKey,
                                      name: addOnName,
                                      ...addOnRestField
                                    }) => (
                                      <Row
                                        key={addOnKey}
                                        className="flex items-center gap-2 bg-white bg-opacity-70 p-2 rounded"
                                      >
                                        <Col lg={10}>
                                          <Form.Item
                                            {...addOnRestField}
                                            name={[addOnName, "name"]}
                                            rules={[
                                              {
                                                required: true,
                                                message:
                                                  "Add-on name is required",
                                              },
                                            ]}
                                            className="mb-0"
                                          >
                                            <Input placeholder="Fee name" />
                                          </Form.Item>
                                        </Col>
                                        <Col lg={10}>
                                          <Form.Item
                                            {...addOnRestField}
                                            name={[addOnName, "amount"]}
                                            rules={[
                                              {
                                                required: true,
                                                message: "Amount is required",
                                              },
                                            ]}
                                            className="mb-0"
                                          >
                                            <InputNumber
                                              placeholder="Amount"
                                              className="w-full"
                                            />
                                          </Form.Item>
                                        </Col>
                                        <button
                                          type="button"
                                          onClick={() => removeAddOn(addOnName)}
                                          className="text-red-500 hover:text-red-700"
                                        >
                                          <MinusCircleOutlined />
                                        </button>
                                      </Row>
                                    )
                                  )}
                                  <Button
                                    type="dashed"
                                    onClick={() => addAddOn()}
                                    icon={<PlusOutlined />}
                                    className="text-xs"
                                  >
                                    Add Fee Item
                                  </Button>
                                </div>
                              )}
                            </Form.List>
                          </div>
                        );
                      }}
                    </Form.Item>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add({ month: dayjs(), add_ons: [] })}
                    icon={<PlusOutlined />}
                  >
                    Add Month
                  </Button>
                </div>
              );
            }}
          </Form.List>
        </Card>

        <Card className="mt-3">
          <Row gutter={16}>
            {/* Session */}
            <Col xs={24} sm={12}>
              <Form.Item
                label="Session"
                name="session"
                rules={[{ required: true, message: "Session is required!" }]}
              >
                <Select
                  placeholder="Select Session"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                >
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
            <Col xs={24} sm={12}>
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
            <Col xs={24} sm={12}>
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
            <Col xs={24} sm={12}>
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
          </Row>
        </Card>

        <Form.Item className="mt-4">
          <Button
            htmlType="submit"
            type="primary"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Submit Claim
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateClaimFee;
