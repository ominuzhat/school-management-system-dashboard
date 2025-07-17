import { Button, Card, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import useLeaveColumns from "../utils/ScheduleColumns";

import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { useAppSelector } from "../../../../../app/store";
import { FilterState } from "../../../../../app/features/filterSlice";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import { useGetScheduleQuery } from "../api/scheduleEndPoints";
import { showModal } from "../../../../../app/features/modalSlice";
import { Table } from "../../../../../common/CommonAnt";
import NoPermissionData from "../../../../../utilities/NoPermissionData";
import CreateSchedule from "../components/CreateSchedule";
import { IGetSchedule } from "../types/scheduleTypes";

const SchedulePage = () => {
  const dispatch = useDispatch();
  const { page_size, page } = useAppSelector(FilterState);
  const columns = useLeaveColumns();

  const { data: dashboardData } = useGetDashboardDataQuery({});

  const {
    data: classList,
    isLoading,
    isFetching,
    refetch,
  } = useGetScheduleQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength =
    (classList?.data as IGetSchedule[] | undefined)?.length ?? 0;

  const dataSource = (classList?.data as IGetSchedule[] | undefined) ?? [];

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
                      title: "Add Schedule",
                      content: <CreateSchedule />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Schedule
              </Button>
            </Col>
          )}
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

export default SchedulePage;
