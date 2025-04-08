import {
  Card,
  Col,
  Row,
  Select,
  Form as AntForm,
  Typography,
  Button,
  List,
} from "antd";
import { Form } from "../../../../../common/CommonAnt";
import { useGetExamQuery } from "../../api/examEndPoints";
import { useCreateResultMigrationMutation } from "../api/resultMigrationEndPoints";
import { useGetAdmissionSessionQuery } from "../../../admission session/api/admissionSessionEndPoints";
import { showModal } from "../../../../../app/features/modalSlice";
import CreateAdmissionSessions from "../../../admission session/components/CreateAdmissionSessions";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useGetClassesQuery } from "../../../classes/api/classesEndPoints";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../../utilities/NoPermissionData";

const { Title } = Typography;

const ResultMigrationPage = () => {
  const [form] = AntForm.useForm();
  const dispatch = useDispatch();
  const exam = AntForm.useWatch("exam", form);
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.exam,
    actionNames.add
  );

  const [create, { isLoading, isSuccess }] = useCreateResultMigrationMutation();

  const { data: examData }: any = useGetExamQuery({});
  const { data: sessionData } = useGetAdmissionSessionQuery({ status: "open" });
  const { data: classData }: any = useGetClassesQuery({});

  const selectedExam = examData?.data?.find((e: any) => e.id === exam);
  const gradeLevels = selectedExam?.grade_level || [];

  const [migrationMappings, setMigrationMappings] = useState<{
    [key: number]: { value: number; label: string };
  }>({});

  const handleMigrationChange = (
    gradeLevelId: number,
    option: { value: number; label: string }
  ) => {
    setMigrationMappings((prev) => ({
      ...prev,
      [gradeLevelId]: option,
    }));
  };

  const onFinish = (values: any): void => {
    const payload = {
      exam: values.exam,
      session: values.session,
      grade_levels: Object.entries(migrationMappings).map(
        ([id, migrateOption]) => ({
          id: parseInt(id),
          migrate_id: migrateOption.value,
        })
      ),
    };
    console.log("Submitted Values:", payload);
    create(payload);
  };

  const getFilteredMigrationOptions = (currentGradeLevelId: number) => {
    return classData?.data?.filter((migrateGrade: any) => {
      if (migrateGrade.id === currentGradeLevelId) return false;

      const isSelected = Object.values(migrationMappings).some(
        (migrateOption) => migrateOption.value === migrateGrade.id
      );
      return !isSelected;
    });
  };

  return (
    <div className="p-6">
      <Card
        title={
          <Title level={3} className="text-center pt-6">
            Migration
          </Title>
        }
        className="rounded-lg shadow-xl border-0"
        headStyle={{ borderBottom: "none" }}
      >
        {createPermission ? (
          <Form
            form={form}
            onFinish={onFinish}
            isLoading={isLoading}
            isSuccess={isSuccess}
          >
            <Row gutter={[16, 16]} justify="center">
              <Col xs={12} sm={12} lg={6}>
                <Form.Item
                  label="Select Exam"
                  name="exam"
                  rules={[{ required: true, message: "Exam is required!" }]}
                >
                  <Select placeholder="Select Exam">
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
                <div className="flex items-center gap-4 w-full">
                  <Form.Item
                    label="Migrate Session"
                    name="session"
                    rules={[
                      { required: true, message: "Session is required!" },
                    ]}
                  >
                    <Select placeholder="Select Session">
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

            <Card
              className="max-w-screen-lg mx-auto"
              title="Migrate Class"
              headStyle={{
                fontWeight: "normal",
                fontSize: "16px",
                borderBottom: "none",
                textAlign: "center",
              }}
            >
              <Row
                gutter={[16, 16]}
                justify="center"
                align="middle"
                className="mt-6"
              >
                <Col span={16}>
                  <List
                    dataSource={gradeLevels}
                    renderItem={(gradeLevel: any) => (
                      <List.Item key={gradeLevel.id}>
                        <div className="flex justify-between items-center w-full">
                          <span>{gradeLevel.name}</span>
                          <Select
                            placeholder="Select Migration Grade"
                            style={{ width: 200 }}
                            labelInValue
                            value={migrationMappings[gradeLevel.id]}
                            onChange={(value) =>
                              handleMigrationChange(gradeLevel.id, value)
                            }
                          >
                            {Array.isArray(classData?.data) &&
                              getFilteredMigrationOptions(gradeLevel.id)?.map(
                                (migrateGrade: any) => (
                                  <Select.Option
                                    key={migrateGrade.id}
                                    value={migrateGrade.id}
                                  >
                                    {migrateGrade.name}
                                  </Select.Option>
                                )
                              )}
                          </Select>
                        </div>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </Card>
          </Form>
        ) : (
          <NoPermissionData />
        )}
      </Card>
    </div>
  );
};

export default ResultMigrationPage;
