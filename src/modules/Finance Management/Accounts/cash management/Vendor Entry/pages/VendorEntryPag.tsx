import { Card, Col, Row } from "antd";
import { useAppSelector } from "../../../../../../app/store";
import { FilterState } from "../../../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../../utilities/permissionConstant";
import { useGetVendorEntriesQuery } from "../api/VendorEntryEndPoints";
import { IGetVendorEntry } from "../types/vendorEntryTypes";
import { Table } from "../../../../../../common/CommonAnt";
import NoPermissionData from "../../../../../../utilities/NoPermissionData";
import CreateVendorEntry from "../components/CreateVendorEntry";
import useVendorPaymentEntryColumns from "../utils/vendorPaymentEntryColumns";

const VendorEntryPage = () => {
  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useVendorPaymentEntryColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.financialentry,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.financialentry,
    actionNames.add
  );

  const {
    data: vendorPaymentList,
    isLoading,
    isFetching,
    refetch,
  } = useGetVendorEntriesQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength =
    (vendorPaymentList?.data?.results as IGetVendorEntry[] | undefined)
      ?.length ?? 0;

  const dataSource =
    (vendorPaymentList?.data?.results as IGetVendorEntry[] | undefined) ?? [];

  return (
    <div className="space-y-5">
      <Row gutter={[16, 16]}>
        {createPermission && (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            {/* <Card
              className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
              title={
                <div className="flex items-center">
                  <ArrowUpOutlined className="text-blue-600 mr-2" />
                  <span>Quick Income & Expense</span>
                </div>
              }
            >
            </Card> */}
            <CreateVendorEntry />
          </Col>
        )}

        {/* Expense List */}
        <Col xs={24} lg={24}>
          <Card
            title="Vendor Payment"
            className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
          >
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
        </Col>
      </Row>
    </div>
  );
};

export default VendorEntryPage;
