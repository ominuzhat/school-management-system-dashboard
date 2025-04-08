import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../../common/BreadCrumb/BreadCrumb";
import { PlusOutlined } from "@ant-design/icons";
import { SearchComponent } from "../../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useState } from "react";
import { Table } from "../../../../../common/CommonAnt";
import { useGetCollectFeesQuery } from "../api/collectFeeEndPoints";
import useCollectFeeColumns from "../utils/collectFeeColumns";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../../app/store";
import { FilterState } from "../../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../../utilities/NoPermissionData";

const CollectFeePage = () => {
  const [search, setSearch] = useState("");
  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useCollectFeeColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.fees,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.fees,
    actionNames.add
  );

  const {
    data: collectFee,
    isLoading,
    isFetching,
    refetch,
  } = useGetCollectFeesQuery({
    search: search,
    page_size: page_size,
    page: Number(page) || undefined,
  });

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          {createPermission && (
            <Col lg={4} xs={24}>
              <Link to={"/collect-fee"}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  className="w-full"
                >
                  Add Collect Fee
                </Button>
              </Link>
            </Col>
          )}
          <Col lg={6} xs={24}>
            <SearchComponent
              onSearch={(value) => setSearch(value)}
              placeholder="Search Additional"
            />
          </Col>
        </Row>
      </Card>

      {viewPermission ? (
        <Table
          rowKey={"id"}
          loading={isLoading || isFetching}
          refetch={refetch}
          total={collectFee?.data?.count}
          dataSource={collectFee?.data?.results}
          columns={columns}
        />
      ) : (
        <NoPermissionData />
      )}
    </div>
  );
};

export default CollectFeePage;
