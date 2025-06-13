import {
  Card,
  Button,
  Select,
  Statistic,
  Tooltip,
  DatePicker,
  Col,
  Row,
} from "antd";
import {
  PlusOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  UsergroupAddOutlined,
  UsergroupDeleteOutlined,
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
import dayjs from "dayjs";


const { Option } = Select;
const { MonthPicker } = DatePicker;

const feeGuidelinesBn = (
  <div>
    <h3 style={{ margin: "0 0 8px", fontWeight: "bold" }}>
      ফি সংগ্রহ নির্দেশিকা
    </h3>

    <p style={{ margin: "8px 0" }}>
      <strong>১. মাস নির্বাচন:</strong>
      <br />
      আপনি যে মাসের ফি সংগ্রহ করতে চান, শুধুমাত্র সেই মাসটি সিলেক্ট করুন। এটি
      নির্বাচন করলে শুধুমাত্র সেই নির্দিষ্ট মাসের ফি আদায় করা হবে।
      উদাহরণস্বরূপ, যদি আপনি "জানুয়ারি ২০২৫" নির্বাচন করেন, তাহলে শুধুমাত্র
      জানুয়ারি মাসের ফি সংগ্রহ করা হবে।
    </p>

    <p style={{ margin: "8px 0" }}>
      <strong>২. অতিরিক্ত ফি আইটেম যোগ:</strong>
      <br />
      যদি আপনি মাসের রেগুলার ফি ছাড়াও অতিরিক্ত ফি যোগ করতে চান (যেমন: পরীক্ষার
      ফি, ল্যাব ফি ইত্যাদি), তাহলে "ফি আইটেম যোগ" বাটনে ক্লিক করুন। প্রতিটি
      অতিরিক্ত ফি আইটেম শুধুমাত্র সেই মাসের সাথেই যুক্ত হবে যেটি আপনি বর্তমানে
      সিলেক্ট করেছেন।
    </p>

    <p style={{ margin: "8px 0" }}>
      <strong>উদাহরণ:</strong>
      <br />
      - আপনি "মার্চ ২০২৫" সিলেক্ট করলেন এবং ২টি অতিরিক্ত ফি যোগ করলেন (পরীক্ষার
      ফি ও ল্যাব ফি)
      <br />
      - তাহলে শুধুমাত্র মার্চ ২০২৫ মাসের রেগুলার ফি + ঐ ২টি অতিরিক্ত ফি সংগ্রহ
      করা হবে
      <br />- অন্য মাসগুলোর ফি অপরিবর্তিত থাকবে
    </p>

    <p style={{ margin: "8px 0 0", fontStyle: "italic" }}>
      <strong>দ্রষ্টব্য:</strong> দয়া করে মাস নির্বাচন করার পরই অতিরিক্ত ফি
      আইটেম যোগ করুন। একটি মাস সিলেক্ট না করলে অতিরিক্ত ফি যোগ করার অপশন কাজ
      করবে না।
    </p>
  </div>
);

export const FeeCollection = () => {
  const dispatch = useAppDispatch();

  const { data: classData } = useGetClassesQuery({});
  const { data: shiftData } = useGetShiftQuery({});
  const { data: sectionData } = useGetSectionQuery({});
  const { data: sessionData } = useGetAdmissionSessionQuery({
    status: "open",
  });
  const currentMonth = dayjs().format("YYYY-MM") + "-01";

  const [filters, setFilters] = useState({
    search: "",
    is_active: "",
    current_grade_level: "",
    current_section: "",
    current_session: "",
    current_shift: "",
    status: "",
    month: currentMonth,
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
    month: filters.month,
    page_size: page_size,
    page: Number(page) || undefined,
  });

  return (
    <div className="space-y-6">
      {/* Fee Collection Summary - Responsive Grid */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 h-full">
            <Statistic
              title={<span className="text-green-100">Total Collected</span>}
              value={collectFee?.data?.reports?.filter?.collected}
              valueStyle={{
                color: "#fff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
              prefix={<CheckCircleOutlined className="text-green-100" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 h-full">
            <Statistic
              title={<span className="text-yellow-100">Pending Amount</span>}
              value={collectFee?.data?.reports?.filter?.dues}
              valueStyle={{
                color: "#fff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
              prefix={<ExclamationCircleOutlined className="text-yellow-100" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 h-full">
            <Statistic
              title={<span className="text-blue-100">Students Paid</span>}
              value={collectFee?.data?.reports?.filter?.paid_admissions}
              valueStyle={{
                color: "#fff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
              prefix={<UsergroupAddOutlined className="text-blue-100" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6}>
          <Card className="bg-gradient-to-r from-purple-500 to-violet-500 text-white border-0 h-full">
            <Statistic
              title={<span className="text-purple-100">Due Students</span>}
              value={collectFee?.data?.reports?.filter?.due_admissions}
              valueStyle={{
                color: "#fff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
              prefix={<UsergroupDeleteOutlined className="text-purple-100" />}
            />
          </Card>
        </Col>
      </Row>

      {/* Search and Filters - Responsive Layout */}
      <Card className="border-blue-100">
        <div className="flex items-center justify-between mb-2">
          <h1 className="my-4 text-xl font-semibold">
            Fee Collection Management
          </h1>
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 ">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="bg-gradient-to-r from-blue-600 to-indigo-600"
              onClick={() =>
                dispatch(
                  showModal({
                    title: (
                      <div className="flex items-center justify-between pe-10">
                        <span className="text-base font-semibold">
                          Add Claim Fee
                        </span>
                        <Tooltip
                          placement="bottom"
                          color={"rgba(35,117,245,0.5)"}
                          title={feeGuidelinesBn}
                        >
                          <Button size="small" type="primary">
                            Guideline
                          </Button>
                        </Tooltip>
                      </div>
                    ),
                    content: <CreateClaimFee />,
                  })
                )
              }
            >
              Claim Fee
            </Button>

            {createPermission && (
              <Link to={"/collect-fee"}>
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

        <Row gutter={[16, 16]}>
          {/* Search - Full width on mobile, half on tablet, auto on larger */}
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={5}>
            <SearchComponent
              onSearch={(value) =>
                setFilters((prev) => ({ ...prev, search: value }))
              }
              placeholder="Search Collect Fee"
            />
          </Col>

          {/* Month Picker */}
          <Col xs={24} sm={12} md={8} lg={6} xl={4} xxl={4}>
            <MonthPicker
              placeholder="Select month"
              className="w-full text-green-500"
              defaultValue={dayjs(currentMonth, "YYYY-MM-DD")}
              onChange={(date) => {
                if (date) {
                  const formattedDate = date.format("YYYY-MM") + "-01";
                  setFilters((prev) => ({ ...prev, month: formattedDate }));
                } else {
                  setFilters((prev) => ({ ...prev, month: currentMonth }));
                }
              }}
              format="MMMM YYYY"
            />
          </Col>

          {/* Session */}
          <Col xs={12} sm={12} md={8} lg={4} xl={3} xxl={3}>
            <Select
              className="w-full"
              placeholder="Session"
              allowClear
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, current_session: value }))
              }
            >
              {Array.isArray(sessionData?.data) &&
                sessionData?.data?.map((data: any) => (
                  <Option key={data.id} value={data.id}>
                    {data.name}
                  </Option>
                ))}
            </Select>
          </Col>

          {/* Class */}
          <Col xs={12} sm={12} md={8} lg={4} xl={3} xxl={3}>
            <Select
              className="w-full"
              placeholder="Class"
              allowClear
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, current_grade_level: value }))
              }
            >
              {Array.isArray(classData?.data) &&
                classData?.data?.map((data: any) => (
                  <Option key={data.id} value={data.id}>
                    {data.name}
                  </Option>
                ))}
            </Select>
          </Col>

          {/* Section */}
          <Col xs={12} sm={12} md={8} lg={4} xl={3} xxl={3}>
            <Select
              className="w-full"
              placeholder="Section"
              allowClear
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, current_section: value }))
              }
            >
              {Array.isArray(sectionData?.data) &&
                sectionData?.data?.map((data: any) => (
                  <Option key={data.id} value={data.id}>
                    {data.name}
                  </Option>
                ))}
            </Select>
          </Col>

          {/* Shift */}
          <Col xs={12} sm={12} md={8} lg={4} xl={3} xxl={3}>
            <Select
              className="w-full"
              placeholder="Shift"
              allowClear
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, current_shift: value }))
              }
            >
              {Array.isArray(shiftData?.data) &&
                shiftData?.data?.map((data: any) => (
                  <Option key={data.id} value={data.id}>
                    {data.name}
                  </Option>
                ))}
            </Select>
          </Col>

          {/* Status */}
          <Col xs={12} sm={12} md={8} lg={4} xl={3} xxl={3}>
            <Select
              className="w-full"
              placeholder="Status"
              allowClear
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
            >
              <Option value="paid">Paid</Option>
              <Option value="partial">Partial</Option>
              <Option value="pending">Pending</Option>
            </Select>
          </Col>
        </Row>

        {/* Table */}
        {viewPermission ? (
          <Table
            rowKey={"id"}
            loading={isLoading || isFetching}
            refetch={refetch}
            total={collectFee?.data?.count}
            dataSource={collectFee?.data?.results}
            columns={collectFeeColumns}
            className="mt-4"
          />
        ) : (
          <NoPermissionData />
        )}
      </Card>
    </div>
  );
};
