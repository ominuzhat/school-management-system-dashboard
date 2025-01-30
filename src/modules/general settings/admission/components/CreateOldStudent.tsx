import { Card, Col, Input, Row, Select } from "antd";
import { Form } from "../../../../common/CommonAnt";
import { useCreateAdmissionMutation } from "../api/admissionEndPoints";
import { IAdmission } from "../type/admissionType";
import { useGetStudentsQuery } from "../../../members/students/api/studentEndPoints";
import { useGetClassesQuery } from "../../classes/api/classesEndPoints";
import { IClasses } from "../../classes/type/classesType";
import { useState } from "react";
import { useGetSubjectsQuery } from "../../subjects/api/subjectsEndPoints";
import { useGetAdmissionSessionQuery } from "../../admission session/api/admissionSessionEndPoints";

const { Option } = Select;

const CreateOldStudent = () => {
  const { data: studentData } = useGetStudentsQuery({});
  const { data: sessionData } = useGetAdmissionSessionQuery({});
  const [selectedClass, setSelectedClass] = useState<number>();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const { data: subjectData } = useGetSubjectsQuery({
    grade_level: selectedClass,
  });
  const { data: classData } = useGetClassesQuery({});
  const [create, { isLoading, isSuccess }] = useCreateAdmissionMutation();

  console.log(subjectData?.data?.results);

  const onFinish = (values: any): void => {
    const result: any = {
      discount_type: values.discount_type,
      discount_value: values.discount_value,
      fee_type: values.fee_type,
      session: values.session,
      student: values.student,
      subjects: values.subjects,
      registration_number: "reg324",
    };

    create(result);
  };

  const handleClassChange = (value: number) => {
    setSelectedClass(value);
    setSelectedSubjects([]);
  };

  const handleSubjectsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions);
    setSelectedSubjects(options.map((option) => option.value));
  };

  return (
    <div>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{ subjects: selectedSubjects }}
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
                >
                  {studentData?.data?.results?.map((data: any) => (
                    <Option key={data.id} value={data.id}>
                      {data?.user?.username}
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
              <Form.Item
                label="Discount Type"
                name="discount_type"
                initialValue="amount"
              >
                <Select
                  placeholder="Select Discount Type"
                  className="w-full"
                  defaultValue="amount"
                >
                  <Option value="amount">Amount</Option>
                  <Option value="percent">Percent</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col lg={8}>
              <Form.Item
                label="Discount Value"
                name="discount_value"
                initialValue={0}
              >
                <Input placeholder="Discount Value" defaultValue={0} />
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
                  value={selectedClass}
                  onChange={handleClassChange}
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

            {selectedClass !== 0 && (
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
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default CreateOldStudent;
