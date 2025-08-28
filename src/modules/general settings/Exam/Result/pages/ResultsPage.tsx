import { Button, Card, Col, Row, Select, Space, Typography } from "antd";
import { useDispatch } from "react-redux";
import { FilterState } from "../../../../../app/features/filterSlice";
import { showModal } from "../../../../../app/features/modalSlice";
import { useAppSelector } from "../../../../../app/store";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import {
  useGetResultsQuery,
  useLazyGetPublishResultFormQuery,
} from "../api/resultsEndPoints";
import { PlusOutlined } from "@ant-design/icons";
import useResultsColumns from "../utils/ResultsColumns";
import CreateResult from "../components/CreateResults";
import { Table } from "../../../../../common/CommonAnt";
import { useEffect, useState } from "react";
import { SearchComponent } from "../../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { debounce } from "lodash";
import { useGetExamQuery } from "../../api/examEndPoints";
import { useGetClassesBigListQuery } from "../../../classes/api/classesEndPoints";
import { useGetAdmissionSessionQuery } from "../../../admission session/api/admissionSessionEndPoints";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../../utilities/NoPermissionData";
import { FaFilePdf } from "react-icons/fa6";
import { MdFilterAlt } from "react-icons/md";

const { Option } = Select;
const { Title } = Typography;

const ResultsPage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  console.log(search);

  const { data: examList } = useGetExamQuery({});
  const { data: classList } = useGetClassesBigListQuery({});
  const { data: admissionSessionList } = useGetAdmissionSessionQuery({});
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useResultsColumns();
  const [getPublishResultForm, { data: singleFeeForm }] =
    useLazyGetPublishResultFormQuery<any>();

  const { page_size, page } = useAppSelector(FilterState);
  const [filters, setFilters] = useState({
    search: "",
    is_passed: "",
    admission: "",
    exam: "",
    exam__session: "",
    grade_level: "",
    shift: "",
    section: "",
  });

  const {
    data: resultList,
    isLoading,
    isFetching,
    refetch,
  } = useGetResultsQuery({
    admission__grade_level: filters.grade_level,
    exam: filters.exam,
    exam__session: filters.exam__session,
    admission: filters.admission,
    search: filters.search,
    is_passed: filters.is_passed,
    admission__shift: filters.shift,
    admission__section: filters.section,
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength = resultList?.data?.count ?? 0;
  const dataSource = resultList?.data?.results ?? [];

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.studentresult,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.studentresult,
    actionNames.add
  );

  useEffect(() => {
    if (singleFeeForm) {
      const url = URL.createObjectURL(singleFeeForm);
      const newWindow = window.open("", "_blank");

      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>Publish Result</title></head>
            <body style="margin:0">
              <iframe src="${url}" frameborder="0" style="width:100%;height:100vh;"></iframe>
            </body>
          </html>
        `);
        newWindow.document.close();
      }

      return () => URL.revokeObjectURL(url);
    }
  }, [singleFeeForm]);

  const handleForm = () => {
    getPublishResultForm({
      params: {
        exam: filters.exam,
        session: filters.exam__session,
        grade_level: filters.grade_level,
        shift: filters.shift,
        section: filters.section,
      },
    });
  };

  const toggleFilters = () => setShowFilters(!showFilters);

  return (
    <div className="space-y-5">
      <div className="my-5">
        <BreadCrumb />
      </div>

      <Card className="shadow-sm">
        <Space direction="vertical" size="middle" className="w-full">
          {/* Header Section */}
          <Row justify="space-between" align="middle" gutter={[16, 16]}>
            <Col>
              <Title level={4} className="!mb-0">
                Results Management
              </Title>
            </Col>

            <Col>
              <Space>
                {createPermission && (
                  <Button
                    type="primary"
                    onClick={() =>
                      dispatch(
                        showModal({
                          title: "Publish Result",
                          content: <CreateResult />,
                        })
                      )
                    }
                    icon={<PlusOutlined />}
                  >
                    Publish Result
                  </Button>
                )}

                <Button icon={<MdFilterAlt />} onClick={toggleFilters}>
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
              </Space>
            </Col>
          </Row>

          {/* Search Section */}
          <Row gutter={[16, 16]}>
            <Col xs={24} md={18} lg={20}>
              <SearchComponent
                onSearch={(value) =>
                  setFilters((prev) => ({ ...prev, search: value }))
                }
                placeholder="Search by student name, roll, etc."
              />
            </Col>
            <Col xs={24} md={6} lg={4}>
              <Button
                icon={<FaFilePdf />}
                onClick={handleForm}
                block
                className="bg-red-50 text-red-600 hover:bg-red-100"
                disabled={!filters.exam}
              >
                Generate PDF
              </Button>
            </Col>
          </Row>

          {/* Filters Section */}
          {showFilters && (
            <Card bordered={false} className="bg-gray-50">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12} lg={6}>
                  <Select
                    className="w-full"
                    placeholder="Exam Session"
                    allowClear
                    showSearch
                    onSearch={debounce(setSearch, 500)}
                    filterOption={false}
                    loading={isFetching}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, exam__session: value }))
                    }
                  >
                    {Array.isArray(admissionSessionList?.data) &&
                      admissionSessionList?.data?.map((data: any) => (
                        <Option key={data.id} value={data.id}>
                          {data?.name}
                        </Option>
                      ))}
                  </Select>
                </Col>

                <Col xs={24} md={12} lg={6}>
                  <Select
                    className="w-full"
                    placeholder="Class"
                    allowClear
                    showSearch
                    onSearch={debounce(setSearch, 500)}
                    filterOption={false}
                    loading={isFetching}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, grade_level: value }))
                    }
                  >
                    {Array.isArray(classList?.data) &&
                      classList?.data?.map((data: any) => (
                        <Option key={data.id} value={data.id}>
                          {data?.name}
                        </Option>
                      ))}
                  </Select>
                </Col>

                <Col xs={24} md={12} lg={6}>
                  <Select
                    className="w-full"
                    placeholder="Exam"
                    allowClear
                    showSearch
                    onSearch={debounce(setSearch, 500)}
                    filterOption={false}
                    loading={isFetching}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, exam: value }))
                    }
                  >
                    {Array.isArray(examList?.data) &&
                      examList?.data?.map((data: any) => (
                        <Option key={data.id} value={data.id}>
                          {data?.name}
                        </Option>
                      ))}
                  </Select>
                </Col>

                <Col xs={24} md={12} lg={6}>
                  <Select
                    placeholder="Status"
                    className="w-full"
                    allowClear
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, is_passed: value }))
                    }
                  >
                    <Option value="true">PASS</Option>
                    <Option value="false">FAIL</Option>
                  </Select>
                </Col>

                <Col xs={24} md={12} lg={6}>
                  <Select
                    className="w-full"
                    placeholder="Shift"
                    allowClear
                    value={filters.shift}
                    onChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        shift: value,
                        section: "",
                      }))
                    }
                    disabled={!filters.grade_level}
                  >
                    {Array.isArray(classList?.data) &&
                      classList?.data
                        ?.find((cls: any) => cls.id === filters.grade_level)
                        ?.shifts?.map((shift: any) => (
                          <Option key={shift.id} value={shift.id}>
                            {shift.name}
                          </Option>
                        ))}
                  </Select>
                </Col>

                <Col xs={24} md={12} lg={6}>
                  <Select
                    className="w-full"
                    placeholder="Section"
                    allowClear
                    value={filters.section}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, section: value }))
                    }
                    disabled={!filters.shift}
                  >
                    {Array.isArray(classList?.data) &&
                      classList?.data
                        ?.find((cls: any) => cls.id === filters.grade_level)
                        ?.shifts?.find((sh: any) => sh.id === filters.shift)
                        ?.sections?.map((s: any) => (
                          <Option key={s.section.id} value={s.section.id}>
                            {s.section.name}
                          </Option>
                        ))}
                  </Select>
                </Col>
              </Row>
            </Card>
          )}
        </Space>
      </Card>

      {/* Results Table */}
      <Card className="shadow-sm">
        {viewPermission ? (
          <Table
            rowKey="id"
            loading={isLoading || isFetching}
            refetch={refetch}
            total={dataLength}
            dataSource={dataSource}
            columns={columns}
            scroll={{ x: true }}
          />
        ) : (
          <NoPermissionData />
        )}
      </Card>
    </div>
  );
};

export default ResultsPage;
