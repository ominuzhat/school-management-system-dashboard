import { Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch } from "react-redux";
import EditButton from "../../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../../app/features/modalSlice";
import UpdateAccount from "../components/UpdateAccount";
import { capitalize } from "../../../../../common/capitalize/Capitalize";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import { useDeleteAccountMutation } from "../api/accountEndPoints";
import DeleteButton from "../../../../../common/CommonAnt/Button/DeleteButton";

const useAccountColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();
  const { data: dashboardData } = useGetDashboardDataQuery({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.account,
    actionNames.change
  );

  const [deleteItem] = useDeleteAccountMutation();

  const deletePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.account,
    actionNames.delete
  );

  const handleDelete = async (id: any) => {
    try {
      await deleteItem({ id }).unwrap();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return [
    {
      key: "0",
      title: "SL",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "Account Type",
      dataIndex: "account_type",
      align: "center",
      render: (title) => (title ? capitalize(title) : "N/A"),
    },
    {
      key: "2",
      title: "Balance",
      dataIndex: "balance",
      align: "center",
      render: (balance: number) => {
        const isPositive = Number(balance) > 0;
        const color = isPositive ? "green" : "red";

        return (
          <Tag color={color}>
            {balance !== null && balance !== undefined ? balance : "N/A"}
          </Tag>
        );
      },
    },

    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          {updatePermission && (
            <EditButton
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Update Account",
                    content: <UpdateAccount record={record?.id} />,
                  })
                )
              }
            />
          )}

          {/* <ViewButton to={`student-view/1`} />
           */}

          {deletePermission && (
            <DeleteButton
              disabled
              onConfirm={() => handleDelete(record.id)}
            ></DeleteButton>
          )}
        </Space>
      ),
    },
  ];
};

export default useAccountColumns;
