import { Col, Input, Row, Table, Button, message, Space } from "antd";
import { Form } from "../../../../common/CommonAnt";
import {
  useCreateTermMutation,
  useGetTermQuery,
  useDeleteTermMutation,
} from "../api/termEndPoints";

const CreateTerm = () => {
  const [create, { isLoading: isCreating, isSuccess }] =
    useCreateTermMutation();
  const { data: termData } = useGetTermQuery<any>({});
  const [deleteTerm] = useDeleteTermMutation();

  const onFinish = (values: any): void => {
    create(values);
  };

  const handleDelete = async (id: any) => {
    try {
      await deleteTerm(id).unwrap();
      message.success("Term deleted successfully");
    } catch (err) {
      message.error("Failed to delete term");
      console.error(err);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Term Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record?.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Form
        onFinish={onFinish}
        isLoading={isCreating}
        isSuccess={isSuccess}
        initialValues={{ name: "" }}
      >
        <Row gutter={[16, 16]}>
          <Col lg={12}>
            <Form.Item
              label="Term Name"
              name="name"
              rules={[{ required: true, message: "Term Name is required!" }]}
            >
              <Input placeholder="Enter Term Name" />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <div style={{ marginTop: 24 }}>
        <Table
          columns={columns}
          dataSource={termData?.data || []}
          rowKey="id"
          pagination={false}
        />
      </div>
    </div>
  );
};

export default CreateTerm;
