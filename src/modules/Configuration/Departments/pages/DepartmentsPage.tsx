import { Button, Card, Col, Row, Space, TableProps } from "antd";
import {
  HarmonyOSOutlined,
  ManOutlined,
  PlusOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import DeleteButton from "../../../../common/CommonAnt/Button/DeleteButton";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { Table } from "../../../../common/CommonAnt";
import CreateDepartmentModal from "../components/CreateDepartmentModal";

interface DataType {
  key: string;
  name: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "SL",
    dataIndex: "SL",
    key: "SL",
    render: (_text, _record, index) => <a>{index + 1}</a>,
    width: 200,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 800,
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
  },
  {
    key: "2",
    name: "Jim Green",
  },
  {
    key: "3",
    name: "Joe Black",
  },
];

const DepartmentPage = () => {
  const handleSearch = (value: string) => {
    console.log("Search Value:", value);
  };
  const dispatch = useDispatch();
  return (
    <div className="space-y-5">
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row justify="space-between">
          <Col lg={4}>
            <Button
              type="primary"
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Create Department",
                    content: <CreateDepartmentModal />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Create Department
            </Button>
          </Col>
          <Col lg={6}>
            <SearchComponent
              onSearch={handleSearch}
              placeholder="Enter Your Department"
            />
          </Col>
        </Row>
      </Card>

      <Table total={50} columns={columns} dataSource={data} />
    </div>
  );
};

export default DepartmentPage;
