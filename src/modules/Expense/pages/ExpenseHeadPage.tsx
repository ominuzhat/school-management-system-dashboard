import { Button, Card, Space, TableProps, Tag } from "antd";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {
  HarmonyOSOutlined,
  ManOutlined,
  PlusOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import { Table } from "../../../common/CommonAnt";
import EditButton from "../../../common/CommonAnt/Button/EditButton";
import ViewButton from "../../../common/CommonAnt/Button/ViewButton";
import DeleteButton from "../../../common/CommonAnt/Button/DeleteButton";
import { showModal } from "../../../app/features/modalSlice";
import CreateExpenseHead from "../components/CreateExpenseHead";
import { useDispatch } from "react-redux";

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

const ExpenseHeadPage = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card
        title="Expense Head"
        extra={
          <>
            <Button
              type="primary"
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Create Employee",
                    content: <CreateExpenseHead />,
                  })
                )
              }
              icon={<PlusOutlined />}
            >
              Create Expense Head
            </Button>
          </>
        }
      >
        <Table total={50} columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default ExpenseHeadPage;
