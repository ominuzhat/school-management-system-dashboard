import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";

import dayjs from "dayjs";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const useExamColumns = (): ColumnsType<any> => {
  // const [deleteCartItem] = useDeleteOrderItemMutation();

  // const handleDelete = async (id: any) => {
  //   try {
  //     await deleteCartItem({ id }).unwrap();
  //     console.log("Item deleted successfully");
  //   } catch (error) {
  //     console.error("Failed to delete item:", error);
  //   }
  // };

  return [
    {
      key: "0",
      title: "SL",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "Exam Name",
      dataIndex: "name",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "2",
      title: "Class",
      dataIndex: "grade_level",
      align: "center",
      render: (title) => (title ? title?.name : "N/A"),
    },
    {
      key: "2",
      title: "Term",
      dataIndex: "term",
      align: "center",
      render: (title) => (title ? title?.name : "N/A"),
    },

    {
      key: "3",
      title: "Start Date",
      dataIndex: "start_date",
      align: "center",
      render: (title) => (title ? dayjs(title).format("DD MMM YYYY") : "N/A"),
    },
    {
      key: "3",
      title: "End Date",
      dataIndex: "end_date",
      align: "center",
      render: (title) => (title ? dayjs(title).format("DD MMM YYYY") : "N/A"),
    },
    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          <Link to={`${record.id}`}>
            <Button
              title="Edit"
              size="small"
              type="default"
              style={{
                color: "#FFA500",
                border: "1px solid #FFA500",
              }}
            >
              <FaEdit />
            </Button>
          </Link>
          <ViewButton to={`view/${record?.id}`} />
          {/* <DeleteButton
          onClick={() => handleDelete(record.id)}>
            Delete
          </DeleteButton> */}
        </Space>
      ),
    },
  ];
};

export default useExamColumns;
