import { Space } from "antd";

import type { ColumnsType } from "antd/es/table";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import { useNavigate } from "react-router-dom";

const useRoutineColumns = (): ColumnsType<any> => {
  const navigate = useNavigate();
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
      dataIndex: "grade_level",
      align: "center",
      render: (title) => (title ? title?.name : "N/A"),
    },
    {
      key: "2",
      title: "Section Name",
      dataIndex: "section",
      align: "center",
      render: (title) => (title ? title?.name : "N/A"),
    },
    {
      key: "3",
      title: "Session Name",
      dataIndex: "session",
      align: "center",
      render: (title) => (title ? title?.name : "N/A"),
    },

    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
                 <EditButton onClick={() => navigate(`/routine/update/${record?.id}`)} />

          <ViewButton to={`/routine/view/${record?.id}`} />

          {/* <DeleteButton 
          onClick={() => handleDelete(record.id)}>
            Delete
          </DeleteButton> */}
        </Space>
      ),
    },
  ];
};

export default useRoutineColumns;
