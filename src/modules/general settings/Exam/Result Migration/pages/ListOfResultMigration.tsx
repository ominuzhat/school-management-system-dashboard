/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Card, Col, Row, Select } from "antd";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";

import { useState } from "react";
import { Table } from "../../../../../common/CommonAnt";
import { useGetMigrationResultListQuery } from "../api/resultMigrationEndPoints";
import useMigrationResult from "../utils/MigrationResultColumns";
import { debounce } from "lodash";
import { useGetAdmissionQuery } from "../../../admission/api/admissionEndPoints";
import { useGetTermQuery } from "../../api/termEndPoints";
import { useGetGradeMarkQuery } from "../../Grade/api/gradeMarkEndPoints";
import { SearchComponent } from "../../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useGetAdmissionSessionQuery } from "../../../admission session/api/admissionSessionEndPoints";

const ListOfResultMigration = () => {
  const [search, setSearch] = useState("");
  const { data: termData }: any = useGetTermQuery({});
  const { data: sessionData }: any = useGetAdmissionSessionQuery({});
  const { data: gradeMarkData }: any = useGetGradeMarkQuery({});
  const { data: admissionData, refetch } = useGetAdmissionQuery({});
  const [filters, setFilters] = useState({
    is_passed: "",
    exam_term: "",
    admission: "",
    grade: "",
    search: "",
    admission__session: "",
  });

  const {
    data: migrationResultList,
    isLoading,
    isFetching,
  } = useGetMigrationResultListQuery({
    admission: filters.admission,
    is_passed: filters.is_passed,
    exam_term: filters.exam_term,
    grade: filters.grade,
    admission__session: filters.admission__session,
    search: filters.search,
  });

  console.log(search);

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>

      <Card>
        <Row gutter={[16, 16]} justify="start">
          <Col xs={24} sm={12} md={8} lg={4}>
            <Select
              placeholder="Select Student"
              className="w-full"
              allowClear
              showSearch
              onSearch={debounce(setSearch, 500)}
              filterOption={false}
              loading={isFetching}
              notFoundContent={
                admissionData?.data?.results?.length === 0
                  ? "No Student found"
                  : null
              }
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, admission: value }))
              }
            >
              {admissionData?.data?.results?.map((data: any) => (
                <Select.Option key={data?.id} value={data?.id}>
                  {data?.student?.first_name} {data?.student?.last_name} (
                  {data?.session?.name})
                </Select.Option>
              ))}
            </Select>
          </Col>

          <Col xs={24} sm={12} md={8} lg={4}>
            <Select
              placeholder="Select Term"
              className="w-full"
              allowClear
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, exam_term: value }))
              }
            >
              {termData?.data?.map((data: any) => (
                <Select.Option key={data?.id} value={data?.id}>
                  {data.name}
                </Select.Option>
              ))}
            </Select>
          </Col>

          <Col xs={24} sm={12} md={8} lg={4}>
            <Select
              placeholder="Select Grade"
              className="w-full"
              allowClear
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, grade: value }))
              }
            >
              {gradeMarkData?.data?.map((data: any) => (
                <Select.Option key={data?.id} value={data?.grade}>
                  {data.grade}
                </Select.Option>
              ))}
            </Select>
          </Col>

          <Col xs={24} sm={12} md={8} lg={4}>
            <Select
              placeholder="Select Session"
              className="w-full"
              allowClear
              onChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  admission__session: value,
                }))
              }
            >
              {sessionData?.data?.map((data: any) => (
                <Select.Option key={data?.id} value={data?.id}>
                  {data.name}
                </Select.Option>
              ))}
            </Select>
          </Col>

          <Col xs={24} sm={12} md={8} lg={4}>
            <Select
              placeholder="Is Passed"
              className="w-full"
              allowClear
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, is_passed: value }))
              }
            >
              <Select.Option value={true}>Pass</Select.Option>
              <Select.Option value={false}>Fail</Select.Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={8} lg={4}>
            <SearchComponent
              onSearch={(value) =>
                setFilters((prev) => ({ ...prev, search: value }))
              }
              placeholder="Search"
            />
          </Col>
        </Row>
      </Card>

      <Card>
        <Table
          rowKey={"id"}
          loading={isLoading || isFetching}
          refetch={refetch}
          total={migrationResultList?.data?.count}
          dataSource={migrationResultList?.data?.results}
          columns={useMigrationResult()}
        />
      </Card>
    </div>
  );
};

export default ListOfResultMigration;
