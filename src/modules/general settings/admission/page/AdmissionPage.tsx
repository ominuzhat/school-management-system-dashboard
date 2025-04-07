import { Button, Card, Col, Row, Select } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Table } from "../../../../common/CommonAnt";
import { useGetAdmissionQuery } from "../api/admissionEndPoints";
import useAdmissionColumns from "../utils/admissionColumns";
import { useNavigate } from "react-router-dom";
import { useGetAdmissionSessionQuery } from "../../admission session/api/admissionSessionEndPoints";
import { useGetStudentsQuery } from "../../../members/students/api/studentEndPoints";
import { debounce } from "lodash";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../utilities/NoPermissionData";
const { Option } = Select;

const AdmissionPage = () => {
  const [search, setSearch] = useState("");

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useAdmissionColumns();

  const [filters, setFilters] = useState({
    search: "",
    is_active: "",
    session: "",
    student: "",
  });

  const { page_size, page } = useAppSelector(FilterState);

  const navigate = useNavigate();
  const {
    data: getAdmission,
    isLoading,
    refetch,
    isFetching,
  } = useGetAdmissionQuery({
    search: filters.search,
    is_active: filters.is_active,
    session: filters.session,
    student: filters.student,
    page_size: page_size,
    page: Number(page) || undefined,
  });
  const { data: getSession } = useGetAdmissionSessionQuery({});
  const { data: getStudent } = useGetStudentsQuery({
    search: search,
  });

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.admission,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.admission,
    actionNames.add
  );

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>

      <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          {createPermission && (
            <Col lg={4} xs={24}>
              <Button
                type="primary"
                onClick={() => navigate("/admission/create-admission")}
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Admission
              </Button>
            </Col>
          )}
          <Col lg={14} xs={24}>
            <Row justify="space-between" gutter={[16, 0]}>
              <Col lg={6} xs={12}>
                <SearchComponent
                  onSearch={(value) =>
                    setFilters((prev) => ({ ...prev, search: value }))
                  }
                  placeholder="Search Admission"
                />
              </Col>
              <Col lg={6} xs={12}>
                <Select
                  className="w-full"
                  placeholder="Select Student"
                  allowClear
                  showSearch
                  onSearch={debounce(setSearch, 500)}
                  filterOption={false}
                  loading={isFetching}
                  notFoundContent={
                    Array?.isArray(getStudent?.data?.results) &&
                    getStudent?.data?.results?.length === 0
                      ? "No Students found"
                      : null
                  }
                  onChange={(value) =>
                    setFilters((prev) => ({ ...prev, student: value }))
                  }
                >
                  {getStudent?.data?.results?.map((data: any) => (
                    <Option key={data.id} value={data.id}>
                      {data?.first_name} {data?.last_name}
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
                <Select
                  placeholder="Select Active"
                  className="w-full"
                  allowClear
                  onChange={(value) =>
                    setFilters((prev) => ({ ...prev, is_active: value }))
                  }
                >
                  <Select.Option value={true}>ACTIVE</Select.Option>
                  <Select.Option value={false}>INACTIVE</Select.Option>
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <Card>
        {viewPermission ? (
          <Table
            // loading={isLoading}
            rowKey={"id"}
            loading={isLoading || isFetching}
            refetch={refetch}
            total={getAdmission?.data?.count}
            dataSource={getAdmission?.data?.results}
            columns={columns}
          />
        ) : (
          <NoPermissionData />
        )}
      </Card>
    </div>
  );
};

export default AdmissionPage;
