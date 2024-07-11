import { Button, Card, Col, Row, Space, TableProps, Tag } from "antd";
import {
  HarmonyOSOutlined,
  ManOutlined,
  PlusOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { Table } from "../../../../common/CommonAnt";
import { Link } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <EditButton>Edit</EditButton>
        <ViewButton to="/">View</ViewButton>
        <DeleteButton>Delete</DeleteButton>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const NonCommissionPage = () => {
  const handleSearch = (value: string) => {
    console.log("Search Value:", value);
  };
  //   const dispatch = useDispatch();
  return (
    <div className="space-y-5">
      <Card>
        <Row justify="space-between">
          <Col lg={4}>
            <Link to="/invoice/non-commission-air-ticket">
              <Button type="primary" icon={<PlusOutlined />}>
                {" "}
                Create Non Commission Air Ticket
              </Button>
            </Link>

            {/* <Button
              type="primary"
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Create Non Commission Air Ticket",
                    content: <CreateNonCommision />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Create Non Commission Air Ticket
            </Button> */}
          </Col>
          <Col lg={6}>
            <SearchComponent
              onSearch={handleSearch}
              placeholder="Enter Your Non Commission Air Ticket"
            />
          </Col>
        </Row>
      </Card>

      <Table total={50} columns={columns} dataSource={data} />
    </div>
  );
};

export default NonCommissionPage;
