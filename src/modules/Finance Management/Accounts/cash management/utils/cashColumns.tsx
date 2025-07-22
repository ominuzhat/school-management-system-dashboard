import type { ColumnsType } from "antd/es/table";

import { capitalize } from "../../../../../common/capitalize/Capitalize";
import dayjs from "dayjs";
import { Space, Tag } from "antd";
import EditButton from "../../../../../common/CommonAnt/Button/EditButton";
import UpdateCash from "../components/UpdateCash";
import { useDispatch } from "react-redux";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import { showModal } from "../../../../../app/features/modalSlice";

const useCashColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();
  const { data: dashboardData } = useGetDashboardDataQuery({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.financialentry,
    actionNames.change
  );

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
      title: "Account Type",
      dataIndex: "account",
      align: "center",
      render: (title) => (title ? capitalize(title?.account_type) : "-"),
    },
    {
      key: "2",
      title: "Payment Method",
      dataIndex: "payment_method",
      align: "center",
      render: (method: string) => {
        const lowerMethod = method?.toLowerCase();
        let color: string;

        switch (lowerMethod) {
          case "card":
            color = "blue";
            break;
          case "cash":
            color = "orange";
            break;
          case "online":
            color = "purple";
            break;
          default:
            color = "default";
        }

        return (
          <Tag color={color} className="uppercase">
            {method ? method.toLowerCase() : "-"}
          </Tag>
        );
      },
    },
    {
      key: "3",
      title: "Entry Type",
      dataIndex: "entry_type",
      align: "center",
      render: (title) => (title ? capitalize(title) : "-"),
    },

    {
      key: "4",
      title: "Amount",
      dataIndex: "amount",
      align: "center",
      render: (amount: number) => {
        const isPositive = Number(amount) > 0;
        const color = isPositive ? "green" : "red";

        return (
          <Tag color={color}>
            {amount !== null && amount !== undefined ? amount : "-"}
          </Tag>
        );
      },
    },

    {
      key: "5",
      title: "Date",
      dataIndex: "date",
      align: "center",
      render: (title) => (title ? dayjs(title).format("DD MMM YYYY") : "-"),
    },
    {
      key: "6",
      title: "Description",
      dataIndex: "description",
      align: "center",
      render: (title) => (title ? title : "-"),
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
                    title: "Update Cash",
                    content: <UpdateCash record={record?.id} />,
                  })
                )
              }
            />
          )}

          {/* <ViewButton to={`student-view/1`} /> */}
          {/* <DeleteButton
          onClick={() => handleDelete(record.id)}>
            Delete
          </DeleteButton> */}
        </Space>
      ),
    },
  ];
};

export default useCashColumns;
