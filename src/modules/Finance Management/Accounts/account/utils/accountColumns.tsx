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
      key: "2",
      title: "Type",
      dataIndex: "type",
      align: "center",
      render: (type) => (type ? capitalize(type) : "N/A"),
    },
    {
      key: "3",
      title: "Account Type",
      dataIndex: "account_type",
      align: "center",
      render: (val) => (val ? capitalize(val) : "N/A"),
    },
    {
      key: "4",
      title: "Account/Merchant Number",
      dataIndex: "account_or_merchant_number",
      align: "center",
      render: (val) => val ?? "N/A",
    },
    {
      key: "5",
      title: "Account Name",
      dataIndex: "account_name",
      align: "center",
      render: (val) => val ?? "N/A",
    },
    {
      key: "6",
      title: "Bank Name",
      dataIndex: "bank_name",
      align: "center",
      render: (val) => val ?? "N/A",
    },
    {
      key: "7",
      title: "Branch Name",
      dataIndex: "branch_name",
      align: "center",
      render: (val) => val ?? "N/A",
    },
    {
      key: "8",
      title: "Routing Number/API Key",
      dataIndex: "routing_number_or_apikey",
      align: "center",
      render: (val) => val ?? "N/A",
    },
    {
      key: "9",
      title: "Gateway URL",
      dataIndex: "gateway_url",
      align: "center",
      render: (val) => val ?? "N/A",
    },
    {
      key: "10",
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

          {deletePermission && (
            <DeleteButton
              disabled={false}
              onConfirm={() => handleDelete(record.id)}
            />
          )}
        </Space>
      ),
    },
  ];
};

export default useAccountColumns;
