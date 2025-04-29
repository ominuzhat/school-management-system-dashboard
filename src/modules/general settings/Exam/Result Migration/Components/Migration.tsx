import {
  Card,
  Col,
  Row,
  Select,
  Form as AntForm,
  Button,
  List,
  Switch,
} from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { useCreateResultMigrationMutation } from "../api/resultMigrationEndPoints";
import { useGetAdmissionSessionQuery } from "../../../admission session/api/admissionSessionEndPoints";
import { showModal } from "../../../../../app/features/modalSlice";
import CreateAdmissionSessions from "../../../admission session/components/CreateAdmissionSessions";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { useGetClassesQuery } from "../../../classes/api/classesEndPoints";
import { useGetTermQuery } from "../../api/termEndPoints";
import { useGetExamResultByTermQuery } from "../../Result/api/resultsEndPoints";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";

const Migration = () => {
  const [form] = AntForm.useForm();
  const dispatch = useDispatch();
  const term = AntForm.useWatch("term", form);
  const session = AntForm.useWatch("session", form);

  const [migrationMappings, setMigrationMappings] = useState<{ [key: number]: { value: number } }>({});

  const [create, { isLoading, isSuccess }] = useCreateResultMigrationMutation();
  const { data: termData }: any = useGetTermQuery({});
  const { data: sessionData } = useGetAdmissionSessionQuery({ status: "open" });
  const { data: classData }: any = useGetClassesQuery({});
  const { data: examResultByTerm }: any = useGetExamResultByTermQuery(
    session && term ? { session, term } : skipToken
  );

  const gradeLevels = examResultByTerm?.data?.exams?.[0]?.grade_levels || [];
  const examName = examResultByTerm?.data?.exams?.[0]?.name || "";

  const handleSelectChange = (gradeId: number, migrateId: number) => {
    setMigrationMappings((prev) => ({
      ...prev,
      [gradeId]: { value: migrateId },
    }));
  };

  const onFinish = (values: any): void => {
    const payload = {
      term: values.term,
      session: values.session,
      force: values.force || false,
      rollback: false,
      grade_levels: Object.entries(migrationMappings).map(
        ([id, migrateOption]) => ({
          id: parseInt(id),
          migrate_id: migrateOption.value,
        })
      ),
    };

    console.log("Submitted Payload:", payload);
    create(payload);
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        initialValues={{ force: false }}
      >
        <Row gutter={[16, 16]} justify="start" className="w-full">
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Select term"
              name="term"
              rules={[{ required: true, message: "Term is required!" }]}
            >
              <Select placeholder="Select term" className="w-full">
                {Array.isArray(termData?.data) &&
                  termData?.data.map((term: any) => (
                    <Select.Option key={term.id} value={term.id}>
                      {term.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={10}>
            <div className="flex items-center gap-4 w-full">
              <Form.Item
                label="Migrate Session"
                name="session"
                rules={[{ required: true, message: "Session is required!" }]}
                className="flex-grow"
              >
                <Select placeholder="Select Session" className="w-full">
                  {Array.isArray(sessionData?.data) &&
                    sessionData?.data.map((session: any) => (
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

          <Col xs={24} md={12} lg={6}>
            <Form.Item label="Force Migration" name="force" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <Card
          className="w-full mt-6"
          title="Migrate Class"
          headStyle={{
            fontWeight: "normal",
            fontSize: "16px",
            borderBottom: "none",
            textAlign: "center",
          }}
        >
          {examName && (
            <div className="text-center text-base font-semibold mb-4">
              Exam: {examName}
            </div>
          )}

          <Row gutter={[16, 16]} justify="center" className="w-full">
            <Col span={24}>
              <List
                dataSource={gradeLevels}
                renderItem={(gradeLevel: any) => {
                  const gradeAlreadyExists =
                    examResultByTerm?.data?.unique_grade_levels?.some(
                      (item: any) => item.name === gradeLevel.name
                    );

                  const filteredClassData = gradeAlreadyExists
                    ? classData?.data?.filter(
                        (cls: any) => cls.name !== gradeLevel.name
                      )
                    : classData?.data;

                  return (
                    <List.Item key={gradeLevel.id} className="!px-0">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center w-full gap-2 sm:gap-4 bg-gray-50 p-4 rounded-md shadow-sm">
                        <div className="text-sm font-medium min-w-[100px] text-gray-700">
                          {gradeLevel.name}
                        </div>
                        <Select
                          placeholder="Select Migration Grade"
                          className="w-full sm:w-[250px]"
                          onChange={(value) =>
                            handleSelectChange(gradeLevel.id, value)
                          }
                        >
                          {Array.isArray(filteredClassData) &&
                            filteredClassData.map((migrateGrade: any) => (
                              <Select.Option
                                key={migrateGrade.id}
                                value={migrateGrade.id}
                              >
                                {migrateGrade.name}
                              </Select.Option>
                            ))}
                        </Select>
                      </div>
                    </List.Item>
                  );
                }}
              />
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default Migration;
