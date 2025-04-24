import { Button, Card, Col, Row, Select } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";
import { useGetLeaveQuery } from "../api/leaveEndPoints";
import { IGetLeave } from "../types/leaveTypes";
import CreateLeave from "../components/CreateLeave";
import useLeaveColumns from "../utils/LeaveColumns";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useState } from "react";
import { useGetAdmissionSessionQuery } from "../../admission session/api/admissionSessionEndPoints";
import { useGetSectionQuery } from "../../Section/api/sectionEndPoints";
import { useGetClassesQuery } from "../../classes/api/classesEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import NoPermissionData from "../../../../utilities/NoPermissionData";
const { Option } = Select;

const LeavePage = () => {
  const dispatch = useDispatch();
  const { page_size, page } = useAppSelector(FilterState);
  const columns = useLeaveColumns();
  const [filters, setFilters] = useState({
    search: "",
    is_active: "",
    session: "",
    section: "",
    admission__grade_level: "",
  });

  const { data: getClass } = useGetClassesQuery({});
  const { data: getSection } = useGetSectionQuery({});
  const { data: getSession } = useGetAdmissionSessionQuery({});
  const { data: dashboardData } = useGetDashboardDataQuery({});

  const {
    data: classList,
    isLoading,
    isFetching,
    refetch,
  } = useGetLeaveQuery({
    page_size: page_size,
    page: Number(page) || undefined,

    admission__grade_level: filters.admission__grade_level,
    admission__section: filters.section,
    admission__session: filters.session,
    search: filters.search,

    is_active: filters.is_active,
  });

  const dataLength = (classList?.data as IGetLeave[] | undefined)?.length ?? 0;

  const dataSource = (classList?.data as IGetLeave[] | undefined) ?? [];

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.admissionleave,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.admissionleave,
    actionNames.add
  );

  return (
    <div className="space-y-5">
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          {createPermission && (
            <Col lg={4} xs={24}>
              <Button
                type="primary"
                onClick={() =>
                  dispatch(
                    showModal({
                      title: "Add Leave",
                      content: <CreateLeave />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Leave
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
                  placeholder="Search Leave"
                />
              </Col>
              <Col lg={6} xs={12}>
                <Select
                  className="w-full"
                  placeholder="Select Class"
                  allowClear
                  showSearch
                  onChange={(value) =>
                    setFilters((prev) => ({ ...prev, session: value }))
                  }
                >
                  {Array.isArray(getClass?.data) &&
                    getClass?.data?.map((data: any) => (
                      <Option key={data.id} value={data.id}>
                        {data?.name}
                      </Option>
                    ))}
                </Select>
              </Col>{" "}
              <Col lg={6} xs={12}>
                <Select
                  className="w-full"
                  placeholder="Select Section"
                  allowClear
                  showSearch
                  onChange={(value) =>
                    setFilters((prev) => ({ ...prev, session: value }))
                  }
                >
                  {Array.isArray(getSection?.data) &&
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
              {/* <Col lg={6} xs={12}>
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
              </Col> */}
            </Row>
          </Col>
        </Row>
      </Card>

      {viewPermission ? (
        <Table
          rowKey={"id"}
          loading={isLoading || isFetching}
          refetch={refetch}
          total={dataLength}
          dataSource={dataSource}
          columns={columns}
        />
      ) : (
        <NoPermissionData />
      )}
    </div>
  );
};

export default LeavePage;
