import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Row,
  Select,
  TimePicker,
} from "antd";
import { useGetSubjectsQuery } from "../../subjects/api/subjectsEndPoints";

const TimeTableForm = () => {
  const { data: subjectData } = useGetSubjectsQuery({});

  return (
    <div className="p-4">
      <Form.List name="timetables">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Card
                key={key}
                className="mb-4"
                title={
                  <div className="flex justify-between">
                    <p className="text-sm text-green-600"> Schedule No. {index + 1}</p>

                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      style={{ cursor: "pointer", color: "red" }}
                    />
                  </div>
                }
                bordered={false}
              >
                <Row gutter={[16, 16]} align="middle">
                  {/* Exam Date */}
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Form.Item
                      {...restField}
                      label="Exam Date"
                      name={[name, "exam_date"]}
                      rules={[
                        { required: true, message: "Please select Exam Date!" },
                      ]}
                    >
                      <DatePicker format="YYYY-MM-DD" className="w-full" />
                    </Form.Item>
                  </Col>

                  {/* Start Time */}
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Form.Item
                      {...restField}
                      label="Start Time"
                      name={[name, "start_time"]}
                      rules={[
                        {
                          required: true,
                          message: "Please select Start time!",
                        },
                      ]}
                    >
                      <TimePicker
                        format="h:mm A"
                        use12Hours
                        className="w-full"
                      />
                    </Form.Item>
                  </Col>

                  {/* End Time */}
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Form.Item
                      {...restField}
                      label="End Time"
                      name={[name, "end_time"]}
                      rules={[
                        { required: true, message: "Please select End time!" },
                      ]}
                    >
                      <TimePicker
                        format="h:mm A"
                        use12Hours
                        className="w-full"
                      />
                    </Form.Item>
                  </Col>

                  {/* Select Subject */}
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Form.Item
                      label="Subject"
                      name={[name, "subject"]}
                      {...restField}
                      rules={[
                        { required: true, message: "Please select Subject!" },
                      ]}
                    >
                      <Select placeholder="Select Subject" className="w-full">
                        {subjectData?.data?.results?.map((subject: any) => (
                          <Select.Option key={subject.id} value={subject.id}>
                            {subject?.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* MCQ Marks */}
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Form.Item
                      {...restField}
                      label="MCQ Marks"
                      name={[name, "mcq_marks"]}
                      rules={[{ required: true, message: "Enter MCQ marks!" }]}
                    >
                      <InputNumber
                        min={0}
                        max={100}
                        className="w-full"
                        placeholder="MCQ Marks"
                      />
                    </Form.Item>
                  </Col>

                  {/* Written Marks */}
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Form.Item
                      {...restField}
                      label="Written Marks"
                      name={[name, "written_marks"]}
                      rules={[
                        { required: true, message: "Enter Written marks!" },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        max={100}
                        className="w-full"
                        placeholder="Written Marks"
                      />
                    </Form.Item>
                  </Col>

                  {/* Total Marks */}
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Form.Item
                      {...restField}
                      label="Total Marks"
                      name={[name, "total_marks"]}
                      rules={[
                        { required: true, message: "Enter Total marks!" },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        max={100}
                        className="w-full"
                        placeholder="Total Marks"
                      />
                    </Form.Item>
                  </Col>

                  {/* Passing Marks */}
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <Form.Item
                      {...restField}
                      label="Passing Marks"
                      name={[name, "passing_marks"]}
                      rules={[
                        { required: true, message: "Enter Passing marks!" },
                      ]}
                    >
                      <InputNumber
                        min={0}
                        max={100}
                        className="w-full"
                        placeholder="Passing Marks"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ))}

            {/* Add New Exam Button */}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                className="mt-4"
              >
                Add Exam
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default TimeTableForm;
