import {
  Card,
  Col,
  Row,
  Select,
  Form as AntForm,
  Input,
  Checkbox,
  Badge,
  Typography,
  Divider,
  Space,
  Switch,
} from "antd";
import { Form } from "../../../../common/CommonAnt";
import {
  useCreateAdmissionFeeMutation,
  useCreateAdmissionMutation,
} from "../api/admissionEndPoints";
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
import CustomFeeForm from "./CustomFeeForm";
import dayjs from "dayjs";
import { LoadingOutlined } from "@ant-design/icons";
import AdmissionFeeForm from "./AdmissionFeeForm";

const { Title, Text } = Typography;
const { Option } = Select;

const CreateOldStudent = () => {
  const [form] = AntForm.useForm();
  const [forceUpdate, setForceUpdate] = useState(0);
  const [isRegularFee, setIsRegularFee] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [selectAll, setSelectAll] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const session = AntForm.useWatch("session", form);
  const shift = AntForm.useWatch("shift", form);
  const gradeLevel = AntForm.useWatch("grade_level", form);
  const section = AntForm.useWatch("section", form);
  const feeType = AntForm.useWatch("fee_type", form);
  const customFees = AntForm.useWatch("customFees", form);

  // API calls
  const { data: studentData, isFetching: isFetchingStudents } =
    useGetStudentsQuery({
      search: search,
      is_active: true,
      exclude_session: session,
      exclude_shift: shift,
      exclude_section: section,
      exclude_grade_level: gradeLevel,
    });
  const [createAdmissionFee, { data: admissionFee }] =
    useCreateAdmissionFeeMutation();

  useEffect(() => {
    if (gradeLevel && selectedSubjects) {
      createAdmissionFee({
        grade_level: gradeLevel,
        subjects: selectedSubjects,
        fee_type: "class",
      } as any);
    }
  }, [gradeLevel, selectedSubjects, feeType, createAdmissionFee]);

  const { data: sessionData, isFetching: isFetchingSessions } =
    useGetAdmissionSessionQuery({
      status: "open",
    });
  const { data: shiftData, isFetching: isFetchingShifts } = useGetShiftQuery(
    {}
  );
  const { data: classData, isFetching: isFetchingClasses } = useGetClassesQuery(
    {}
  );
  const { data: sectionData, isFetching: isFetchingSections } =
    useGetSectionQuery({ grade_level: gradeLevel }, { skip: !gradeLevel });
  const {
    data: subjectData,
    isFetching: isFetchingSubjects,
    refetch: refetchSubjects,
  } = useGetSubjectsQuery({ grade_level: gradeLevel }, { skip: !gradeLevel });

  const [create, { isLoading, isSuccess }] = useCreateAdmissionMutation();

  // Handle subject selection when grade level changes
  useEffect(() => {
    if (gradeLevel) {
      refetchSubjects();
      setSelectAll(true);
    } else {
      setSelectedSubjects([]);
      setSelectAll(false);
    }
  }, [gradeLevel, refetchSubjects]);

  // Update selections when selectAll or subjects change
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
        setSelectedSubjects([]);
        form.setFieldsValue({ subjects: [] });
      }
    }
  }, [selectAll, subjectData, form]);

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

  // Reset form on success
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setSelectAll(true);
      setSelectedSubjects([]);
      setIsRegularFee(true);
    }
  }, [isSuccess, form]);

  useEffect(() => {
    const setupFees = () => {
      if (admissionFee?.data?.fees) {
        form.setFieldsValue({ fees: admissionFee.data.fees });
      }

      setForceUpdate((prev) => prev + 1);
    };

    setupFees();
  }, [feeType, admissionFee?.data?.fees, form]);

  const handleFeeTypeChange = (checked: boolean) => {
    setIsRegularFee(checked);
  };

  const onFinish = (values: any): void => {
    const isCustom =
      customFees && Array.isArray(customFees) && customFees.length > 0;

    const sourceFees = isCustom ? customFees : values.fees || [];

    const formattedValues = {
      ...values,
      admission_date: dayjs().format("YYYY-MM-DD"),
      // fee_type: isCustom ? "custom" : values?.fee_type,
      fee_type: isRegularFee ? "class" : "custom",
      fees: sourceFees.map((fee: any) => ({
        ...fee,
        effective_from: isCustom
          ? dayjs(fee.effective_from).format("YYYY-MM-DD")
          : undefined,
        is_active: true,
      })),
    };

    // Remove customFees from payload (clean up)
    delete formattedValues.customFees;

    create(formattedValues);
  };

  return (
    <div className="p-4">
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{
          subjects: selectedSubjects,
          status: "approved",
          // discount_type: "amount",
          // discount_value: 0,
          fee_type: "class",
          customFees: [
            {
              name: "Registration Fee",
              amount: 1000,
              one_time: true,
              effective_from: dayjs(),
            },
            {
              name: "Monthly Fee",
              amount: 500,
              one_time: false,
              effective_from: dayjs(),
            },
          ],
          admission_date: dayjs(),
          fees: [],
        }}
      >
        <Card bordered={false} className="shadow-sm">
          <Title level={4} className="mb-4">
            Student Information
          </Title>

          <Row gutter={[16, 16]}>
            {/* Session Selection */}
            <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
              <Form.Item<IAdmission>
                label="Session"
                name="session"
                rules={[{ required: true, message: "Please select a session" }]}
              >
                <Select
                  loading={isFetchingSessions}
                  placeholder="Select admission session"
                >
                  {Array.isArray(sessionData?.data) &&
                    sessionData?.data?.map((session: any) => (
                      <Option key={session.id} value={session.id}>
                        {session.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Shift Selection */}
            <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
              <Form.Item<IAdmission>
                label="Shift"
                name="shift"
                rules={[{ required: true, message: "Please select a shift" }]}
              >
                <Select loading={isFetchingShifts} placeholder="Select shift">
                  {Array.isArray(shiftData?.data) &&
                    shiftData?.data?.map((shift: any) => (
                      <Option key={shift.id} value={shift.id}>
                        {shift.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Class Selection */}
            <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
              <Form.Item<IAdmission>
                label="Class"
                name="grade_level"
                rules={[{ required: true, message: "Please select a class" }]}
              >
                <Select
                  loading={isFetchingClasses}
                  placeholder="Select class"
                  onChange={() => {
                    setSelectedSubjects([]);
                    form.setFieldsValue({ subjects: [], section: undefined });
                  }}
                >
                  {Array.isArray(classData?.data) &&
                    classData?.data?.map((classItem: IClasses) => (
                      <Option key={classItem.id} value={classItem.id}>
                        {classItem.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Section (conditionally rendered) */}
            {gradeLevel && (
              <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                <Form.Item<IAdmission>
                  label="Section"
                  name="section"
                  rules={[
                    { required: true, message: "Please select a section" },
                  ]}
                >
                  <Select
                    loading={isFetchingSections}
                    placeholder="Select section"
                  >
                    {Array.isArray(sectionData?.data) &&
                      sectionData?.data?.map((section: any) => (
                        <Option key={section.id} value={section.id}>
                          {section.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            )}

            {/* Student Selection */}

            {session && shift && gradeLevel && section && (
              <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                <Form.Item<IAdmission>
                  label="Student"
                  name="student"
                  rules={[
                    { required: true, message: "Please select a student" },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Search student by name"
                    optionFilterProp="children"
                    filterOption={false}
                    onSearch={debounce(setSearch, 500)}
                    loading={isFetchingStudents}
                    notFoundContent={
                      isFetchingStudents ? (
                        <LoadingOutlined />
                      ) : (
                        "No students found"
                      )
                    }
                  >
                    {studentData?.data?.results?.map((student: any) => (
                      <Option key={student.id} value={student.id}>
                        {`${student.first_name} ${student.last_name} - (${
                          student?.current_grade_level?.name || "N/A"
                        })`}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            )}

            {/* Roll Number */}
            <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
              <Form.Item<IAdmission>
                label="Roll Number"
                name="roll"
                rules={[
                  {
                    pattern: /^[0-9]+$/,
                    message: "Please enter a valid roll number",
                  },
                ]}
              >
                <Input placeholder="Enter roll number" />
              </Form.Item>
            </Col>

            {/* Status */}
            <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
              <Form.Item<IAdmission> label="Status" name="status">
                <Select placeholder="Select status">
                  <Option value="pending">Pending</Option>
                  <Option value="approved">Approved</Option>
                  <Option value="rejected">Rejected</Option>
                  <Option value="passed">Passed</Option>
                  <Option value="withdrawn">Withdrawn</Option>
                  <Option value="failed">Failed</Option>
                  <Option value="on_hold">On Hold</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Subjects Section */}
          {gradeLevel && subjectData?.data?.results && (
            <div className="mt-6">
              <Title level={4} className="mb-4">
                Subject Selection
              </Title>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item<IAdmission>
                    label="Subjects"
                    name="subjects"
                    rules={[
                      {
                        required: true,
                        message: "Please select at least one subject",
                        type: "array",
                        min: 1,
                      },
                    ]}
                  >
                    <div className="mb-4">
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
                        <Text strong>Select All Subjects</Text>
                      </Checkbox>
                      {!selectAll && selectedSubjects.length > 0 && (
                        <Text type="secondary" className="ml-2">
                          ({selectedSubjects.length} selected)
                        </Text>
                      )}
                    </div>
                    <Select
                      mode="multiple"
                      placeholder="Select subjects"
                      value={selectedSubjects}
                      onChange={handleSubjectsChange}
                      loading={isFetchingSubjects}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        String(option?.children ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    >
                      {subjectData.data.results.map((subject: any) => (
                        <Option key={subject.id} value={subject.id}>
                          {subject.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          )}

          {/* Discount Section */}
          {/* <Divider /> */}
          {/* <div className="flex items-center gap-5">
            <Title level={4} className="mb-4">
              Discount Information
            </Title>
            <Tag color="red" className="uppercase">
             Monthly discount (automatic)
            </Tag>
          </div> */}
          {/* <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12} lg={8} xl={12} xxl={12}>
              <Form.Item<IAdmission> label="Discount Type" name="discount_type">
                <Select>
                  <Option value="amount">Fixed Amount</Option>
                  <Option value="percent">Percentage</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={8} xl={12} xxl={12}>
              <Form.Item<IAdmission>
                label={`Discount Value (${
                  discountType === "percent" ? "%" : "৳"
                })`}
                name="discount_value"
                rules={[
                  { required: true, message: "Please enter discount value" },
                  () => ({
                    validator(_, value) {
                      if (discountType === "percent" && value > 100) {
                        return Promise.reject(
                          new Error("Discount cannot exceed 100%")
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input type="number" min={0} />
              </Form.Item>
            </Col>
          </Row> */}

          {/* Fee Configuration Section */}
          <Divider />
          <Title level={4} className="mb-4">
            Fee Configuration
          </Title>
          <Row gutter={[16, 16]} align="middle">
            <Col span={24}>
              <Space>
                <Text strong>Fee Type:</Text>
                <Switch
                  checked={isRegularFee}
                  onChange={handleFeeTypeChange}
                  checkedChildren="Class Fee"
                  unCheckedChildren="Custom Fee"
                />
              </Space>
            </Col>

            {isRegularFee ? (
              <Card className="w-full">
                <AdmissionFeeForm key={forceUpdate} />
              </Card>
            ) : (
              // <Col span={24}>
              //   <Form.Item
              //     label="Fee Structure Type"
              //     name="fee_type"
              //     rules={[
              //       { required: true, message: "Please select fee type" },
              //     ]}
              //   >
              //     <Select>
              //       <Option value="class">Class Fee</Option>
              //       <Option value="subject">Subject Fee</Option>
              //       <Option value="custom">Custom Fee</Option>
              //       <Option value="student">Student-specific Fee</Option>
              //     </Select>
              //   </Form.Item>
              // </Col>
              <Col span={24}>
                <Badge.Ribbon text="Custom Fee" color="blue" placement="start">
                  <Card className="pt-4">
                    <CustomFeeForm />
                  </Card>
                </Badge.Ribbon>
              </Col>
            )}
          </Row>
        </Card>
        {/* {admissionFee?.data && isRegularFee && (
          <Card>
        
            <AdmissionFeeForm key={forceUpdate} />
          </Card>
        )} */}
      </Form>
    </div>
  );
};

export default CreateOldStudent;
