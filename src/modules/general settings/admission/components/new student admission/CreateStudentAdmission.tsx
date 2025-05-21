import {
  Card,
  Col,
  Row,
  Select,
  Form as AntForm,
  Input,
  Checkbox,
  Typography,
  Form,
} from "antd";

import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { useCreateAdmissionFeeMutation } from "../../api/admissionEndPoints";
import { useGetAdmissionSessionQuery } from "../../../admission session/api/admissionSessionEndPoints";
import { useGetShiftQuery } from "../../../shift/api/shiftEndPoints";
import { useGetClassesQuery } from "../../../classes/api/classesEndPoints";
import { useGetSectionQuery } from "../../../Section/api/sectionEndPoints";
import { useGetSubjectsQuery } from "../../../subjects/api/subjectsEndPoints";
import { IAdmission } from "../../type/admissionType";
import { IClasses } from "../../../classes/type/classesType";

import { useDispatch } from "react-redux";
import { updateAdmissionField } from "../../../../../app/features/studentAdmissionSlice";
import { useAppSelector } from "../../../../../app/store";

const { Title, Text } = Typography;
const { Option } = Select;

interface CreateStudentInformationProps {
  onValidationChange: (isValid: boolean) => void;
}

const CreateStudentAdmission: React.FC<CreateStudentInformationProps> = ({
  onValidationChange,
}) => {
  const dispatch = useDispatch();

  const [form] = AntForm.useForm();
  const [forceUpdate, setForceUpdate] = useState(0);
  const [selectAll, setSelectAll] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const gradeLevel = AntForm.useWatch("grade_level", form);
  const feeType = AntForm.useWatch("fee_type", form);
  const customFees = AntForm.useWatch("customFees", form);

  const allValues = Form.useWatch([], form);

  useEffect(() => {
    const validate = async () => {
      try {
        await form.validateFields(); // Only validates required fields
        onValidationChange(true);
      } catch {
        onValidationChange(false);
      }
    };

    validate();
  }, [allValues]);

  console.log(forceUpdate);
  // API calls

  const [createAdmissionFee, { data: admissionFee }] =
    useCreateAdmissionFeeMutation();

  useEffect(() => {
    if (
      gradeLevel &&
      selectedSubjects &&
      (feeType === "class" || feeType === "subject")
    ) {
      createAdmissionFee({
        grade_level: gradeLevel,
        subjects: selectedSubjects,
        fee_type: feeType,
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

  useEffect(() => {
    const numericValues = selectedSubjects.map(Number);

    dispatch(
      updateAdmissionField({
        field: "subjects",
        value: numericValues,
      })
    );
  }, [selectedSubjects, dispatch]);

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
    const setupFees = () => {
      if (admissionFee?.data?.fees) {
        form.setFieldsValue({ fees: admissionFee.data.fees });
      }
      setForceUpdate((prev) => prev + 1);
    };

    setupFees();
  }, [feeType, admissionFee?.data?.fees, form]);

  const onFinish = (values: any): void => {
    const isCustom =
      customFees && Array.isArray(customFees) && customFees.length > 0;

    const sourceFees = isCustom ? customFees : values.fees || [];

    const formattedValues = {
      ...values,
      admission_date: dayjs().format("YYYY-MM-DD"),
      fee_type: isCustom ? "custom" : values?.fee_type,
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
  };

  const admission = useAppSelector((state) => state.student.admission);

  useEffect(() => {
    if (admission) {
      form.setFieldsValue({
        ...admission,
      });
    }
  }, [admission, form]);

  return (
    <div className="p-4">
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          subjects: selectedSubjects,
          status: "approved",
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
                  onChange={(value) =>
                    dispatch(
                      updateAdmissionField({
                        field: "session",
                        value,
                      })
                    )
                  }
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
              <Form.Item<IAdmission>
                label="Class"
                name="grade_level"
                rules={[{ required: true, message: "Please select a class" }]}
              >
                <Select
                  loading={isFetchingClasses}
                  placeholder="Select class"
                  onChange={(value) => {
                    setSelectedSubjects([]);
                    form.setFieldsValue({ subjects: [], section: undefined });
                    dispatch(
                      updateAdmissionField({
                        field: "grade_level",
                        value,
                      })
                    );
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

            {/* Roll Number */}
            <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
              <Form.Item<IAdmission> label="Roll Number" name="roll">
                <Input
                  placeholder="Enter roll number"
                  onChange={(e) =>
                    dispatch(
                      updateAdmissionField({
                        field: "roll",
                        value: e.target.value,
                      })
                    )
                  }
                />
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
                    onChange={(value) =>
                      dispatch(
                        updateAdmissionField({
                          field: "section",
                          value,
                        })
                      )
                    }
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
              <Form.Item<IAdmission>
                label="Shift"
                name="shift"
                rules={[{ required: true, message: "Please select a shift" }]}
              >
                <Select
                  loading={isFetchingShifts}
                  placeholder="Select shift"
                  onChange={(value) =>
                    dispatch(
                      updateAdmissionField({
                        field: "shift",
                        value,
                      })
                    )
                  }
                >
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
                <Select
                  placeholder="Select status"
                  onChange={(value) =>
                    dispatch(
                      updateAdmissionField({
                        field: "status",
                        value,
                      })
                    )
                  }
                >
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
        </Card>
      </Form>
    </div>
  );
};

export default CreateStudentAdmission;
