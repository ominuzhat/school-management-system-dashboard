import { Card, Col, Row } from "antd";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../../app/store";
import { FilterState } from "../../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { useGetCollectionQuery } from "../api/accountEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import NoPermissionData from "../../../../../utilities/NoPermissionData";
import { Table } from "../../../../../common/CommonAnt";
import useCollectionColumns from "../utils/colelctionColumns";

const CollectionPage = () => {
  const { page_size, page } = useAppSelector(FilterState);
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useCollectionColumns();
  const navigate = useNavigate();

  const {
    data: collectionData,
    isLoading,
    isFetching,
    refetch,
  } = useGetCollectionQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength =
    (collectionData?.data?.results as any[] | undefined)?.length ?? 0;

  const dataSource = (collectionData?.data?.results as any[] | undefined) ?? [];

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.department,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.department,
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
              <Col lg={10}>
                <p
                  onClick={() => navigate("/employees")}
                  className="w-fit  underline text-blue-400  cursor-pointer"
                >
                  Manage Employee
                </p>
              </Col>
            </Col>
          )}
        </Row>
      </Card>
      <Card>
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
      </Card>
    </div>
  );
};

export default CollectionPage;
