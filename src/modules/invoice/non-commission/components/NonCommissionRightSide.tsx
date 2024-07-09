import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Space,
  Table,
  TableProps,
  Tag,
} from "antd";
import { useCreateRestaurantMutation } from "../../../Restaurants/api/restaurantsEndpoint";
import TextArea from "antd/es/input/TextArea";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
const NonCommissionRightSide = () => {
  const [create, { isLoading, isSuccess }] = useCreateRestaurantMutation();

  const onFinish = (values: any): void => {
    const formData: FormData = new FormData();

    console.log("vvv", values);

    // Object.entries(values).forEach(([key, value]) => {
    //   if (
    //     key === "restaurant_logo" &&
    //     Array.isArray(value) &&
    //     value[0]?.originFileObj
    //   ) {
    //     formData.append(key, value[0].originFileObj);
    //   } else {
    //     formData.append(key, value as string | Blob);
    //   }
    // });

    // create(formData);
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "SL",
      dataIndex: "SL",
      key: "SL",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ticket No",
      dataIndex: "Ticket No",
      key: "Ticket No",
    },
    {
      title: "Client Price",
      dataIndex: "Client Price",
      key: "Client Price",
    },
    {
      title: "Vendor Price",
      dataIndex: "Vendor Price",
      key: "Vendor Price",
    },
    {
      title: "Profit",
      dataIndex: "Profit",
      key: "Profit",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  //   const data: DataType[] = [
  //     {
  //       key: "1",
  //       name: "John Brown",
  //       age: 32,
  //       address: "New York No. 1 Lake Park",
  //     },
  //     {
  //       key: "2",
  //       name: "Jim Green",
  //       age: 42,
  //       address: "London No. 1 Lake Park",
  //       tags: ["loser"],
  //     },
  //     {
  //       key: "3",
  //       name: "Joe Black",
  //       age: 32,
  //       address: "Sydney No. 1 Lake Park",
  //       tags: ["cool", "teacher"],
  //     },
  //   ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={[]}
        bordered
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={1} colSpan={2}>
              Total
            </Table.Summary.Cell>
            <Table.Summary.Cell index={2} colSpan={1}>
              0
            </Table.Summary.Cell>
            <Table.Summary.Cell index={3} colSpan={1}>
              0
            </Table.Summary.Cell>
            <Table.Summary.Cell index={4} colSpan={1}>
              0
            </Table.Summary.Cell>
            <Table.Summary.Cell index={4} colSpan={1}></Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
      <Form
        onFinish={onFinish}
        // isLoading={isLoading}
        // isSuccess={isSuccess}
        initialValues={{ items: [{}] }}
        className="mt-5"
        autoComplete="off"
        layout="vertical"
      >
        <Row gutter={[6, 8]}>
          <Col lg={12}>
            <Form.Item<any> label="Discount" name="client">
              <Input placeholder="Discount" />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item<any> label="Service Charge" name="client">
              <Input placeholder="Service Charge" />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item<any> label="Vat / Tax" name="client">
              <Input placeholder="Vat / Tax" />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item<any> label="Net total" name="client">
              <Input placeholder="Net total" />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item<any> label="Agent Commission" name="client">
              <Input placeholder="Agent Commission" />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item<any> label="Reference" name="client">
              <Input placeholder="Reference" />
            </Form.Item>
          </Col>
          <Col lg={24}>
            <Form.Item<any> label="Note" name="client">
              <TextArea placeholder="Note Something" />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item<any>
              label="Show Prev Due in this invoice?"
              name="client"
            >
              <Radio.Group
                onChange={(e) => console.log("radio checked", e.target.value)}
                defaultValue={2}
              >
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item<any>
              label="Show discount in this invoice?
"
              name="client"
            >
              <Radio.Group
                onChange={(e) => console.log("radio checked", e.target.value)}
                defaultValue={1}
              >
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>{" "}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col lg={24}>
            <Button className="w-full" disabled>
              Add Money Receipt
            </Button>
          </Col>
          <Col lg={12}>
            <Button className="w-full" type="primary">
              CREATE
            </Button>
          </Col>
          <Col lg={12}>
            <Button className="w-full" type="primary">
              CREATE & PREVIEW
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default NonCommissionRightSide;
