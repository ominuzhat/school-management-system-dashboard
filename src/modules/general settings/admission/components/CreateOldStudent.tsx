import { Card, Col, Row, Select, Form as AntForm, Input, Checkbox } from "antd";
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
  const [selectAll, setSelectAll] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const { data: subjectData, refetch: refetchSubjects } = useGetSubjectsQuery(
    {
      grade_level: gradeLevel,
    },
    { skip: !gradeLevel }
  );
  const { data: sectionData } = useGetSectionQuery(
    {
      grade_level: gradeLevel,
    },
    { skip: !gradeLevel }
  );
  const { data: classData } = useGetClassesQuery({});
  const [create, { isLoading, isSuccess }] = useCreateAdmissionMutation();

  // Effect to handle subject selection when grade level changes
  useEffect(() => {
    if (gradeLevel) {
      refetchSubjects();
      setSelectAll(true);
    } else {
      setSelectedSubjects([]);
      setSelectAll(false);
    }
  }, [gradeLevel, refetchSubjects]);

  // Effect to update selections when selectAll or subjects change
  useEffect(() => {
    if (subjectData?.data?.results) {
      if (selectAll) {
        const allSubjectIds = subjectData.data.results.map(
          (subject: any) => subject.id
        );
        setSelectedSubjects(allSubjectIds);
        form.setFieldsValue({ subjects: allSubjectIds });
      } else if (
        !selectAll &&
        selectedSubjects.length === subjectData.data.results.length
      ) {
        // Handle case where all were selected but selectAll was toggled off
        setSelectedSubjects([]);
        form.setFieldsValue({ subjects: [] });
      }
    }
  }, [selectAll, subjectData, form]);

  const onFinish = (values: any): void => {
    create(values);
  };

  const handleSubjectsChange = (selectedValues: string[]) => {
    setSelectedSubjects(selectedValues);
    form.setFieldsValue({ subjects: selectedValues });

    // Update selectAll state
    if (subjectData?.data?.results) {
      setSelectAll(selectedValues.length === subjectData.data.results.length);
    }
  };

  const handleSelectAllChange = (e: any) => {
    const shouldSelectAll = e.target.checked;
    setSelectAll(shouldSelectAll);

    if (subjectData?.data?.results) {
      if (shouldSelectAll) {
        const allSubjectIds = subjectData.data.results.map(
          (subject: any) => subject.id
        );
        setSelectedSubjects(allSubjectIds);
        form.setFieldsValue({ subjects: allSubjectIds });
      } else {
        setSelectedSubjects([]);
        form.setFieldsValue({ subjects: [] });
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setSelectAll(true);
      setSelectedSubjects([]);
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
                  onChange={() => {
                    // Reset subjects when class changes
                    setSelectedSubjects([]);
                    form.setFieldsValue({ subjects: [] });
                  }}
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

            {gradeLevel && subjectData?.data?.results && (
              <Col lg={24}>
                <Form.Item<IAdmission>
                  label="Subjects"
                  name="subjects"
                  rules={[
                    {
                      required: true,
                      message: "Please select at least one subject",
                    },
                  ]}
                >
                  <div style={{ marginBottom: 8 }}>
                    <Checkbox
                      checked={selectAll}
                      onChange={handleSelectAllChange}
                      indeterminate={
                        !selectAll &&
                        selectedSubjects.length > 0 &&
                        selectedSubjects.length <
                          subjectData.data.results.length
                      }
                    >
                      Select All Subjects
                    </Checkbox>
                    {!selectAll && selectedSubjects.length > 0 && (
                      <span style={{ marginLeft: 8 }}>
                        ({selectedSubjects.length} selected)
                      </span>
                    )}
                  </div>
                  <Select
                    mode="multiple"
                    placeholder="Select subjects"
                    value={selectedSubjects}
                    onChange={handleSubjectsChange}
                    style={{ width: "100%" }}
                    optionFilterProp="children"
                    filterOption={(input, option: any) =>
                      (option?.children ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {subjectData.data.results.map((data: any) => (
                      <Option key={data.id} value={data.id}>
                        {data.name} ({data?.grade_level?.name})
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
