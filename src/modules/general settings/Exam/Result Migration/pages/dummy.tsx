import {
  Card,
  Col,
  Row,
  Select,
  Form as AntForm,
  Typography,
  Button,
  Table,
} from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { useGetExamQuery } from "../../api/examEndPoints";
import { useCreateResultMigrationMutation } from "../api/resultMigrationEndPoints";
import { useGetAdmissionSessionQuery } from "../../../admission session/api/admissionSessionEndPoints";
import { showModal } from "../../../../../app/features/modalSlice";
import CreateAdmissionSessions from "../../../admission session/components/CreateAdmissionSessions";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { useGetClassesQuery } from "../../../classes/api/classesEndPoints";
import { useState, useEffect } from "react";

const { Title } = Typography;

const ResultMigrationPage = () => {
  const [form] = AntForm.useForm();
  const dispatch = useDispatch();
  const exam = AntForm.useWatch("exam", form);

  const [create, { isLoading, isSuccess }] = useCreateResultMigrationMutation();

  const { data: classData } = useGetClassesQuery({});
  const { data: examData } = useGetExamQuery({});
  const { data: sessionData } = useGetAdmissionSessionQuery({});

  const gradeLevelList =
    Array.isArray(examData?.data) &&
    examData?.data?.filter((data: any) => data.id === exam);

  // Grade Levels from exam details
  //   const [gradeLevels, setGradeLevels] = useState<
  //     {
  //       id: number;
  //       name: string;
  //     }[]
  //   >([]);

  //   console.log("gradeLevels", gradeLevels);

  //   useEffect(() => {
  //     if (gradeLevelList) {
  //       const uniqueGradeLevels = Array.from(
  //         new Map(
  //           gradeLevelList?.map((record: any) => [
  //             record?.grade_level?.id,
  //             record?.grade_level,
  //           ])
  //         ).values()
  //       );
  //       setGradeLevels(uniqueGradeLevels as any);
  //     }
  //   }, []);

  const onFinish = (values: any): void => {
    // Format the data as required for submission
    console.log("values:", values);
    const formattedValues = {
      exam: values?.exam,
      session: values?.session,
      grade_levels: values?.students?.map((student: any) => ({
        id: student?.grade_level, // grade level id
        migrate_id: student?.migrated_class, // migrate class id
      })),
    };

    console.log("Formatted Values for Submission:", formattedValues);
    // Send the formatted data to the mutation or API
  };

  const columns = [
    {
      title: "Grade Level",
      dataIndex: "grade_level",
      key: "grade_level",
      render: (_: any, record: any) => (
        <Form.Item
          name={["students", record.id, "grade_level"] as any}
          initialValue={record.grade_level?.map((grade: any) => grade.id)} // Set multiple grade levels if necessary
        >
          <Select
            placeholder="Select Grade Level"
            className="w-full"
            disabled
            mode="multiple" // Enables selecting multiple options
          >
            {record.grade_level?.map((grade: any) => (
              <Select.Option key={grade.id} value={grade.id} disabled>
                {grade.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Migrate Class",
      dataIndex: "migrated_class",
      key: "migrated_class",
      render: (_: any, record: any) => (
        <Form.Item name={["students", record.id, "migrated_class"] as any}>
          <Select placeholder="Select Migrate Class" className="w-full">
            {Array.isArray(classData?.data) &&
              classData?.data?.map((classItem: any) => (
                <Select.Option key={classItem.id} value={classItem.id}>
                  {classItem.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card
        title={
          <Title level={3} className="text-center pt-6">
            Result Migration
          </Title>
        }
        className="rounded-lg shadow-xl border-0"
        headStyle={{ borderBottom: "none" }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          isLoading={isLoading}
          isSuccess={isSuccess}
        >
          <Row gutter={[16, 16]} justify="center">
            <Col xs={12} sm={12} lg={8}>
              <Form.Item
                label="Select Exam"
                name="exam"
                rules={[{ required: true, message: "Exam is required!" }]}
              >
                <Select placeholder="Select Exam" className="w-full">
                  {Array.isArray(examData?.data) &&
                    examData?.data?.map((exam: any) => (
                      <Select.Option key={exam.id} value={exam.id}>
                        {exam.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <div className="flex items-center justify-between w-full">
                <Form.Item
                  label="Select Session"
                  name="session"
                  rules={[{ required: true, message: "Session is required!" }]}
                >
                  <Select placeholder="Select Session" className="w-full">
                    {Array.isArray(sessionData?.data) &&
                      sessionData?.data?.map((session: any) => (
                        <Select.Option key={session.id} value={session.id}>
                          {session.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
                <Button
                  type="link"
                  onClick={() =>
                    dispatch(
                      showModal({
                        title: "Add New Session",
                        content: <CreateAdmissionSessions />,
                      })
                    )
                  }
                  icon={<PlusOutlined />}
                >
                  Add Session
                </Button>
              </div>
            </Col>
          </Row>

          {exam && (
            <Card className="max-w-screen-lg mx-auto my-10">
              <Table
                dataSource={gradeLevelList || []}
                columns={columns}
                rowKey="id"
                pagination={false}
              />
            </Card>
          )}
        </Form>
      </Card>
    </div>
  );
};

export default ResultMigrationPage;
