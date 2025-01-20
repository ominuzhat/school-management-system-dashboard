import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useDispatch } from "react-redux";
import EditButton from "../../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../../app/features/modalSlice";
import UpdateFees from "../components/UpdateFees";
import ViewButton from "../../../../../common/CommonAnt/Button/ViewButton";

const useFeesColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();
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
      title: "Fees Type",
      dataIndex: "fee_type",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "2",
      title: "Class",
      dataIndex: "grade_level",
      align: "center",
      render: (title) =>
        title ? title.map((data: any) => `${data.name}, `) : "N/A",
    },

    {
      key: "3",
      title: "Students",
      dataIndex: "student",
      align: "center",
      render: (title) =>
        title ? title.map((data: any) => `${data.user.username}, `) : "N/A",
    },
    {
      key: "4",
      title: "Subject",
      dataIndex: "subject",
      align: "center",
      render: (title) =>
        title ? title.map((data: any) => `${data.name}, `) : "N/A",
    },

    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          <EditButton
            onClick={() =>
              dispatch(
                showModal({
                  title: "Update Fees",
                  content: <UpdateFees record={record.id} />,
                })
              )
            }
          />
          <ViewButton to={`fees-view/${record?.id} `} />
          {/* <DeleteButton onClick={() => handleDelete(record.id)}>
            Delete
          </DeleteButton> */}
        </Space>
      ),
    },
  ];
};

export default useFeesColumns;
