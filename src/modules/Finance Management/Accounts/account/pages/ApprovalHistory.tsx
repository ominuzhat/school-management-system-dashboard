import { useState } from "react";
import { Card, Avatar, Tag, DatePicker, Select, Pagination, Space, Button } from "antd";
import { capitalize } from "../../../../../common/capitalize/Capitalize";
import { formatDate, getAccountIcon, statusTag } from "./ApprovalPage";
import { useGetTransferRequestQuery } from "../../Transaction/api/transactionEndPoints";

const { RangePicker } = DatePicker;

const ApprovalHistory = () => {
  const [filters, setFilters] = useState({
    request_date_after: undefined as string | undefined,
    request_date_before: undefined as string | undefined,
    status: undefined as string | undefined,
    page: 1,
    page_size: 10,
  });

  const { data: transactionList, isLoading } = useGetTransferRequestQuery({
    page: filters.page,
    page_size: filters.page_size,
    request_date_after: filters.request_date_after,
    request_date_before: filters.request_date_before,
    status: filters.status,
  });

  const transactions = transactionList?.data?.results || [];
  const totalCount = transactionList?.data?.count || 0;

  const handleDateChange = (dates: any) => {
    if (dates) {
      setFilters({
        ...filters,
        request_date_after: dates[0]?.format("YYYY-MM-DD"),
        request_date_before: dates[1]?.format("YYYY-MM-DD"),
        page: 1,
      });
    } else {
      setFilters({
        ...filters,
        request_date_after: undefined,
        request_date_before: undefined,
        page: 1,
      });
    }
  };

  const handleStatusChange = (value: string) => {
    setFilters({
      ...filters,
      status: value || undefined,
      page: 1,
    });
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setFilters({
      ...filters,
      page,
      page_size: pageSize,
    });
  };

  const handleClearFilters = () => {
    setFilters({
      request_date_after: undefined,
      request_date_before: undefined,
      status: undefined,
      page: 1,
      page_size: 10,
    });
  };

  return (
    <Card loading={isLoading}>
      {/* Filters */}
      <Space direction="horizontal" size="large" style={{ marginBottom: 16 }}>
        <RangePicker onChange={handleDateChange} />
        <Select
          placeholder="Select Status"
          allowClear
          onChange={handleStatusChange}
          style={{ width: 200 }}
        >
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="approved">Approved</Select.Option>
          <Select.Option value="rejected">Rejected</Select.Option>
        </Select>
        <Button onClick={handleClearFilters}>Clear Filters</Button>
      </Space>

      {/* Transactions */}
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
                  {statusTag(transaction.status)}
                  <span className="text-sm text-gray-500">
                    {formatDate(transaction.request_date)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Avatar className="bg-blue-100 text-blue-600">
                      {getAccountIcon(transaction.account?.type)}
                    </Avatar>
                    <div>
                      <p className="font-semibold">
                        <span className="font-normal mr-2">Requested By:</span>{" "}
                        {capitalize(transaction.requested_by)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Avatar className="bg-green-100 text-green-600">
                      {getAccountIcon(transaction.destination_account?.type)}
                    </Avatar>
                    <div>
                      <p className="font-semibold">
                        <span className="font-normal mr-2">Destination Account:</span>{" "}
                        {capitalize(transaction.destination_account?.account_type) ||
                          capitalize(transaction.destination_account?.type) ||
                          "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Balance: ৳{transaction.destination_account?.balance || "0"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium">Purpose:</span> {transaction.notes}
                  </p>
                </div>
              </div>

              {/* Amount */}
              <div className="flex flex-col items-end gap-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">
                    ৳{transaction.amount}
                  </p>
                  <Tag className="uppercase mt-2">
                    {transaction.status}
                  </Tag>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-6">
        <Pagination
          current={filters.page}
          pageSize={filters.page_size}
          total={totalCount}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={['10', '20', '50']}
        />
      </div>
    </Card>
  );
};

export default ApprovalHistory;
