import { Space } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";

const classesColumns = (): ColumnsType<any> => {
  //   const dispatch = useDispatch();
  //   const [deleteCartItem] = useDeleteOrderItemMutation();

  //   const handleDelete = async (id: any) => {
  //     try {
  //       await deleteCartItem({ id }).unwrap();
  //       console.log("Item deleted successfully");
  //     } catch (error) {
  //       console.error("Failed to delete item:", error);
  //     }
  //   };

  return [
    {
      key: "0",
      title: "SL",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "Class Name",
      dataIndex: "Name",
      align: "center",
      sorter: (a, b) => a.title.localeCompare(b.title), // Sorting by title
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "2",
      title: "Section Name",
      dataIndex: "Name",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "3",
      title: "Male",
      align: "center",
      dataIndex: "live_link",
      render: (live_link) =>
        live_link ? (
          <a href={live_link} target="_blank" rel="noopener noreferrer">
            <GlobalOutlined />
          </a>
        ) : (
          "N/A"
        ),
    },
    {
      key: "4",
      title: "Female",
      dataIndex: "support_for",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "5",
      title: "Total Students",
      dataIndex: "price",
      align: "center",
      sorter: (a, b) => a.price - b.price, // Sorting by price
      render: (price) => (price ? price : "N/A"),
    },
    {
      key: "6",
      title: "Class Teacher Name",
      dataIndex: "price",
      align: "center",
      render: (price) => (price ? price : "N/A"),
    },
    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          {/* <EditButton
            onClick={() =>
              dispatch(
                showModal({
                  title: "Update Product",
                  content: <UpdateProduct record={record} />,
                })
              )
            }
          /> */}
          <ViewButton to={`student-view/1`} />
          {/* <DeleteButton 
          onClick={() => handleDelete(record.id)}>
            Delete
          </DeleteButton> */}
        </Space>
      ),
    },
  ];
};

export default classesColumns;
