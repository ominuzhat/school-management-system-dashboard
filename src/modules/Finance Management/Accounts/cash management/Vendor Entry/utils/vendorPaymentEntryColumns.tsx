import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Button, Space, Tag } from "antd";
import { useDispatch } from "react-redux";
import { useGetDashboardDataQuery } from "../../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../../utilities/permissionConstant";
import { capitalize } from "../../../../../../common/capitalize/Capitalize";
import EditButton from "../../../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../../../app/features/modalSlice";
import UpdateVendorPaymentEntry from "../components/UpdateVendorEntry";
import ViewVendorPaymentEntry from "../components/ViewVendorPaymentEntry";
import { FaEye } from "react-icons/fa6";

const useVendorPaymentEntryColumns = (): ColumnsType<any> => {
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
      title: "Account Name",
      dataIndex: "account_name",
      align: "center",
      render: (title) => (title ? capitalize(title) : "N/A"),
    },
    {
      key: "11",
      title: "Account Type",
      dataIndex: "account_type",
      align: "center",
      render: (title) => (title ? capitalize(title) : "N/A"),
    },
    {
      key: "111",
      title: "Type",
      dataIndex: "type",
      align: "center",
      render: (title) => (title ? capitalize(title) : "N/A"),
    },

    {
      key: "22",
      title: "Created By",
      dataIndex: "created_by",
      align: "center",
      render: (title) => (title ? title?.username : "N/A"),
    },
    // {
    //   key: "2",
    //   title: "Payment Method",
    //   dataIndex: "payment_method",
    //   align: "center",
    //   render: (method: string) => {
    //     const lowerMethod = method?.toLowerCase();
    //     let color: string;

    //     switch (lowerMethod) {
    //       case "card":
    //         color = "blue";
    //         break;
    //       case "cash":
    //         color = "orange";
    //         break;
    //       case "online":
    //         color = "purple";
    //         break;
    //       default:
    //         color = "default";
    //     }

    //     return (
    //       <Tag color={color} className="uppercase">
    //         {method ? method.toLowerCase() : "N/A"}
    //       </Tag>
    //     );
    //   },
    // },
    // {
    //   key: "3",
    //   title: "Entry Type",
    //   dataIndex: "entry_type",
    //   align: "center",
    //   render: (title) => (title ? capitalize(title) : "N/A"),
    // },

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
            {amount !== null && amount !== undefined ? amount : "N/A"}
          </Tag>
        );
      },
    },
    {
      key: "44",
      title: "Balance",
      dataIndex: "balance",
      align: "center",
      render: (amount: number) => {
        const isPositive = Number(amount) > 0;
        const color = isPositive ? "pink" : "red";

        return (
          <Tag color={color}>
            {amount !== null && amount !== undefined ? amount : "N/A"}
          </Tag>
        );
      },
    },

    {
      key: "5",
      title: "Payment Date",
      dataIndex: "payment_date",
      align: "center",
      render: (title) => (title ? dayjs(title).format("DD MMM YYYY") : "N/A"),
    },
    // {
    //   key: "6",
    //   title: "Description",
    //   dataIndex: "description",
    //   align: "center",
    //   render: (title) => (title ? title : "N/A"),
    // },

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
                    title: "Update Vendor Payment",
                    content: <UpdateVendorPaymentEntry record={record?.id} />,
                  })
                )
              }
            />
          )}
          <Button
            onClick={() =>
              dispatch(
                showModal({
                  title: "View Vendor Payment",
                  content: <ViewVendorPaymentEntry record={record?.id} />,
                })
              )
            }
            size="small"
            type="default"
            style={{
              color: "#3892E3",
              // background: "#3892E3",
              border: "1px solid #3892E3",
            }}
          >
            <FaEye />
            View
          </Button>
          {/* <DeleteButton
          onClick={() => handleDelete(record.id)}>
            Delete
          </DeleteButton> */}
        </Space>
      ),
    },
  ];
};

export default useVendorPaymentEntryColumns;
