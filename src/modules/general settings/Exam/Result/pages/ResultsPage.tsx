import { Button, Card, Col, Row, Select } from "antd";
import { useDispatch } from "react-redux";
import { FilterState } from "../../../../../app/features/filterSlice";
import { showModal } from "../../../../../app/features/modalSlice";
import { useAppSelector } from "../../../../../app/store";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import { useGetResultsQuery } from "../api/resultsEndPoints";
import { IResults } from "../type/ResultsType";
import { PlusOutlined } from "@ant-design/icons";
import useResultsColumns from "../utils/ResultsColumns";
import CreateResult from "../components/CreateResults";
import { Table } from "../../../../../common/CommonAnt";
import { useState } from "react";
import { SearchComponent } from "../../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { debounce } from "lodash";
import { useGetExamQuery } from "../../api/examEndPoints";
import { useGetClassesQuery } from "../../../classes/api/classesEndPoints";
import { useGetAdmissionSessionQuery } from "../../../admission session/api/admissionSessionEndPoints";
const { Option } = Select;
const ResultsPage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  console.log(search);

  const { data: examList } = useGetExamQuery({});
  const { data: classList } = useGetClassesQuery({});
  const { data: admissionSessionList } = useGetAdmissionSessionQuery({});

  const { page_size, page } = useAppSelector(FilterState);
  const [filters, setFilters] = useState({
    search: "",
    is_passed: "",
    admission: "",
    exam: "",
    exam__session: "",
  });
  const {
    data: resultList,
    isLoading,
    isFetching,
    refetch,
  } = useGetResultsQuery({
    exam: filters.exam,
    exam__session: filters.exam__session,
    admission: filters.admission,
    search: filters.search,
    is_passed: filters.is_passed,
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength =
    (resultList?.data?.results as IResults[] | undefined)?.length ?? 0;

  const dataSource =
    (resultList?.data?.results as IResults[] | undefined) ?? [];

  return (
    <div className="space-y-5">
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row justify="space-between" gutter={[16, 16]}>
          {/* Button Section */}
          <Col lg={4} xs={24}>
            <Button
              type="primary"
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Add Exam Result",
                    content: <CreateResult />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Exam Result
            </Button>
          </Col>

          {/* Filters Section */}
          <Col lg={16} xs={24}>
            <Row gutter={[16, 16]}>
              <Col lg={6} md={12} xs={24}>
                <Select
                  className="w-full"
                  placeholder="Select Exam Session"
                  allowClear
                  showSearch
                  onSearch={debounce(setSearch, 500)}
                  filterOption={false}
                  loading={isFetching}
                  notFoundContent={
                    Array?.isArray(admissionSessionList?.data) &&
                    admissionSessionList?.data?.length === 0
                      ? "No Exam Session found"
                      : null
                  }
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

              <Col lg={4} md={12} xs={24}>
                <Select
                  className="w-full"
                  placeholder="Select Class"
                  allowClear
                  showSearch
                  onSearch={debounce(setSearch, 500)}
                  filterOption={false}
                  loading={isFetching}
                  notFoundContent={
                    Array?.isArray(classList?.data) &&
                    classList?.data?.length === 0
                      ? "No Class found"
                      : null
                  }
                  onChange={(value) =>
                    setFilters((prev) => ({ ...prev, exam: value }))
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

              <Col lg={4} md={12} xs={24}>
                <Select
                  className="w-full"
                  placeholder="Select Exam"
                  allowClear
                  showSearch
                  onSearch={debounce(setSearch, 500)}
                  filterOption={false}
                  loading={isFetching}
                  notFoundContent={
                    Array?.isArray(examList?.data) &&
                    examList?.data?.length === 0
                      ? "No Exam found"
                      : null
                  }
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

              <Col lg={4} md={12} xs={24}>
                <Select
                  placeholder="Select Status"
                  className="w-full"
                  allowClear
                  onChange={(value) =>
                    setFilters((prev) => ({ ...prev, is_passed: value }))
                  }
                >
                  <Select.Option value={true}>PASS</Select.Option>
                  <Select.Option value={false}>FAIL</Select.Option>
                </Select>
              </Col>

              <Col lg={6} md={12} xs={24}>
                <SearchComponent
                  onSearch={(value) =>
                    setFilters((prev) => ({ ...prev, search: value }))
                  }
                  placeholder="Search"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <Table
        rowKey={"id"}
        loading={isLoading || isFetching}
        refetch={refetch}
        total={dataLength}
        dataSource={dataSource}
        columns={useResultsColumns()}
      />
    </div>
  );
};

export default ResultsPage;
