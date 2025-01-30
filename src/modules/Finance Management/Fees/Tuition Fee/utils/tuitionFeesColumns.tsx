import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useDispatch } from "react-redux";
import EditButton from "../../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../../app/features/modalSlice";
import UpdateTuitionFee from "../component/UpdateTuitionFee";

// Define the columns function based on your provided structure
const useTuitionFeesColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();

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
      dataIndex: "admission",
      align: "center",
      render: (admission) =>
        `${admission?.student?.first_name} ${admission?.student?.last_name}`,
    },
    {
      key: "22",
      title: "Username",
      dataIndex: "admission",
      align: "center",
      render: (admission) => `${admission?.student?.user.username}`,
    },
    {
      key: "1",
      title: "Registration Number",
      dataIndex: "admission",
      align: "center",
      render: (admission) => `${admission?.registration_number} `,
    },
    {
      key: "1",
      title: "Fees",
      dataIndex: "fees",
      align: "center",
      render: (fees) => {
        if (fees && fees.length > 0) {
          return fees.map((fee: any) => fee.name).join(", ");
        }
        return "N/A";
      },
    },
    {
      key: "2",
      title: "Gross Amount",
      dataIndex: "gross_amount",
      align: "center",
      render: (amount) => (amount ? amount : "N/A"),
    },
    {
      key: "3",
      title: "Net Amount",
      dataIndex: "net_amount",
      align: "center",
      render: (amount) => (amount ? amount : "N/A"),
    },
    {
      key: "4",
      title: "Paid Amount",
      dataIndex: "paid_amount",
      align: "center",
      render: (amount) => amount,
    },
    {
      key: "5",
      title: "Month",
      dataIndex: "month",
      align: "center",
      render: (month) => month,
    },
    {
      key: "6",
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (status) =>
        status ? (
          <Tag color={`${status === "paid" ? "green" : "red"}`}> {status}</Tag>
        ) : (
          "N/A"
        ),
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
                  title: "Update Tuition Fees",
                  content: <UpdateTuitionFee record={record?.id} />,
                })
              )
            }
          />
        </Space>
      ),
    },
  ];
};

export default useTuitionFeesColumns;
