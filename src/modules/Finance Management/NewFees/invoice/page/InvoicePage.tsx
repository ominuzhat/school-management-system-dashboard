import { Card, Col, Row } from "antd";
import { SearchComponent } from "../../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useState } from "react";
import { Table } from "../../../../../common/CommonAnt";

import { useAppSelector } from "../../../../../app/store";
import { FilterState } from "../../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../../utilities/NoPermissionData";
import useInvoiceColumns from "../utils/invoiceColumns";
import { useGetInvoiceQuery } from "../api/invoiceEndPoints";

const InvoicePage = () => {
  const [search, setSearch] = useState("");
  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useInvoiceColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.fees,
    actionNames.view
  );

  const {
    data: collectFee,
    isLoading,
    isFetching,
    refetch,
  } = useGetInvoiceQuery({
    search: search,
    page_size: page_size,
    page: Number(page) || undefined,
  });
  return (
    <div>
      {/* <div className="my-5">
        <BreadCrumb />
      </div> */}
      <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          <Col lg={6} xs={24}>
            <SearchComponent
              onSearch={(value) => setSearch(value)}
              placeholder="Search Invoice"
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
          dataSource={collectFee?.data}
          columns={columns}
        />
      ) : (
        <NoPermissionData />
      )}
    </div>
  );
};

export default InvoicePage;
