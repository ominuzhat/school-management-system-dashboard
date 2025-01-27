import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useDispatch } from "react-redux";
import { showModal } from "../../../../app/features/modalSlice";

const usePayrollColumns = (): ColumnsType<any> => {
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
      title: "Employee Name",
      dataIndex: "employee",
      align: "center",
      render: (employee) => `${employee.first_name} ${employee.last_name}`,
    },
    {
      key: "2",
      title: "Department Name",
      dataIndex: "employee",
      align: "center",
      render: (employee) =>
        employee.department?.name ? employee.department.name : "N/A",
    },
    {
      key: "3",
      title: "Gross Salary",
      dataIndex: "gross_salary",
      align: "center",
      render: (gross_salary) => `৳${gross_salary.toFixed(2)}`,
    },
    {
      key: "4",
      title: "Net Salary",
      dataIndex: "net_salary",
      align: "center",
      render: (net_salary) => `৳${net_salary.toFixed(2)}`,
    },
    {
      key: "5",
      title: "Paid Amount",
      dataIndex: "paid_Amount",
      align: "center",
      render: (paid_Amount) => `৳${paid_Amount.toFixed(2)}`,
    },
    {
      key: "6",
      title: "Due Amount",
      dataIndex: "due_Amount",
      align: "center",
      render: (due_Amount) => `৳${due_Amount.toFixed(2)}`,
    },
    {
      key: "7",
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          <button
            onClick={() =>
              dispatch(
                showModal({
                  title: "Update Employee",
                  content: `Update details for ${record.employee.first_name} ${record.employee.last_name}`,
                })
              )
            }
          >
            Edit
          </button>
          <button
            onClick={() => {
              // Handle delete action
              console.log("Deleting record:", record.id);
            }}
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];
};

export default usePayrollColumns;
