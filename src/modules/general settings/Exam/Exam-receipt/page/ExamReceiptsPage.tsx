import { useState, useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Select,
  Table,
  Button,
  Form as AntForm,
  Typography,
} from "antd";
import { useCreateExamReceiptMutation } from "../api/examReceiptEndPoints";
import {
  useGetExamQuery,
  useGetSingleExamQuery,
} from "../../api/examEndPoints";
import { useGetExamHallQuery } from "../../Exam-hall/api/examHallEndPoints";
import { Form } from "../../../../../common/CommonAnt";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../../utilities/NoPermissionData";
import { useGetShiftQuery } from "../../../shift/api/shiftEndPoints";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetClassesQuery } from "../../../classes/api/classesEndPoints";
import { IClasses } from "../../../classes/type/classesType";
import { useGetSectionQuery } from "../../../Section/api/sectionEndPoints";

const { Title } = Typography;

const ExamReceiptsPage = () => {
  const [form] = AntForm.useForm();
  const exam = AntForm.useWatch("exam", form);
  const shift = AntForm.useWatch("shift", form);
  const gradeLevel = AntForm.useWatch("grade_level", form);
  const section = AntForm.useWatch("section", form);

  const { data: classData } = useGetClassesQuery({});
  const { data: sectionData } = useGetSectionQuery(
    {
      grade_level: gradeLevel,
    },
    { skip: !gradeLevel }
  );

  const [create, { isLoading, isSuccess }] = useCreateExamReceiptMutation();
  const { data: examData } = useGetExamQuery({});
  const { data: examHallData, isLoading: classLoading } = useGetExamHallQuery(
    {}
  );

  const { data: shiftData } = useGetShiftQuery({});

  const { data: examDetails } = useGetSingleExamQuery<any>(
    exam
      ? { examId: Number(exam), shift, grade_level: gradeLevel, section }
      : skipToken
  );
  const { data: dashboardData } = useGetDashboardDataQuery({});

  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.examhallreceipt,
    actionNames.add
  );

  const [unassignedAdmissions, setUnassignedAdmissions] = useState<any[]>([]);
  const [assignedAdmissions, setAssignedAdmissions] = useState<any[]>([]);
  const [selectedUnassigned, setSelectedUnassigned] = useState<any[]>([]);
  const [selectedAssigned, setSelectedAssigned] = useState<any[]>([]);

  useEffect(() => {
    if (examDetails?.data) {
      setUnassignedAdmissions(examDetails.data.unassigned_admissions || []);
      setAssignedAdmissions(examDetails.data.assigned_admissions || []);
    }
  }, [examDetails]);

  const handleAssign = () => {
    setAssignedAdmissions([...assignedAdmissions, ...selectedUnassigned]);
    setUnassignedAdmissions(
      unassignedAdmissions.filter(
        (student) =>
          !selectedUnassigned.some((selected) => selected.id === student.id)
      )
    );
    setSelectedUnassigned([]);
  };

  const handleRemove = () => {
    setUnassignedAdmissions([...unassignedAdmissions, ...selectedAssigned]);
    setAssignedAdmissions(
      assignedAdmissions.filter(
        (student) =>
          !selectedAssigned.some((selected) => selected.id === student.id)
      )
    );
    setSelectedAssigned([]);
  };

  const columns = [
    {
      title: "SL",
      dataIndex: "sl",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Registration Number",
      dataIndex: ["student", "registration_number"],
      render: (_text: string, record: any) => `${record.registration_number} `,
    },
    {
      title: "Name",
      dataIndex: ["student", "first_name"],
      render: (_text: string, record: any) =>
        `${record.student.first_name} ${record.student.last_name}`,
    },

    { title: "Phone", dataIndex: ["student", "phone_number"] },
  ];

  const onFinish = (values: any) => {
    const payload = {
      exam: values.exam,
      hall: values.hall,
      assigned_admissions: assignedAdmissions.map((item) => item.id),
    };
    create(payload);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card
        title={
          <Title level={3} className="text-blue-600">
            Exam Receipts
          </Title>
        }
        bordered={false}
        className="shadow-lg rounded-lg"
      >
        {createPermission ? (
          <Form
            form={form}
            onFinish={onFinish}
            isLoading={isLoading}
            isSuccess={isSuccess}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item
                  label="Select Exam Name"
                  name="exam"
                  rules={[{ required: true, message: "Exam is required!" }]}
                >
                  <Select placeholder="Select Exam Name" className="w-full">
                    {Array.isArray(examData?.data) &&
                      examData?.data?.map((exam: any) => (
                        <Select.Option key={exam.id} value={exam.id}>
                          {exam?.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label="Shift" name="shift">
                  <Select
                    className="w-full"
                    placeholder="Select Shift"
                    allowClear
                  >
                    {Array.isArray(shiftData?.data) &&
                      shiftData.data.map((data: any) => (
                        <Select.Option key={data.id} value={data.id}>
                          {data.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item label="Class" name="grade_level">
                  <Select
                    className="w-full"
                    placeholder="Select Class"
                    allowClear
                  >
                    {Array.isArray(classData?.data) &&
                      classData.data.map((data: IClasses) => (
                        <Select.Option key={data.id} value={data.id}>
                          {data.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>

              {gradeLevel && (
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Form.Item label="Section" name="section">
                    <Select
                      className="w-full"
                      placeholder="Select Section"
                      allowClear
                      showSearch
                    >
                      {Array.isArray(sectionData?.data) &&
                        sectionData?.data?.map((data: any) => (
                          <Select.Option key={data.id} value={data.id}>
                            {data?.name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
              )}

              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item
                  label="Exam Hall"
                  name="hall"
                  rules={[
                    { required: true, message: "Exam Hall is required!" },
                  ]}
                >
                  <Select
                    allowClear
                    showSearch
                    placeholder={
                      classLoading ? "Loading classes..." : "Please select"
                    }
                    className="w-full"
                  >
                    {Array.isArray(examHallData?.data) &&
                      examHallData?.data?.map((hall: any) => (
                        <Select.Option key={hall.id} value={hall.id}>
                          {hall?.name} - (Capacity : {hall?.capacity})
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {exam && (
              <Row gutter={[24, 24]} className="mt-6">
                <Col xs={24} sm={24} md={24} lg={12}>
                  <Card
                    title={
                      <span className="text-lg font-semibold">
                        Unassigned Admissions
                      </span>
                    }
                    bordered={false}
                    className="shadow-sm"
                  >
                    <Table
                      rowSelection={{
                        type: "checkbox",
                        onChange: (_, selectedRows) =>
                          setSelectedUnassigned(selectedRows),
                      }}
                      columns={columns}
                      dataSource={unassignedAdmissions}
                      rowKey="id"
                      // pagination={{ pageSize: 5 }}
                      className="rounded-lg"
                    />
                    <Button
                      type="primary"
                      onClick={handleAssign}
                      disabled={selectedUnassigned.length === 0}
                      className="mt-4"
                    >
                      Assign &rarr;
                    </Button>
                  </Card>
                </Col>

                <Col xs={24} sm={24} md={24} lg={12}>
                  <Card
                    title={
                      <span className="text-lg font-semibold">
                        Assigned Admissions
                      </span>
                    }
                    bordered={false}
                    className="shadow-sm"
                  >
                    <Table
                      rowSelection={{
                        type: "checkbox",
                        onChange: (_, selectedRows) =>
                          setSelectedAssigned(selectedRows),
                      }}
                      columns={columns}
                      dataSource={assignedAdmissions}
                      rowKey="id"
                      // pagination={{ pageSize: 5 }}
                      className="rounded-lg"
                    />
                    <Button
                      type="dashed"
                      onClick={handleRemove}
                      disabled={selectedAssigned.length === 0}
                      className="mt-4"
                    >
                      &larr; Remove
                    </Button>
                  </Card>
                </Col>
              </Row>
            )}
          </Form>
        ) : (
          <NoPermissionData />
        )}
      </Card>
    </div>
  );
};

export default ExamReceiptsPage;
