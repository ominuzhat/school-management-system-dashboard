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
  Spin,
} from "antd";
import { Form } from "../../../../common/CommonAnt";
import { IAdmission } from "../type/admissionType";
import { useGetStudentsQuery } from "../../../members/students/api/studentEndPoints";
import { useGetClassesQuery } from "../../classes/api/classesEndPoints";
import { useEffect, useState } from "react";
import { useGetSubjectsQuery } from "../../subjects/api/subjectsEndPoints";
import { useGetAdmissionSessionQuery } from "../../admission session/api/admissionSessionEndPoints";
import { debounce } from "lodash";
import { useGetSectionQuery } from "../../Section/api/sectionEndPoints";
import { useGetShiftQuery } from "../../shift/api/shiftEndPoints";
import CustomFeeForm from "./CustomFeeForm";
import dayjs from "dayjs";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import {
  useGetSingleAdmissionQuery,
  useUpdateAdmissionMutation,
} from "../api/admissionEndPoints";
import UpdatedAdmissionFeeForm from "./UpdatedAdmissionFeeForm";

const { Title, Text } = Typography;
const { Option } = Select;

const UpdateOldAdmissionStudent = () => {
  const [form] = AntForm.useForm();
  const [forceUpdate, setForceUpdate] = useState(0);
  const [search, setSearch] = useState("");
  const [selectAll, setSelectAll] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const gradeLevel = AntForm.useWatch("grade_level", form);
  const feeType = AntForm.useWatch("fee_type", form);
  // const customFees = AntForm.useWatch("customFees", form);
  console.log(setForceUpdate);

  const { admissionId } = useParams();
  const { data: singleAdmissionData } = useGetSingleAdmissionQuery(
    Number(admissionId)
  );
  const singleAdmission: any = singleAdmissionData?.data;

  // API calls
  const { data: studentData, isFetching: isFetchingStudents } =
    useGetStudentsQuery({
      search: search,
      is_active: true,
    });
  const { data: sessionData, isFetching: isFetchingSessions } =
    useGetAdmissionSessionQuery({});
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

  const [updateAdmission, { isLoading, isSuccess }] =
    useUpdateAdmissionMutation();

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

  // Set initial form values when singleAdmission data is available
  useEffect(() => {
    if (singleAdmission) {
      const initialSubjects =
        singleAdmission?.subjects?.map((sub: any) => sub.id) || [];
      const isCustomFee = singleAdmission?.fee_type === "custom";

      // Format custom fees with proper date handling
      const formattedCustomFees = isCustomFee
        ? singleAdmission?.fees?.map((fee: any) => ({
            ...fee,
            effective_from: fee.effective_from
              ? dayjs(fee.effective_from).isValid()
                ? dayjs(fee.effective_from)
                : dayjs()
              : dayjs(),
          }))
        : [];

      form.setFieldsValue({
        student: singleAdmission?.student?.id,
        roll: singleAdmission?.roll,
        session: singleAdmission?.session?.id,
        status: singleAdmission?.status,
        discount_type: singleAdmission?.discount_type || "amount",
        discount_value: singleAdmission?.discount_value || 0,
        shift: singleAdmission?.shift?.id,
        fee_type: singleAdmission?.fee_type,
        section: singleAdmission?.section?.id,
        grade_level: singleAdmission?.subjects?.[0]?.grade_level?.id,
        subjects: initialSubjects,
        fees: isCustomFee ? [] : singleAdmission?.fees || [],
        customFees: formattedCustomFees,
      });

      setSelectedSubjects(initialSubjects);
      setSelectAll(
        initialSubjects.length === subjectData?.data?.results?.length
      );
    }
  }, [singleAdmission, form, subjectData]);

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

  const onFinish = (values: any): void => {
    const isCustom = values.fee_type === "custom";
    const sourceFees = isCustom
      ? values.customFees.map((fee: any) => ({
          ...fee,
          effective_from:
            fee.effective_from && dayjs(fee.effective_from).isValid()
              ? dayjs(fee.effective_from).format("YYYY-MM-DD")
              : dayjs().format("YYYY-MM-DD"),
        }))
      : values.fees || [];

    const formattedValues = {
      ...values,
      registration_number: singleAdmission?.registration_number,
      fees: sourceFees,
    };

    // Remove customFees from payload (clean up)
    delete formattedValues.customFees;

    updateAdmission({ id: singleAdmission?.id, data: formattedValues });
  };

  if (!singleAdmission) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className="p-4">
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
      >
        <Card bordered={false} className="shadow-sm">
          <Title level={4} className="mb-4">
            Update Student Admission
          </Title>

          <Row gutter={[16, 16]}>
            {/* Student Selection */}
            <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
              <Form.Item<IAdmission> label="Student" name="student">
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
                    <Option key={student?.id} value={student?.id}>
                      {`${student.first_name} ${student.last_name}  - (${
                        student?.current_grade_level?.name || "N/A"
                      })`}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Session Selection */}
            <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
              <Form.Item<IAdmission> label="Session" name="session">
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

            {/* Class Selection */}
            <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
              <Form.Item<IAdmission> label="Class" name="grade_level">
                <Select
                  loading={isFetchingClasses}
                  placeholder="Select class"
                  onChange={() => {
                    setSelectedSubjects([]);
                    form.setFieldsValue({ subjects: [], section: undefined });
                  }}
                >
                  {Array.isArray(classData?.data) &&
                    classData?.data?.map((classItem: any) => (
                      <Option key={classItem.id} value={classItem.id}>
                        {classItem.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            {/* Roll Number */}
            <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
              <Form.Item<IAdmission> label="Roll Number" name="roll">
                <Input placeholder="Enter roll number" />
              </Form.Item>
            </Col>

            {/* Section (conditionally rendered) */}
            {gradeLevel && (
              <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
                <Form.Item<IAdmission> label="Section" name="section">
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

            {/* Shift Selection */}
            <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
              <Form.Item<IAdmission> label="Shift" name="shift">
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
                  <Form.Item<IAdmission> label="Subjects" name="subjects">
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
          {/* <Divider />
          <Title level={4} className="mb-4">
            Discount Information
          </Title>
          <Row gutter={[16, 16]}>
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
              <Form.Item label="Fee Structure Type" name="fee_type">
                <Select disabled>
                  <Option value="class">Class Fee</Option>
                  <Option value="subject">Subject Fee</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {feeType === "custom" ? (
          <Card>
            <Badge.Ribbon text="Custom Fee" color="blue" placement="start">
              <Card className="pt-4">
                <CustomFeeForm />
              </Card>
            </Badge.Ribbon>
          </Card>
        ) : (
          (feeType === "class" || feeType === "subject") && (
            <Card>
              <UpdatedAdmissionFeeForm key={forceUpdate} />
            </Card>
          )
        )}
      </Form>
    </div>
  );
};

export default UpdateOldAdmissionStudent;
