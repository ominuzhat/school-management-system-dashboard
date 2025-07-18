import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useState } from "react";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../utilities/NoPermissionData";
import useHolidayColumns from "../utils/holidayColumns";
import { useGetHolidayQuery } from "../api/holidayEndPoints";
import CreateHoliday from "../components/CreateHoliday";

const HolidayPage = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ search: "" });
  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useHolidayColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.noticeboard,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.noticeboard,
    actionNames.add
  );

  const {
    data: holidayList,
    isLoading,
    isFetching,
    refetch,
  } = useGetHolidayQuery<any>({
    search: filters.search,
    page_size: page_size,
    page: Number(page) || undefined,
  });

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
                      title: "Add Holiday / Events",
                      content: <CreateHoliday />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Holiday / Events
              </Button>
            </Col>
          )}
          <Col lg={8} xs={12}>
            <SearchComponent
              onSearch={(value) =>
                setFilters((prev) => ({ ...prev, search: value }))
              }
              placeholder="Search Holiday / Events"
            />
          </Col>
        </Row>
      </Card>
      {viewPermission ? (
        <Table
          rowKey={"id"}
          loading={isLoading || isFetching}
          refetch={refetch}
          total={holidayList?.data?.count}
          dataSource={holidayList?.data || []}
          columns={columns}
        />
      ) : (
        <NoPermissionData />
      )}
    </div>
  );
};

export default HolidayPage;
