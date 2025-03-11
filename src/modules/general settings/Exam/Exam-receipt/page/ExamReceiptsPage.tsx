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

const { Title } = Typography;

const ExamReceiptsPage = () => {
  const [form] = AntForm.useForm();
  const exam = AntForm.useWatch("exam", form);

  const [create, { isLoading, isSuccess }] = useCreateExamReceiptMutation();
  const { data: examData } = useGetExamQuery({});
  const { data: examHallData, isLoading: classLoading } = useGetExamHallQuery(
    {}
  );
  const { data: examDetails } = useGetSingleExamQuery<any>(
    exam && Number(exam)
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
      title: "Name",
      dataIndex: ["student", "first_name"],
      render: (text: string, record: any) =>
        `${record.student.first_name} ${record.student.last_name}`,
    },
    { title: "Email", dataIndex: ["student", "email"] },
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
        <Form
          form={form}
          onFinish={onFinish}
          isLoading={isLoading}
          isSuccess={isSuccess}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
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

            <Col xs={24} md={12}>
              <Form.Item
                label="Exam Hall"
                name="hall"
                rules={[{ required: true, message: "Exam Hall is required!" }]}
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
              <Col xs={24} md={12}>
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

              <Col xs={24} md={12}>
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
      </Card>
    </div>
  );
};

export default ExamReceiptsPage;
