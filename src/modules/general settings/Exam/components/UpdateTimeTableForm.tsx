import { useEffect } from "react";
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
} from "antd";
import { useGetSubjectsQuery } from "../../subjects/api/subjectsEndPoints";
import { useGetProfileQuery } from "../../../Profile/api/profileEndpoint";

const UpdateTimeTableForm = ({
  selectedTab,
  formData,
  setFormData,
}: {
  selectedTab: string;
  formData: any;
  setFormData: (data: any) => void;
}) => {
  const { data: subjectData } = useGetSubjectsQuery({
    grade_level: selectedTab,
  });

  const [form] = Form.useForm();
  const { data } = useGetProfileQuery();

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  const onValuesChange = (_changedValues: any, allValues: any) => {
    setFormData(allValues);
  };

  return (
    <div className="p-4">
      <Form
        form={form}
        name="timetable-form"
        onValuesChange={onValuesChange}
        initialValues={formData}
        autoComplete="off"
      >
        <Form.List name="timetables">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => {
                const currentTimetables =
                  form.getFieldValue("timetables") || [];
                const currentSubject = form.getFieldValue([
                  "timetables",
                  name,
                  "subject",
                ]);

                return (
                  <Card
                    key={key}
                    className="mb-4"
                    title={
                      <div className="flex justify-between">
                        <p className="text-sm text-green-600">
                          Schedule No. {name + 1}
                        </p>
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
                        >
                          <DatePicker format="YYYY-MM-DD" className="w-full" />
                        </Form.Item>
                      </Col>

                      {/* Select Subject */}
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <Form.Item
                          label="Subject"
                          name={[name, "subject"]}
                          rules={[
                            {
                              validator: (_, value) =>
                                value
                                  ? Promise.resolve()
                                  : Promise.reject("Please select Subject!"),
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select Subject"
                            className="w-full"
                            showSearch
                            optionFilterProp="children"
                          >
                            {subjectData?.data?.results
                              ?.filter(
                                (subject: any) =>
                                  !currentTimetables.some(
                                    (t: any, i: number) =>
                                      i !== name && t?.subject === subject?.id
                                  ) || subject?.id === currentSubject
                              )
                              ?.map((subject: any) => (
                                <Select.Option
                                  key={subject.id}
                                  value={subject.id}
                                >
                                  {subject.name}
                                </Select.Option>
                              ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      {/* Start Time */}
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <Form.Item
                          {...restField}
                          label="Start Time"
                          name={[name, "start_time"]}
                        >
                          <input
                            type="time"
                            className="border border-gray-300 w-full rounded-lg px-3 py-0.5"
                          />
                        </Form.Item>
                      </Col>

                      {/* End Time */}
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <Form.Item
                          {...restField}
                          label="End Time"
                          name={[name, "end_time"]}
                        >
                          <input
                            type="time"
                            className="border border-gray-300 w-full rounded-lg px-3 py-0.5"
                          />
                        </Form.Item>
                      </Col>

                      {/* MCQ Marks */}
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <Form.Item
                          {...restField}
                          label="MCQ Marks"
                          name={[name, "mcq_marks"]}
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
                        >
                          <InputNumber
                            min={0}
                            max={100}
                            className="w-full"
                            placeholder="Written Marks"
                          />
                        </Form.Item>
                      </Col>

                      {/* Contribution Marks (%)*/}
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <Form.Item
                          {...restField}
                          label="Contribution Marks (%)"
                          name={[name, "contribution_marks"]}
                        >
                          <InputNumber
                            min={0}
                            max={100}
                            className="w-full"
                            placeholder="Contribution Marks (%)"
                          />
                        </Form.Item>
                      </Col>
                      {/* exam_mark_exp_date */}
                      {data?.data?.role?.name === "Admin" && (
                        <Col xs={24} sm={12} md={8} lg={6}>
                          <Form.Item
                            {...restField}
                            label="Exam Mark Expire Date"
                            name={[name, "exam_mark_exp_date"]}
                          >
                            <DatePicker
                              format="YYYY-MM-DD"
                              className="w-full"
                            />
                          </Form.Item>
                        </Col>
                      )}
                    </Row>
                  </Card>
                );
              })}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add({
                      subject: undefined,
                      exam_date: undefined,
                      start_time: "",
                      end_time: "",
                      mcq_marks: 0,
                      written_marks: 0,
                      contribution_marks: 0,
                      total_marks: 0,
                    });
                  }}
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
      </Form>
    </div>
  );
};

export default UpdateTimeTableForm;
