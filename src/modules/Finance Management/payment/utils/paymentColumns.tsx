import { Space, Tag } from "antd";

import type { ColumnsType } from "antd/es/table";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { useDispatch } from "react-redux";
import { showModal } from "../../../../app/features/modalSlice";
import ViewButton from "../../../../common/CommonAnt/Button/ViewButton";
import UpdatePayment from "../components/UpdatePayment";

const usePaymentColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();
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
      title: "Name",
      dataIndex: "payroll",
      align: "center",
      render: (payroll) => {
        if (payroll?.employee) {
          return `${payroll?.employee?.first_name} ${payroll?.employee?.last_name}`;
        } else if (payroll?.teacher) {
          return `${payroll?.teacher?.first_name} ${payroll?.teacher?.last_name}`;
        }
        return "N/A";
      },
    },
    {
      key: "1",
      title: "Period Date",
      dataIndex: "payroll",
      align: "center",
      render: (payroll) =>
        payroll
          ? payroll?.period_start + " ------- " + payroll?.period_end
          : "N/A",
    },
    {
      key: "1",
      title: "Payment Date",
      dataIndex: "payment_date",
      align: "center",
      render: (payroll) => (payroll ? payroll : "N/A"),
    },
    {
      key: "1",
      title: "Attendance Days",
      dataIndex: "payroll",
      align: "center",
      render: (payroll) => (payroll ? payroll?.attendance_days : "N/A"),
    },
    {
      key: "1",
      title: "Net Salary",
      dataIndex: "payroll",
      align: "center",
      render: (payroll) => (payroll ? payroll?.net_salary : "N/A"),
    },
    {
      key: "1",
      title: "Paid Amount",
      dataIndex: "amount_paid",
      align: "center",
      render: (amount) => (amount ? amount : "N/A"),
    },
    {
      key: "1",
      title: "Payment Method",
      dataIndex: "payment_method",
      align: "center",
      render: (method) => (method ? <Tag color="green">{method}</Tag> : "N/A"),
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
                  title: "Update Payment",
                  content: <UpdatePayment record={record?.id} />,
                })
              )
            }
          />

          <ViewButton to={`payment-view/${record?.id}`} />
        </Space>
      ),
    },
  ];
};

export default usePaymentColumns;
