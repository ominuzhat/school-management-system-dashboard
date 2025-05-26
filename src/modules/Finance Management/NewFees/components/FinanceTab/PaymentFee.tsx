"use client";
import { Card, Button, Input, Select, Table, Tag, Statistic } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  PlusOutlined,
  CalendarOutlined,
  UserOutlined,
  DollarOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useGetClassesQuery } from "../../../../general settings/classes/api/classesEndPoints";
import { useState } from "react";
import { debounce } from "lodash";

const { Option } = Select;

export const PaymentFee = () => {
  const payments = [
    {
      id: 1,
      name: "Rahul Sharma",
      class: "Class 10-A",
      rollNo: "101",
      totalFee: 5500,
      paid: 5500,
      pending: 0,
      status: "Paid",
      dueDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Priya Patel",
      class: "Class 9-B",
      rollNo: "205",
      totalFee: 4800,
      paid: 2400,
      pending: 2400,
      status: "Partial",
      dueDate: "2024-01-10",
    },
  ];

  const columns = [
    {
      title: "Student Details",
      dataIndex: "name",
      key: "name",
      render: (text: any, record: any) => (
        <div>
          <p className="font-medium">{text}</p>
          <p className="text-sm text-gray-500">
            {record.class} • Roll No: {record.rollNo}
          </p>
        </div>
      ),
    },
    {
      title: "Fee Structure",
      dataIndex: "fee",
      key: "fee",
      render: (_: any, record: any) => (
        <div>
          <p className="text-sm font-medium">
            Total: ₹{record.totalFee.toLocaleString()}
          </p>
          <p className="text-sm text-green-600">
            Paid: ₹{record.paid.toLocaleString()}
          </p>
          {record.pending > 0 && (
            <p className="text-sm text-red-600">
              Pending: ₹{record.pending.toLocaleString()}
            </p>
          )}
        </div>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "status",
      key: "status",
      render: (status: any) => {
        let color = "";
        if (status === "Paid") color = "green";
        else if (status === "Partial") color = "orange";
        else color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button size="small">View</Button>
          {record.pending > 0 && (
            <Button type="primary" size="small" className="bg-blue-600">
              Collect
            </Button>
          )}
        </div>
      ),
    },
  ];

  const [search, setSearch] = useState("");

  const {
    data: classData,
    isLoading: classLoading,
    isFetching: isFetchingClasses,
  } = useGetClassesQuery({ search });

  return (
    <div className="space-y-6">
      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
          <Statistic
            title={<span className="text-green-100">Total Paid</span>}
            value="₹1,20,000"
            valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
            prefix={<DollarOutlined className="text-green-100" />}
          />
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
          <Statistic
            title={<span className="text-yellow-100">Amount Pending</span>}
            value="₹35,400"
            valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
            prefix={<ExclamationCircleOutlined className="text-yellow-100" />}
          />
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
          <Statistic
            title={<span className="text-blue-100">Total Transactions</span>}
            value="821"
            valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
            prefix={<UserOutlined className="text-blue-100" />}
          />
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-violet-500 text-white border-0">
          <Statistic
            title={<span className="text-purple-100">Upcoming Dues</span>}
            value="48"
            valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
            prefix={<CalendarOutlined className="text-purple-100" />}
          />
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/60 backdrop-blur-sm border-blue-100">
        <h1 className="my-4 text-xl font-semibold">Payment Fee Records</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search by student name, roll number, or class..."
              prefix={<SearchOutlined />}
              className="w-full"
            />
          </div>

          <Select
            mode="multiple"
            allowClear
            showSearch
            placeholder={classLoading ? "Loading classes..." : "Filter by class"}
            optionFilterProp="children"
            filterOption={false}
            onSearch={debounce(setSearch, 500)}
            loading={isFetchingClasses}
            notFoundContent={isFetchingClasses ? <LoadingOutlined /> : "No Class found"}
            className="w-full md:w-48"
            options={
              (Array.isArray(classData?.data) &&
                classData.data.map((classItem: any) => ({
                  label: classItem.name,
                  value: classItem.id,
                }))) ||
              []
            }
          />

          <Select placeholder="Payment status" className="w-full md:w-48">
            <Option value="all">All Status</Option>
            <Option value="paid">Paid</Option>
            <Option value="partial">Partial</Option>
            <Option value="pending">Pending</Option>
          </Select>

          <div className="flex gap-2">
            <Button icon={<FilterOutlined />}>More Filters</Button>
            <Button icon={<DownloadOutlined />}>Export</Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="bg-gradient-to-r from-green-600 to-emerald-600"
            >
              Make Payment
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={payments}
          rowKey="id"
          className="rounded-lg border border-gray-200"
        />
      </Card>
    </div>
  );
};
