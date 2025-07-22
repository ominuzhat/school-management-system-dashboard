import type { ColumnsType } from "antd/es/table";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { capitalize } from "../../../../../common/capitalize/Capitalize";
import dayjs from "dayjs";
import { Button, Space, Tag, message } from "antd";
import { useCreateTransferApprovalMutation } from "../api/transactionEndPoints";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import EditButton from "../../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import RejectTransection from "../components/RejectTransection";

const useTransactionApprovalColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();

  const [createApproval] = useCreateTransferApprovalMutation();

  const [loadingState, setLoadingState] = useState<{
    [key: number]: "approved" | "rejected" | null;
  }>({});

  const handleApproval = async (id: number) => {
    try {
      setLoadingState((prev) => ({ ...prev, [id]: "approved" }));
      await createApproval({ id, data: {} }).unwrap();
      message.success("Transaction approved successfully");
    } catch (error) {
      message.error("Failed to approve transaction");
    } finally {
      setLoadingState((prev) => ({ ...prev, [id]: null }));
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
      title: "From",
      dataIndex: "account",
      align: "center",
      render: (text: any) => (
        <div className="flex items-center">
          <ArrowUpOutlined className="text-red-500 mr-2" />
          {capitalize(text?.account_type)} ({text?.balance})
        </div>
      ),
    },
    {
      key: "22",
      title: "To",
      dataIndex: "target_account",
      align: "center",
      render: (text: any) => (
        <div className="flex items-center">
          <ArrowDownOutlined className="text-green-500 mr-2" />
          {text ? `${capitalize(text?.account_type)} (${text?.balance})` : "-"}
        </div>
      ),
    },
    {
      key: "2",
      title: "Amount",
      dataIndex: "amount",
      align: "center",
      render: (text: any) => <div className="flex items-center">৳ {text}</div>,
    },
    {
      key: "3",
      title: "Transaction Type",
      dataIndex: "transaction_type",
      align: "center",
      render: (type: string | null) => {
        const lowerType = type?.toLowerCase?.() || null;

        let color = "default";
        if (lowerType === "credit") color = "green";
        else if (lowerType === "debit") color = "red";
        else if (lowerType === "transfer") color = "blue";

        return (
          <Tag color={color} className="uppercase">
            {lowerType || "-"}
          </Tag>
        );
      },
    },
    {
      key: "4",
      title: "Transaction Date",
      dataIndex: "transaction_date",
      align: "center",
      render: (title) => (title ? dayjs(title).format("DD MMM YYYY") : "-"),
    },
    {
      key: "5",
      title: "Actions",
      align: "center",
      render: (record: any) => (
        <Space>
          <Button
            size="small"
            type="primary"
            icon={<FaCheck />}
            loading={loadingState[record.id] === "approved"}
            onClick={() => handleApproval(record.id)}
          />

          <EditButton
            onClick={() =>
              dispatch(
                showModal({
                  title: "Reject Transaction",
                  content: <RejectTransection record={record?.id} />,
                })
              )
            }
          />
          {/* <Button
            size="small"
            danger
            icon={<RxCross1 />}
            loading={loadingState[record.id] === "rejected"}
            onClick={() => handleRejection(record.id)}
          /> */}
        </Space>
      ),
    },
  ];
};

export default useTransactionApprovalColumns;
