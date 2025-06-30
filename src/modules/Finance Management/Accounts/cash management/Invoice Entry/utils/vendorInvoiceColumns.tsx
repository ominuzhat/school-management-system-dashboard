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
import UpdateInvoiceEntry from "../components/UpdateInvoiceEntry";
import ViewInvoiceEntry from "../components/ViewInvoiceEntry";
import { FaEye } from "react-icons/fa6";

const useVendorInvoiceColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();
  const { data: dashboardData } = useGetDashboardDataQuery({});

  const updatePermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.financialentry,
    actionNames.change
  );

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
      key: "11",
      title: "Vendor Name",
      dataIndex: "vendor",
      align: "center",
      render: (val) => val?.name || "N/A",
    },
    {
      key: "1",
      title: "Invoice Number",
      dataIndex: "invoice_number",
      align: "center",
      render: (val) => val || "N/A",
    },
    {
      key: "2",
      title: "Amount",
      dataIndex: "amount",
      align: "center",
      render: (amount) => (
        <Tag color="green">
          {amount !== null && amount !== undefined ? amount : "N/A"}
        </Tag>
      ),
    },
    {
      key: "3",
      title: "Amount Due",
      dataIndex: "amount_due",
      align: "center",
      render: (amount_due) => (
        <Tag color="red">
          {amount_due !== null && amount_due !== undefined ? amount_due : "N/A"}
        </Tag>
      ),
    },
    {
      key: "4",
      title: "Payment Status",
      dataIndex: "payment_status",
      align: "center",
      render: (status: string) => {
        const color =
          status === "unpaid" ? "red" : status === "paid" ? "green" : "orange";
        return <Tag color={color}>{capitalize(status)}</Tag>;
      },
    },

    {
      key: "6",
      title: "Date",
      dataIndex: "date",
      align: "center",
      render: (val) => (val ? dayjs(val).format("DD MMM YYYY") : "N/A"),
    },
    {
      key: "8",
      title: "Created By",
      dataIndex: "created_by",
      align: "center",
      render: (user) => user?.username || "N/A",
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
                    title: "Update Invoice Entry",
                    content: <UpdateInvoiceEntry record={record?.id} />,
                  })
                )
              }
            />
          )}

          <Button
            onClick={() =>
              dispatch(
                showModal({
                  title: "Invoice",
                  content: <ViewInvoiceEntry record={record?.id} />,
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
            View
          </Button>

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

export default useVendorInvoiceColumns;
