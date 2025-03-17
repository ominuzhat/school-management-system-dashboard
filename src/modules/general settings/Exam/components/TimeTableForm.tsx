import React, { useEffect } from "react";
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

const TimeTableForm = ({
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
      >
        <Form.List name="timetables">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => {
                const selectedSubjects =
                  form
                    .getFieldValue("timetables")
                    ?.map((timetable: any) => timetable?.subject) || [];

                return (
                  <Card
                    key={key}
                    className="mb-4"
                    title={
                      <div className="flex justify-between">
                        <p className="text-sm text-green-600">
                          Schedule No. {index + 1}
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
                          rules={[
                            {
                              required: true,
                              message: "Please select Exam Date!",
                            },
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
                          <input
                            type="time"
                            className="border border-gray-300 w-full rounded-lg px-3 py-0.5"
                          ></input>
                        </Form.Item>
                      </Col>

                      {/* End Time */}
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <Form.Item
                          {...restField}
                          label="End Time"
                          name={[name, "end_time"]}
                          rules={[
                            {
                              required: true,
                              message: "Please select End time!",
                            },
                          ]}
                        >
                          <input
                            type="time"
                            className="border border-gray-300 w-full rounded-lg px-3 py-0.5"
                          ></input>
                        </Form.Item>
                      </Col>

                      {/* Select Subject */}
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <Form.Item
                          label="Subject"
                          name={[name, "subject"]}
                          {...restField}
                          rules={[
                            {
                              required: true,
                              message: "Please select Subject!",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select Subject"
                            className="w-full"
                          >
                            {subjectData?.data?.results?.length ? (
                              subjectData.data.results
                                .filter(
                                  (subject: any) =>
                                    !selectedSubjects.includes(subject?.id) ||
                                    form.getFieldValue([
                                      "timetables",
                                      name,
                                      "subject",
                                    ]) === subject?.id
                                )
                                .map((subject: any) => (
                                  <Select.Option
                                    key={subject.id}
                                    value={subject.id}
                                  >
                                    {subject.name}
                                  </Select.Option>
                                ))
                            ) : (
                              <Select.Option disabled>
                                No subjects available
                              </Select.Option>
                            )}
                          </Select>
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
                      {/* Contribution Marks */}
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <Form.Item
                          {...restField}
                          label="Contribution Marks"
                          name={[name, "contribution_marks"]}
                        >
                          <InputNumber
                            min={0}
                            max={100}
                            className="w-full"
                            placeholder="Contribution Marks"
                          />
                        </Form.Item>
                      </Col>

                      {/* Passing Marks */}
                      <Col xs={24} sm={12} md={8} lg={6}>
                        <Form.Item
                          {...restField}
                          label="Passing Marks"
                          name={[name, "passing_marks"]}
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
                );
              })}

              {/* Add New Exam Button */}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    const existingTimetables =
                      form.getFieldValue("timetables") || [];
                    const lastEntry =
                      existingTimetables.length > 0
                        ? existingTimetables[existingTimetables.length - 1]
                        : {
                            mcq_marks: 0,
                            written_marks: 0,
                            passing_marks: 0,
                            contribution_marks: 0,
                          };

                    add({
                      mcq_marks: lastEntry.mcq_marks || 0,
                      written_marks: lastEntry.written_marks || 0,
                      contribution_marks: lastEntry.contribution_marks || 0,
                      passing_marks: lastEntry.passing_marks || 0,
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

export default TimeTableForm;
