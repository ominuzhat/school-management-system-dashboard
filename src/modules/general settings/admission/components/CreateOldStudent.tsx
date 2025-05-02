import { Card, Col, Row, Select, Form as AntForm, Input } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateAdmissionMutation } from "../api/admissionEndPoints";
import { IAdmission } from "../type/admissionType";
import { useGetStudentsQuery } from "../../../members/students/api/studentEndPoints";
import { useGetClassesQuery } from "../../classes/api/classesEndPoints";
import { IClasses } from "../../classes/type/classesType";
import { useEffect, useState } from "react";
import { useGetSubjectsQuery } from "../../subjects/api/subjectsEndPoints";
import { useGetAdmissionSessionQuery } from "../../admission session/api/admissionSessionEndPoints";
import { debounce } from "lodash";
import { useGetSectionQuery } from "../../Section/api/sectionEndPoints";
import { useGetShiftQuery } from "../../shift/api/shiftEndPoints";

const { Option } = Select;

const CreateOldStudent = () => {
  const [form] = AntForm.useForm();
  const [search, setSearch] = useState("");
  const gradeLevel = AntForm.useWatch("grade_level", form);
  const { data: studentData, isFetching } = useGetStudentsQuery({
    search: search,
    is_active: true,
  });
  const { data: sessionData } = useGetAdmissionSessionQuery({
    status: "open",
  });
  const { data: shiftData } = useGetShiftQuery({});
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const { data: subjectData } = useGetSubjectsQuery({
    grade_level: gradeLevel,
  });
  const { data: sectionData } = useGetSectionQuery({
    grade_level: gradeLevel,
  });
  const { data: classData } = useGetClassesQuery({});
  const [create, { isLoading, isSuccess }] = useCreateAdmissionMutation();

  const onFinish = (values: any): void => {
    create(values);
  };

  const handleSubjectsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions);
    setSelectedSubjects(options.map((option) => option.value));
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
    }
  }, [isSuccess, form]);

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{
          subjects: selectedSubjects,
          status: "approved",
          discount_type: "amount",
          discount_value: 0,
        }}
      >
        <Card>
          <Row gutter={[16, 16]}>
            <Col lg={8}>
              <Form.Item<IAdmission>
                label="Student"
                name="student"
                rules={[{ required: true, message: "Student" }]}
              >
                <Select
                  className="w-full"
                  placeholder="Select Student"
                  allowClear
                  showSearch
                  onSearch={debounce(setSearch, 500)}
                  filterOption={false}
                  loading={isFetching}
                  notFoundContent={
                    Array?.isArray(studentData?.data?.results) &&
                    studentData?.data?.results?.length === 0
                      ? "No Students found"
                      : null
                  }
                >
                  {studentData?.data?.results?.map((data: any) => (
                    <Option key={data.id} value={data.id}>
                      {data?.first_name} {data?.last_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={8}>
              <Form.Item<IAdmission>
                label="Session"
                name="session"
                rules={[{ required: true, message: "Session" }]}
              >
                <Select
                  className="w-full"
                  placeholder="Select Session"
                  allowClear
                  showSearch
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

            <Col lg={8}>
              <Form.Item<IAdmission>
                label="Fee Type"
                name="fee_type"
                rules={[{ required: true, message: "Fee Type" }]}
              >
                <Select className="w-full" placeholder="Select Fee Type">
                  <Option value="class">Class</Option>
                  <Option value="subject">Subjects</Option>
                  <Option value="student">Student</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col lg={8}>
              <Form.Item<IAdmission>
                label="Class"
                name="grade_level"
                rules={[{ required: true, message: "Class" }]}
              >
                <Select
                  className="w-full"
                  placeholder="Select Class"
                  allowClear
                >
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
              <Form.Item<IAdmission> label="Roll" name="roll">
                <Input placeholder="Enter Roll" />
              </Form.Item>
            </Col>

            {gradeLevel && (
              <Col lg={8}>
                <Form.Item<IAdmission>
                  label="Section"
                  name="section"
                  rules={[{ required: true, message: "Section" }]}
                >
                  <Select
                    className="w-full"
                    placeholder="Select Section"
                    allowClear
                    showSearch
                  >
                    {Array.isArray(sectionData?.data) &&
                      sectionData?.data?.map((data: any) => (
                        <Option key={data.id} value={data.id}>
                          {data?.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            )}

            {gradeLevel && (
              <Col lg={8}>
                <Form.Item<IAdmission>
                  label="Subject"
                  name="subjects"
                  rules={[{ required: true, message: "Subject" }]}
                  getValueProps={() => ({
                    value: selectedSubjects,
                  })}
                  getValueFromEvent={(e) =>
                    Array.from(e.target.selectedOptions).map(
                      (option: any) => option.value
                    )
                  }
                >
                  <select
                    className="custom-select"
                    multiple
                    value={selectedSubjects}
                    onChange={handleSubjectsChange}
                  >
                    {subjectData?.data?.results?.map((data: any) => (
                      <option key={data.id} value={data.id}>
                        {data.name} ({data?.grade_level?.name})
                      </option>
                    ))}
                  </select>
                </Form.Item>
              </Col>
            )}

            <Col lg={8}>
              <Form.Item<IAdmission> label="Status" name="status">
                <Select
                  placeholder="Status"
                  options={[
                    { value: "pending", label: "Pending" },
                    { value: "approved", label: "Approved" },
                    { value: "rejected", label: "Rejected" },
                    { value: "passed", label: "Passed" },
                    { value: "withdrawn", label: "Withdrawn" },
                    { value: "failed", label: "Failed" },
                    { value: "on_hold", label: "On Hold" },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col lg={8}>
              <Form.Item<IAdmission>
                label="Shift"
                name="shift"
                rules={[{ required: true, message: "Shift" }]}
              >
                <Select
                  className="w-full"
                  placeholder="Select Shift"
                  allowClear
                >
                  {Array.isArray(shiftData?.data) &&
                    shiftData.data.map((data: IClasses) => (
                      <Option key={data.id} value={data.id}>
                        {data.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            <Col lg={8}>
              <Form.Item<IAdmission> label="Discount Type" name="discount_type">
                <Select className="w-full" placeholder="Discount Type">
                  <Option value="amount">Amount</Option>
                  <Option value="percent">Percent</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col lg={8}>
              <Form.Item<IAdmission>
                label="Discount Value"
                name="discount_value"
              >
                <Input type="number" placeholder="Discount Value" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default CreateOldStudent;
