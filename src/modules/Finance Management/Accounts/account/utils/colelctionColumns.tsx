import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import ViewCollections from "../components/ViewCollections";
import { useDispatch } from "react-redux";
import { showModal } from "../../../../../app/features/modalSlice";
import { FaEye } from "react-icons/fa6";

const useCollectionColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();

  //   const { data: dashboardData } = useGetDashboardDataQuery({});

  //   const updatePermission = GetPermission(
  //     dashboardData?.data?.permissions,
  //     moduleNames.department,
  //     actionNames.change
  //   );
  //   const [deleteItem] = useDeleteDepartmentMutation();

  //   const deletePermission = GetPermission(
  //     dashboardData?.data?.permissions,
  //     moduleNames.department,
  //     actionNames.delete
  //   );

  //   const handleDelete = async (id: any) => {
  //     try {
  //       await deleteItem({ id }).unwrap();
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
      title: "Date",
      dataIndex: "date",
      align: "center",
      render: (date) => (date ? date : "-"),
    },
    {
      key: "4",
      title: "Collected By",
      dataIndex: "collected_by",
      align: "center",
      render: (name) => (name ? name : "-"),
    },

    {
      key: "2",
      title: "Total Collection",
      dataIndex: "total_collection",
      align: "center",
      render: (name) => (name ? name : "-"),
    },
    {
      key: "3",
      title: "Total Transactions",
      dataIndex: "total_transactions",
      align: "center",
      render: (name) => (name ? name : "-"),
    },

    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          <Button
            onClick={() =>
              dispatch(
                showModal({
                  title: "View Collection",
                  content: <ViewCollections record={record?.id} />,
                })
              )
            }
            title="View"
            size="small"
            type="default"
            style={{
              color: "#3892E3",
              // background: "#3892E3",
              border: "1px solid #3892E3",
            }}
          >
            <FaEye />
            View{" "}
          </Button>
        </Space>
      ),
    },
  ];
};

export default useCollectionColumns;
