import { useState } from "react";
import {
  LuClock2,
  LuArrowUpRight,
  LuArrowDownLeft,
  LuCheck,
  LuCircle,
  LuEye,
  LuWallet,
  LuBanknote,
  LuCreditCard,
} from "react-icons/lu";
import {
  Card,
  Button,
  Tag,
  message,
  Avatar,
  Divider,
  Modal,
  Form,
  Input,
} from "antd";
import { useAppSelector } from "../../../../../app/store";
import { FilterState } from "../../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../../utilities/NoPermissionData";
import {
  useCreateTransferApprovalMutation,
  useCreateTransferRejectMutation,
  useGetTransferRequestQuery,
} from "../../Transaction/api/transactionEndPoints";
import { capitalize } from "../../../../../common/capitalize/Capitalize";
import dayjs from "dayjs";
import { showModal } from "../../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import ApprovalHistory from "./ApprovalHistory";

const { TextArea } = Input;

interface RejectTransectionProps {
  record: number;
  onSuccess?: () => void;
}

const RejectTransection = ({ record, onSuccess }: RejectTransectionProps) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rejectTransfer] = useCreateTransferRejectMutation();

  const onFinish = async (values: { reason: string }) => {
    try {
      setIsSubmitting(true);
      await rejectTransfer({
        id: record,
        data: { reason: values.reason },
      }).unwrap();

      message.success("Transaction rejected successfully");
      form.resetFields();
      onSuccess?.();
    } catch (err) {
      message.error("Failed to reject transaction");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-100 rounded-full">
          <LuCircle className="text-red-600 text-2xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Reject Transaction
          </h2>
          <p className="text-gray-600">Please provide a reason for rejection</p>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-4"
      >
        <Form.Item
          name="reason"
          label="Rejection Reason"
          rules={[
            { required: true, message: "Please enter a rejection reason" },
            { min: 10, message: "Reason must be at least 10 characters" },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Explain why you're rejecting this transaction..."
            className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
          />
        </Form.Item>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            onClick={() => Modal.destroyAll()}
            className="border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            danger
            htmlType="submit"
            loading={isSubmitting}
            icon={<LuCircle />}
            className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
          >
            Confirm Rejection
          </Button>
        </div>
      </Form>
    </div>
  );
};

export const getAccountIcon = (type: string) => {
  switch (type?.toLowerCase()) {
    case "cash":
      return <LuWallet className="text-blue-500" />;
    case "bank":
      return <LuBanknote className="text-green-500" />;
    case "mfs":
      return <LuCreditCard className="text-purple-500" />;
    default:
      return <LuWallet className="text-gray-500" />;
  }
};

export const statusTag = (status: string) => {
  switch (status?.toLowerCase()) {
    case "requested":
      return (
        <Tag
          icon={<LuClock2 />}
          color="orange"
          className="flex items-center gap-1"
        >
          Pending
        </Tag>
      );
    case "approved":
      return (
        <Tag
          icon={<LuCheck />}
          color="green"
          className="flex items-center gap-1"
        >
          Approved
        </Tag>
      );
    case "rejected":
      return (
        <Tag
          icon={<LuCircle />}
          color="red"
          className="flex items-center gap-1"
        >
          Rejected
        </Tag>
      );
    default:
      return <Tag>{capitalize(status)}</Tag>;
  }
};

export const formatDate = (dateString: string) => {
  return dayjs(dateString).format("DD MMM YYYY, hh:mm A");
};

const ApprovalPage = () => {
  const dispatch = useDispatch();
  const [showHistory, setShowHistory] = useState(false);

  const { page_size, page } = useAppSelector(FilterState);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [loadingState, setLoadingState] = useState<{
    [key: number]: "approved" | "rejected" | null;
  }>({});

  // API hooks
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const { data: transactionList } = useGetTransferRequestQuery({
    page_size: page_size,
    page: Number(page) || undefined,
    status: "pending",
  });
  const [createApproval] = useCreateTransferApprovalMutation();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.transaction,
    actionNames.view
  );

  const transactions = transactionList?.data?.results || [];

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

  const handleReject = (recordId: number) => {
    dispatch(
      showModal({
        title: "Reject Transaction",
        content: <RejectTransection record={recordId} />,
      })
    );
  };

  const showTransactionDetails = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsDetailModalVisible(true);
  };

  if (!viewPermission) {
    return <NoPermissionData />;
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="rounded-xl shadow-sm border-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="p-3 bg-green-100 rounded-full">
              <LuClock2 className="text-green-600 text-3xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Approval System
              </h1>
              <p className="text-gray-600">
                Approve staff payment & fee collection requests
              </p>
              {showHistory ? (
                <>
                  <button
                    className="text-blue-600 mb-4"
                    onClick={() => setShowHistory(false)}
                  >
                    Back
                  </button>
                </>
              ) : (
                <p
                  className="text-gray-600 cursor-pointer underline"
                  onClick={() => setShowHistory(true)}
                >
                  Requested History
                </p>
              )}{" "}
            </div>
          </div>
          <div className="bg-green-100 text-green-700 font-medium px-4 py-2 rounded-full">
            {transactions.length} Pending Requests
          </div>
        </div>
      </Card>

      {showHistory ? (
        <ApprovalHistory />
      ) : (
        <>
          {/* Transaction Cards */}
          {transactions.length === 0 ? (
            <Card className="text-center p-8">
              <p className="text-gray-500">
                No pending approval requests found
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction: any) => (
                <Card
                  key={transaction.id}
                  className="rounded-xl hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-6">
                    {/* Transaction Info */}
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full text-sm">
                          #{transaction.id}
                        </span>
                        {statusTag(transaction.approval_status)}
                        <span className="text-sm text-gray-500">
                          {formatDate(transaction.transaction_date)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <Avatar className="bg-blue-100 text-blue-600">
                            {getAccountIcon(transaction.account?.type)}
                          </Avatar>
                          <div>
                            <p className="font-semibold">
                              <span className="font-normal mr-2">
                                Requested By:{" "}
                              </span>{" "}
                              {capitalize(transaction.requested_by)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <Avatar className="bg-green-100 text-green-600">
                            {getAccountIcon(
                              transaction.destination_account?.type
                            )}
                          </Avatar>
                          <div>
                            <p className="font-semibold">
                              <span className="font-normal mr-2">
                                Destination Account:
                              </span>{" "}
                              {capitalize(
                                transaction.destination_account?.account_type
                              ) ||
                                capitalize(
                                  transaction.destination_account?.type
                                ) ||
                                "N/A"}
                            </p>
                            <p className="text-sm text-gray-600">
                              Balance: ৳
                              {transaction.destination_account?.balance || "0"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm">
                          <span className="font-medium">Purpose:</span>{" "}
                          {transaction.notes}
                        </p>
                      </div>
                    </div>

                    {/* Amount and Actions */}
                    <div className="flex flex-col items-end gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          ৳{transaction.amount}
                        </p>
                        <Tag
                          color={
                            transaction.transaction_type === "credit"
                              ? "green"
                              : transaction.transaction_type === "debit"
                              ? "red"
                              : "blue"
                          }
                          className="uppercase mt-2"
                        >
                          {transaction.transaction_type}
                        </Tag>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          icon={<LuEye />}
                          onClick={() => showTransactionDetails(transaction)}
                        >
                          View
                        </Button>
                        <Button
                          type="primary"
                          icon={<LuCheck />}
                          loading={loadingState[transaction.id] === "approved"}
                          onClick={() => handleApproval(transaction.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          danger
                          icon={<LuCircle />}
                          onClick={() => handleReject(transaction.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {/* Transaction Details Modal */}
      <Modal
        title={`Transaction Details #${selectedTransaction?.id}`}
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={800}
        className="rounded-lg"
      >
        {selectedTransaction && (
          <div className="space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-3">
              {statusTag(selectedTransaction.approval_status)}
              <span className="text-gray-500">
                {formatDate(selectedTransaction.transaction_date)}
              </span>
            </div>

            <Divider className="my-2" />

            {/* Amount Section */}
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">
                ৳{selectedTransaction.amount}
              </p>
              <Tag
                color={
                  selectedTransaction.transaction_type === "credit"
                    ? "green"
                    : selectedTransaction.transaction_type === "debit"
                    ? "red"
                    : "blue"
                }
                className="uppercase mt-2"
              >
                {selectedTransaction.transaction_type}
              </Tag>
            </div>

            {/* Account Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-blue-600 mb-3">
                  <LuArrowUpRight className="text-lg" />
                  <h3 className="font-medium">From</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Requested By</p>
                    <p>
                      {capitalize(selectedTransaction?.requested_by) || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 text-green-600 mb-3">
                  <LuArrowDownLeft className="text-lg" />
                  <h3 className="font-medium">To Account</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Account Type</p>
                    <p>
                      {capitalize(
                        selectedTransaction.destination_account?.account_type
                      ) ||
                        capitalize(
                          selectedTransaction.destination_account?.type
                        ) ||
                        "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Balance</p>
                    <p>
                      ৳
                      {selectedTransaction?.destination_account?.balance || "0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Description</h3>
              <p>{selectedTransaction?.notes}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                danger
                icon={<LuCircle />}
                onClick={() => {
                  setIsDetailModalVisible(false);
                  handleReject(selectedTransaction.id);
                }}
              >
                Reject
              </Button>
              <Button
                type="primary"
                icon={<LuCheck />}
                loading={loadingState[selectedTransaction.id] === "approved"}
                onClick={() => {
                  setIsDetailModalVisible(false);
                  handleApproval(selectedTransaction.id);
                }}
              >
                Approve
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ApprovalPage;
