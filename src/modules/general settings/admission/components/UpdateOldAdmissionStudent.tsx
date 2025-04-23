import { useState, useEffect } from "react";
import {
  Card,
  Col,
  Form,
  Row,
  Select,
  Button,
  Form as AntForm,
  Input,
} from "antd";
import {
  useGetSingleAdmissionQuery,
  useUpdateAdmissionMutation,
} from "../api/admissionEndPoints";
import { useGetStudentsQuery } from "../../../members/students/api/studentEndPoints";
import { useGetClassesQuery } from "../../classes/api/classesEndPoints";
import { useGetSubjectsQuery } from "../../subjects/api/subjectsEndPoints";
import { useGetAdmissionSessionQuery } from "../../admission session/api/admissionSessionEndPoints";
import { useParams } from "react-router-dom";
import { IAdmission } from "../type/admissionType";
import { debounce } from "lodash";
import { useGetSectionQuery } from "../../Section/api/sectionEndPoints";
import { useGetShiftQuery } from "../../shift/api/shiftEndPoints";

const { Option } = Select;

const UpdateOldAdmissionStudent = () => {
  const [form] = AntForm.useForm();
  const [search, setSearch] = useState("");
  const { data: shiftData } = useGetShiftQuery({});

  const gradeLevel = AntForm.useWatch("grade_level", form);

  const { admissionId } = useParams();
  const { data: singleAdmissionData } = useGetSingleAdmissionQuery(
    Number(admissionId)
  );
  const singleAdmission: any = singleAdmissionData?.data;

  const { data: studentData, isFetching } = useGetStudentsQuery({
    search: search,
    is_active: true,
  });
  const { data: sectionData } = useGetSectionQuery({
    grade_level: gradeLevel,
  });
  const { data: sessionData } = useGetAdmissionSessionQuery({});
  const [selectedClass, setSelectedClass] = useState<number>(
    singleAdmission?.subjects?.[0]?.grade_level?.id || 0
  );

  const { data: subjectData } = useGetSubjectsQuery({
    grade_level: gradeLevel,
  });
  const { data: classData } = useGetClassesQuery({});
  const [updateAdmission] = useUpdateAdmissionMutation();

  useEffect(() => {
    if (singleAdmission) {
      form.setFieldsValue({
        student: singleAdmission?.student?.id,
        roll: singleAdmission?.roll,
        session: singleAdmission?.session?.id,
        status: singleAdmission?.status,
        shift: singleAdmission?.shift?.id,
        fee_type: singleAdmission?.fee_type,
        section: singleAdmission?.section?.id,
        grade_level: singleAdmission?.subjects?.[0]?.grade_level?.id,
        subjects: singleAdmission?.subjects?.map((sub: any) => sub.id),
      });
    }
    setSelectedClass(singleAdmission?.subjects?.[0]?.grade_level?.id);
  }, [singleAdmission, form]);

  const onFinish = (values: any): void => {
    const updatedData = {
      ...values,
      registration_number: singleAdmission?.registration_number,
    };

    updateAdmission({ id: singleAdmission?.id, data: updatedData });
  };

  const handleClassChange = (value: number) => {
    setSelectedClass(value);
    form.setFieldsValue({ subjects: [] });
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} initialValues={{}}>
        <Card>
          <Row gutter={[16, 16]}>
            {/* Form fields here */}
            <Col lg={8}>
              <Form.Item label="Student" name="student">
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

            {/* Other form items... */}
            <Col lg={8}>
              <Form.Item label="Session" name="session">
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
              <Form.Item label="Fee Type" name="fee_type">
                <Select className="w-full" placeholder="Select Fee Type">
                  <Option value="class">Class</Option>
                  <Option value="subject">Subjects</Option>
                  <Option value="student">Students</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col lg={8}>
              <Form.Item label="Class" name="grade_level">
                <Select
                  className="w-full"
                  placeholder="Select Class"
                  onChange={handleClassChange}
                >
                  {Array.isArray(classData?.data) &&
                    classData?.data?.map((data: any) => (
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
                <Form.Item<IAdmission> label="Section" name="section">
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

            {selectedClass !== 0 && (
              <Col lg={8}>
                <Form.Item label="Subjects" name="subjects">
                  <Select
                    className="w-full"
                    mode="multiple"
                    placeholder="Select Subjects"
                  >
                    {subjectData?.data?.results?.map((data: any) => (
                      <Option key={data?.id} value={data.id}>
                        {data.name}
                      </Option>
                    ))}
                  </Select>
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
                    shiftData.data.map((data: any) => (
                      <Option key={data.id} value={data.id}>
                        {data.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Submit Button */}
          <Row justify="end" style={{ marginTop: "20px" }}>
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default UpdateOldAdmissionStudent;
