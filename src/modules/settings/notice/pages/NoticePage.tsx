import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import { useGetNoticeQuery } from "../api/noticeEndPoints";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useState } from "react";
import useNoticeColumns from "../utils/noticeColumns";
import CreateNotice from "../components/CreateNotice";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../utilities/NoPermissionData";

const NoticePage = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ search: "" });
  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useNoticeColumns();

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
      <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          {createPermission && (
            <Col lg={4} xs={24}>
              <Button
                type="primary"
                onClick={() =>
                  dispatch(
                    showModal({
                      title: "Add Notice",
                      content: <CreateNotice />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Notice
              </Button>
            </Col>
          )}
          <Col lg={8} xs={12}>
            <SearchComponent
              onSearch={(value) =>
                setFilters((prev) => ({ ...prev, search: value }))
              }
              placeholder="Search Notice"
            />
          </Col>
        </Row>
      </Card>
      {viewPermission ? (
        <Table
          rowKey={"id"}
          loading={isLoading || isFetching}
          refetch={refetch}
          total={noticeList?.data?.count}
          dataSource={noticeList?.data?.results || []}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <div className="m-0 py-6">
                <span className="font-semibold  ml-8">Description: </span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: record.description,
                  }}
                  className="prose max-w-none ml-12"
                />
              </div>
            ),
            rowExpandable: (record) => !!record.description,
          }}
        />
      ) : (
        <NoPermissionData />
      )}
    </div>
  );
};

export default NoticePage;
