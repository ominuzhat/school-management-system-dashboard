import { useEffect, useState } from "react";
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
import { debounce } from "lodash";
import dayjs from "dayjs";

const TimeTableForm = ({
  examDate,
  selectedTab,
  formData,
  setFormData,
}: {
  selectedTab: string;
  examDate: any;
  formData: any;
  setFormData: (data: any) => void;
}) => {
  const [search, setSearch] = useState("");

  const { data: subjectData, isFetching } = useGetSubjectsQuery({
    grade_level: selectedTab,
    search: search,
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
                        <DatePicker
                          format="YYYY-MM-DD"
                          className="w-full"
                          disabledDate={(current) => {
                            if (!examDate || examDate.length !== 2)
                              return false;
                            const [start, end] = examDate;
                            return (
                              current < dayjs(start).startOf("day") ||
                              current > dayjs(end).endOf("day")
                            );
                          }}
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
                            {
                              required: true,
                              message: "Please select Subject!",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select Subject"
                            className="w-full"
                            allowClear
                            showSearch
                            onSearch={debounce(setSearch, 500)}
                            filterOption={false}
                            loading={isFetching}
                            notFoundContent={
                              subjectData?.data?.results?.length === 0
                                ? "No Student found"
                                : null
                            }
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
                          ></input>
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
                          ></input>
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

                      {/* Contribution Marks (%) */}
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

              {/* Add New Exam Button */}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    try {
                      // Validate all existing fields first
                      form.validateFields().then(() => {
                        const existingTimetables =
                          form.getFieldValue("timetables") || [];
                        const lastEntry = existingTimetables[
                          existingTimetables.length - 1
                        ] || {
                          mcq_marks: 0,
                          written_marks: 0,
                          contribution_marks: 0,
                          start_time: "",
                          end_time: "",
                          exam_mark_exp_date: null,
                        };

                        add({
                          mcq_marks: lastEntry.mcq_marks,
                          written_marks: lastEntry.written_marks,
                          contribution_marks: lastEntry.contribution_marks,
                          start_time: lastEntry.start_time,
                          end_time: lastEntry.end_time,
                          exam_mark_exp_date: lastEntry.exam_mark_exp_date,
                        });
                      });
                    } catch (error) {
                      // Validation will automatically show error messages
                      console.log("Validation failed:", error);
                    }
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
