import { Button, Card, Col, Row, Select } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import { useGetRoutineQuery } from "../api/routineEndPoints";
import { IGetRoutine } from "../type/routineTypes";
import { Link } from "react-router-dom";
import useRoutineColumns from "../utils/routineColumns";
import { useState } from "react";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { debounce } from "lodash";
import { useGetClassesQuery } from "../../classes/api/classesEndPoints";
import { useGetAdmissionSessionQuery } from "../../admission session/api/admissionSessionEndPoints";
import { useGetSectionQuery } from "../../Section/api/sectionEndPoints";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";
const { Option } = Select;
const RoutinePages = () => {
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    session: "",
    section: "",
    grade_level: "",
  });

  const { page_size, page } = useAppSelector(FilterState);

  const {
    data: classList,
    isFetching,
    refetch,
  } = useGetClassesQuery({
    search: search,
    page_size: page_size,
    page: Number(page) || undefined,
  });
  const { data: getSection } = useGetSectionQuery({});
  const { data: getSession } = useGetAdmissionSessionQuery({});
  const { data: routineList, isLoading } = useGetRoutineQuery(filters);

  const dataLength =
    (routineList?.data as IGetRoutine[] | undefined)?.length ?? 0;
  const dataSource = (routineList?.data as IGetRoutine[] | undefined) ?? [];

  return (
    <div className="space-y-5">
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          <Col lg={4} xs={24}>
            <Link to="/routine/create-routine">
              <Button type="primary" icon={<PlusOutlined />} className="w-full">
                Add Routine
              </Button>
            </Link>
          </Col>

          <Col lg={14} xs={24}>
            <Row justify="space-between" gutter={[16, 0]}>
              <Col lg={6} xs={12}>
                <Select
                  className="w-full"
                  placeholder="Select Section"
                  allowClear
                  showSearch
                  onSearch={debounce(setSearch, 500)}
                  filterOption={false}
                  loading={isFetching}
                  notFoundContent={
                    Array?.isArray(getSection?.data) &&
                    getSection?.data?.results?.length === 0
                      ? "No Section found"
                      : null
                  }
                  onChange={(value) =>
                    setFilters((prev) => ({ ...prev, section: value }))
                  }
                >
                  {Array?.isArray(getSection?.data) &&
                    getSection?.data?.map((data: any) => (
                      <Option key={data.id} value={data.id}>
                        {data?.name}
                      </Option>
                    ))}
                </Select>
              </Col>
              <Col lg={6} xs={12}>
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
                    classList?.data?.results?.length === 0
                      ? "No Class found"
                      : null
                  }
                  onChange={(value) =>
                    setFilters((prev) => ({ ...prev, grade_level: value }))
                  }
                >
                  {Array?.isArray(classList?.data) &&
                    classList?.data?.map((data: any) => (
                      <Option key={data.id} value={data.id}>
                        {data?.name}
                      </Option>
                    ))}
                </Select>
              </Col>
              <Col lg={6} xs={12}>
                <Select
                  className="w-full"
                  placeholder="Select Session"
                  allowClear
                  showSearch
                  onChange={(value) =>
                    setFilters((prev) => ({ ...prev, session: value }))
                  }
                >
                  {Array.isArray(getSession?.data) &&
                    getSession?.data?.map((data: any) => (
                      <Option key={data.id} value={data.id}>
                        {data?.name}
                      </Option>
                    ))}
                </Select>
              </Col>
              <Col lg={6} xs={12}>
                <SearchComponent
                  onSearch={(value) =>
                    setFilters((prev) => ({ ...prev, search: value }))
                  }
                  placeholder="Search Routine"
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
        columns={useRoutineColumns()}
      />
    </div>
  );
};

export default RoutinePages;
