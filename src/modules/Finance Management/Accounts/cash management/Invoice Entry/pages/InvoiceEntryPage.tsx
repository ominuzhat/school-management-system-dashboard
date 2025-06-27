import { Button, Card, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../../../../app/store";
import { FilterState } from "../../../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../../utilities/permissionConstant";
import { showModal } from "../../../../../../app/features/modalSlice";
import { Table } from "../../../../../../common/CommonAnt";
import NoPermissionData from "../../../../../../utilities/NoPermissionData";
import { useGetInvoiceEntriesQuery } from "../api/InvoiceEntryEndPoints";
import { IGetInvoiceEntry } from "../types/invoiceEntryTypes";
import CreateInvoiceEntry from "../components/CreateInvoiceEntry";
import useVendorInvoiceColumns from "../utils/vendorInvoiceColumns";

const InvoiceEntryPage = () => {
  const dispatch = useDispatch();

  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useVendorInvoiceColumns();

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
    data: transactionList,
    isLoading,
    isFetching,
    refetch,
  } = useGetInvoiceEntriesQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength =
    (transactionList?.data?.results as IGetInvoiceEntry[] | undefined)
      ?.length ?? 0;

  const dataSource =
    (transactionList?.data?.results as IGetInvoiceEntry[] | undefined) ?? [];

  return (
    <div className="space-y-5">
      <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          {createPermission && (
            <Col lg={4} xs={24}>
              <Button
                type="primary"
                onClick={() =>
                  dispatch(
                    showModal({
                      title: "Add Invoice",
                      content: <CreateInvoiceEntry />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Invoice
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

export default InvoiceEntryPage;
