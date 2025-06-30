import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Form,
  Table,
  notification,
  Switch,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useCreateSubjectsMutation } from "../api/subjectsEndPoints";
import { useGetClassesQuery } from "../../classes/api/classesEndPoints";
import { useState } from "react";

interface ISubjectItem {
  name: string;
  grade_level: number;
  general: boolean;
  group?: string;
  key: number;
}

const CreateSubject = () => {
  const { data: GetClassData } = useGetClassesQuery({});
  const [create, { isLoading }] = useCreateSubjectsMutation();
  const [form] = Form.useForm();
  const [general, setGeneral] = useState<boolean>(true);
  const [group, setGroup] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<ISubjectItem[]>([]);
  const [nextKey, setNextKey] = useState(1);

  const onFinish = async (): Promise<void> => {
    if (subjects.length === 0) {
      notification.warning({
        message: "Warning",
        description: "Please add at least one subject",
      });
      return;
    }

    try {
      await create(subjects as any);
      setSubjects([]);
      setNextKey(1);
      form.resetFields();
      setGeneral(true);
      setGroup(null);
      notification.success({
        message: "Success",
        description: "Subjects created successfully",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to create subjects",
      });
    }
  };

  const addSubject = (): void => {
    const subjectName = form.getFieldValue("name");
    const gradeLevel = form.getFieldValue("grade_level");

    if (!subjectName || !gradeLevel) {
      notification.warning({
        message: "Warning",
        description: "Please enter a subject name and select a class",
      });
      return;
    }

    if (!general && !group) {
      notification.warning({
        message: "Warning",
        description: "Please select a group",
      });
      return;
    }

    const newSubject: ISubjectItem = {
      name: subjectName,
      grade_level: gradeLevel,
      general: general,
      group: general ? undefined : group || undefined,
      key: nextKey,
    };

    setSubjects([...subjects, newSubject]);
    setNextKey(nextKey + 1);

    // Reset input fields but keep group if general is false
    form.setFieldsValue({ name: "" });

    if (general) {
      setGroup(null); // Only clear group if general is true
    }
  };

  const removeSubject = (key: number): void => {
    setSubjects(subjects.filter((subject) => subject.key !== key));
  };

  const columns = [
    {
      title: "Subject Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Class",
      dataIndex: "grade_level",
      key: "grade_level",
      render: (value: number) => {
        const classItem =
          Array.isArray(GetClassData?.data) &&
          GetClassData?.data?.find((item: any) => item.id === value);
        return classItem?.name || value;
      },
    },
    {
      title: "General",
      dataIndex: "general",
      key: "general",
      render: (value: boolean) => (value ? "Yes" : "No"),
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
      render: (value: string) => value || "-",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: ISubjectItem) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeSubject(record.key)}
        />
      ),
    },
  ];

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item label="Subject Name" name="name">
              <Input placeholder="Enter subject name" />
            </Form.Item>
          </Col>

          <Col lg={6}>
            <Form.Item
              label="Class"
              name="grade_level"
              rules={[{ required: true, message: "Please select a class" }]}
            >
              <Select placeholder="Select Class" className="w-full">
                {Array.isArray(GetClassData?.data) &&
                  GetClassData?.data?.map((data: any) => (
                    <Select.Option key={data.id} value={data.id}>
                      {data.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col lg={4}>
            <Form.Item label="General" valuePropName="checked">
              <Switch
                checked={general}
                onChange={(checked) => {
                  setGeneral(checked);
                  if (checked) setGroup(null); // clear group if switched back to general
                }}
              />
            </Form.Item>
          </Col>

          {!general && (
            <Col lg={6}>
              <Form.Item label="Group">
                <Select
                  placeholder="Select Group"
                  value={group || undefined}
                  onChange={(value) => setGroup(value)}
                >
                  <Select.Option value="Science">Science</Select.Option>
                  <Select.Option value="Commerce">Commerce</Select.Option>
                  <Select.Option value="Arts">Arts</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          )}

          <Col lg={24} style={{ display: "flex", alignItems: "flex-end" }}>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={addSubject}
              style={{ marginBottom: 24 }}
              className="w-full"
            >
              Add Subject
            </Button>
          </Col>
        </Row>

        {subjects.length > 0 && (
          <>
            <Table
              columns={columns}
              dataSource={subjects}
              pagination={false}
              rowKey="key"
              style={{ marginBottom: 16 }}
            />
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={subjects.length === 0}
            >
              Create {subjects.length} Subject
              {subjects.length !== 1 ? "s" : ""}
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default CreateSubject;
