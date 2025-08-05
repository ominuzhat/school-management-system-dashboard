import { Card } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { FilterState } from "../../../app/features/filterSlice";
import { useAppSelector } from "../../../app/store";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { Table } from "../../../common/CommonAnt";
import { GetPermission } from "../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../utilities/permissionConstant";
import { useGetDashboardDataQuery } from "../../Dashboard/api/dashoboardEndPoints";
import { useGetNoticeQuery } from "../../settings/notice/api/noticeEndPoints";
import useNotificationColumns from "../utils/notificationColumns";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ search: "" });
  const { page_size, page } = useAppSelector(FilterState);
    const columns = useNotificationColumns();
  

  const { data: dashboardData } = useGetDashboardDataQuery({});

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.noticeboard,
    actionNames.view
  );

  const {
    data: noticeList,
    isLoading,
    isFetching,
    refetch,
  } = useGetNoticeQuery({
    search: filters.search,
    page_size: page_size,
    page: Number(page) || undefined,
  });

  return (
    <div className="space-y-5">
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card></Card>
      {viewPermission ? (
        <Table
          rowKey={"id"}
          loading={isLoading || isFetching}
          refetch={refetch}
          total={noticeList?.data?.count}
          dataSource={noticeList?.data?.results || []}
          columns={columns}
        />
      ) : (
        <NoPermissionData />
      )}
    </div>
  );
};

export default NotificationPage;
