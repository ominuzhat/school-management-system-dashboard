/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Row, Col } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../../../../app/store";
import { FilterState } from "../../../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../../utilities/permissionConstant";
import { useGetVendorQuery } from "../api/vendorEndPoints";
import { IGetVendor } from "../types/vendorTypes";
import CreateVendor from "../Components/CreateVendor";
import NoPermissionData from "../../../../../../utilities/NoPermissionData";
import useVendorColumns from "../utils/vendorColumns";
import { Table } from "../../../../../../common/CommonAnt";
import { SearchComponent } from "../../../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useState } from "react";

export const VendorPage = () => {
  const { page_size, page } = useAppSelector(FilterState);
  const [search, setSearch] = useState<string>();

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useVendorColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.transaction,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.transaction,
    actionNames.add
  );

  const {
    data: vendorList,
    isLoading,
    isFetching,
    refetch,
  } = useGetVendorQuery<any>({
    page_size: page_size,
    page: Number(page) || undefined,
    search: search,
  });

  const dataSource =
    (vendorList?.data?.results as IGetVendor[] | undefined) ?? [];

  return (
    <div className="space-y-6">
      <Row gutter={[16, 16]}>
        {/* Transfer Form */}

        {createPermission && (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Card
              className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
              title={
                <div className="flex items-center">
                  <ArrowUpOutlined className="text-blue-600 mr-2" />
                  <span>Quick Vendor</span>
                </div>
              }
            >
              <CreateVendor />
            </Card>
          </Col>
        )}

        {/* Transfer History */}
        {viewPermission ? (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Card
              className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
              title={
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 text-base font-medium">
                    Vendor List
                  </span>
                  <div className="w-1/3">
                    <SearchComponent
                      placeholder="Search Vendor"
                      onSearch={(value) => setSearch(value)}
                    />
                  </div>
                </div>
              }
            >
              <Table
                rowKey={"id"}
                loading={isLoading || isFetching}
                refetch={refetch}
                total={vendorList?.data?.length}
                dataSource={dataSource}
                columns={columns}
              />
            </Card>
          </Col>
        ) : (
          <NoPermissionData />
        )}
      </Row>
    </div>
  );
};

export default VendorPage;
