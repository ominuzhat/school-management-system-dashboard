import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Form,
  Table,
  notification,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useCreateSubjectsMutation } from "../api/subjectsEndPoints";
import { useGetClassesQuery } from "../../classes/api/classesEndPoints";
import { useState } from "react";

interface ISubjectItem {
  name: string;
  grade_level: number;
  key: number;
}

const CreateSubject = () => {
  const { data: GetClassData } = useGetClassesQuery({});
  const [create, { isLoading }] = useCreateSubjectsMutation();
  const [form] = Form.useForm();
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
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
    if (!subjectName || !selectedClass) {
      notification.warning({
        message: "Warning",
        description: "Please enter a subject name and select a class",
      });
      return;
    }

    const newSubject: ISubjectItem = {
      name: subjectName,
      grade_level: selectedClass,
      key: nextKey,
    };

    setSubjects([...subjects, newSubject]);
    setNextKey(nextKey + 1);
    form.setFieldsValue({ name: "" });
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
      <Form form={form} onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <Form.Item label="Subject Name" name="name">
              <Input placeholder="Enter subject name" />
            </Form.Item>
          </Col>

          <Col lg={8}>
            <Form.Item
              label="Class"
              name="grade_level"
              rules={[{ required: true, message: "Please select a class" }]}
            >
              <Select
                placeholder="Select Class"
                className="w-full"
                onChange={(value) => setSelectedClass(value)}
              >
                {Array.isArray(GetClassData?.data) &&
                  GetClassData?.data?.map((data: any) => (
                    <Select.Option key={data.id} value={data.id}>
                      {data.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col lg={8} style={{ display: "flex", alignItems: "flex-end" }}>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={addSubject}
              style={{ marginBottom: 24 }}
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
              Create {subjects.length} Subject{subjects.length !== 1 ? "s" : ""}
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default CreateSubject;
