import { Card, Button, Select, Statistic } from "antd";
import {
  PlusOutlined,
  CalendarOutlined,
  UserOutlined,
  DollarOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useGetClassesQuery } from "../../../../general settings/classes/api/classesEndPoints";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../app/store";
import { showModal } from "../../../../../app/features/modalSlice";
import CreateClaimFee from "../CreateClaimFee";
import NoPermissionData from "../../../../../utilities/NoPermissionData";
import { FilterState } from "../../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import useCollectFeeColumns from "../../../Fees/Collect Fee/utils/collectFeeColumns";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import { useGetCollectFeesQuery } from "../../../Fees/Collect Fee/api/collectFeeEndPoints";
import { Table } from "../../../../../common/CommonAnt";
import { SearchComponent } from "../../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useGetShiftQuery } from "../../../../general settings/shift/api/shiftEndPoints";
import { useGetSectionQuery } from "../../../../general settings/Section/api/sectionEndPoints";
import { useGetAdmissionSessionQuery } from "../../../../general settings/admission session/api/admissionSessionEndPoints";

const { Option } = Select;

export const FeeCollection = () => {
  const dispatch = useAppDispatch();

  // const students = [
  //   {
  //     id: 1,
  //     name: "Rahul Sharma",
  //     class: "Class 10-A",
  //     rollNo: "101",
  //     totalFee: 5500,
  //     paid: 5500,
  //     pending: 0,
  //     status: "Paid",
  //     dueDate: "2024-01-15",
  //   },
  //   {
  //     id: 2,
  //     name: "Priya Patel",
  //     class: "Class 9-B",
  //     rollNo: "205",
  //     totalFee: 4800,
  //     paid: 2400,
  //     pending: 2400,
  //     status: "Partial",
  //     dueDate: "2024-01-10",
  //   },
  //   {
  //     id: 3,
  //     name: "Amit Kumar",
  //     class: "Class 12-A",
  //     rollNo: "312",
  //     totalFee: 6200,
  //     paid: 0,
  //     pending: 6200,
  //     status: "Pending",
  //     dueDate: "2024-01-05",
  //   },
  //   {
  //     id: 4,
  //     name: "Sneha Singh",
  //     class: "Class 8-C",
  //     rollNo: "183",
  //     totalFee: 4200,
  //     paid: 4200,
  //     pending: 0,
  //     status: "Paid",
  //     dueDate: "2024-01-20",
  //   },
  //   {
  //     id: 5,
  //     name: "Vikash Gupta",
  //     class: "Class 11-B",
  //     rollNo: "267",
  //     totalFee: 5800,
  //     paid: 1450,
  //     pending: 4350,
  //     status: "Partial",
  //     dueDate: "2024-01-08",
  //   },
  // ];

  // const columns = [
  //   {
  //     title: "Student Details",
  //     dataIndex: "name",
  //     key: "name",
  //     render: (text: any, record: any) => (
  //       <div>
  //         <p className="font-medium">{text}</p>
  //         <p className="text-sm text-gray-500">
  //           {record.class} • Roll No: {record.rollNo}
  //         </p>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Fee Structure",
  //     dataIndex: "fee",
  //     key: "fee",
  //     render: (_: any, record: any) => (
  //       <div>
  //         <p className="text-sm font-medium">
  //           Total: ₹{record.totalFee.toLocaleString()}
  //         </p>
  //         <p className="text-sm text-green-600">
  //           Paid: ₹{record.paid.toLocaleString()}
  //         </p>
  //         {record.pending > 0 && (
  //           <p className="text-sm text-red-600">
  //             Pending: ₹{record.pending.toLocaleString()}
  //           </p>
  //         )}
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Payment Status",
  //     dataIndex: "status",
  //     key: "status",
  //     render: (status: any) => {
  //       let color = "";
  //       if (status === "Paid") color = "green";
  //       else if (status === "Partial") color = "orange";
  //       else color = "red";
  //       return <Tag color={color}>{status}</Tag>;
  //     },
  //   },
  //   {
  //     title: "Due Date",
  //     dataIndex: "dueDate",
  //     key: "dueDate",
  //   },
  //   {
  //     title: "Actions",
  //     key: "actions",
  //     render: (_: any, record: any) => (
  //       <div className="flex gap-2">
  //         <Button size="small">View</Button>
  //         {record.pending > 0 && (
  //           <Button type="primary" size="small" className="bg-blue-600">
  //             Collect
  //           </Button>
  //         )}
  //       </div>
  //     ),
  //   },
  // ];

  const { data: classData } = useGetClassesQuery({});
  const { data: shiftData } = useGetShiftQuery({});
  const { data: sectionData } = useGetSectionQuery({});
  const { data: sessionData } = useGetAdmissionSessionQuery({
    status: "open",
  });

  const [filters, setFilters] = useState({
    search: "",
    is_active: "",
    current_grade_level: "",
    current_section: "",
    current_session: "",
    current_shift: "",
    status: "",
  });

  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const collectFeeColumns = useCollectFeeColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.fees,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.fees,
    actionNames.add
  );

  const {
    data: collectFee,
    isLoading,
    isFetching,
    refetch,
  } = useGetCollectFeesQuery({
    search: filters.search,
    admission__grade_level: filters.current_grade_level,
    admission__section: filters.current_section,
    admission__session: filters.current_session,
    admission__shift: filters.current_shift,
    status: filters.status,
    is_active: filters.is_active,
    page_size: page_size,
    page: Number(page) || undefined,
  });

  return (
    <div className="space-y-6">
      {/* Fee Collection Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
          <Statistic
            title={<span className="text-green-100">Total Collected</span>}
            value="₹2,45,680"
            valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
            prefix={<DollarOutlined className="text-green-100" />}
          />
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
          <Statistic
            title={<span className="text-yellow-100">Pending Amount</span>}
            value="₹89,420"
            valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
            prefix={<ExclamationCircleOutlined className="text-yellow-100" />}
          />
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
          <Statistic
            title={<span className="text-blue-100">Students Paid</span>}
            value="1,091"
            valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
            prefix={<UserOutlined className="text-blue-100" />}
          />
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-violet-500 text-white border-0">
          <Statistic
            title={<span className="text-purple-100">Due This Week</span>}
            value="156"
            valueStyle={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}
            prefix={<CalendarOutlined className="text-purple-100" />}
          />
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className=" border-blue-100">
        <h1 className="my-4 text-xl font-semibold">
          Fee Collection Management
        </h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchComponent
              onSearch={(value) =>
                setFilters((prev) => ({ ...prev, search: value }))
              }
              placeholder="Search Collect Fee"
            />
          </div>

          <Select
            className="w-full md:w-48"
            placeholder="Class"
            allowClear
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                current_grade_level: value,
              }))
            }
          >
            {Array.isArray(classData?.data) &&
              classData?.data?.map((data: any) => (
                <Option key={data.id} value={data.id}>
                  {data.name}
                </Option>
              ))}
          </Select>

          <Select
            className="w-full md:w-48"
            placeholder="Section"
            allowClear
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                current_section: value,
              }))
            }
          >
            {Array.isArray(sectionData?.data) &&
              sectionData?.data?.map((data: any) => (
                <Option key={data.id} value={data.id}>
                  {data.name}
                </Option>
              ))}
          </Select>

          <Select
            className="w-full md:w-48"
            placeholder="Session"
            allowClear
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                current_session: value,
              }))
            }
          >
            {Array.isArray(sessionData?.data) &&
              sessionData?.data?.map((data: any) => (
                <Option key={data.id} value={data.id}>
                  {data.name}
                </Option>
              ))}
          </Select>

          <Select
            className="w-full md:w-48"
            placeholder="Shift"
            allowClear
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                current_shift: value,
              }))
            }
          >
            {Array.isArray(shiftData?.data) &&
              shiftData?.data?.map((data: any) => (
                <Option key={data.id} value={data.id}>
                  {data.name}
                </Option>
              ))}
          </Select>

          <Select
            allowClear
            placeholder="Payment status"
            className="w-full md:w-48"
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                status: value,
              }))
            }
          >
            <Option value="paid">Paid</Option>
            <Option value="partial">Partial</Option>
            <Option value="pending">Pending</Option>
          </Select>
          <div className="flex gap-2">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Add Claim Fee",
                    content: <CreateClaimFee />,
                  })
                )
              }
            >
              Claim Fee
            </Button>
            {createPermission && (
              <Link to={"/new-collect-fee"}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600"
                >
                  Collect Fee
                </Button>
              </Link>
            )}
          </div>
        </div>

        {viewPermission ? (
          <Table
            rowKey={"id"}
            loading={isLoading || isFetching}
            refetch={refetch}
            total={collectFee?.data?.count}
            dataSource={collectFee?.data?.results}
            columns={collectFeeColumns}
          />
        ) : (
          <NoPermissionData />
        )}

        {/* Students Table */}
        {/* <Table
          columns={columns}
          dataSource={students}
          rowKey="id"
          className="rounded-lg border border-gray-200"
        /> */}
      </Card>
    </div>
  );
};
