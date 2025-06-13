import { Button, Card, Col, Row } from "antd";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import { useGetPaymentQuery } from "../api/paymentEndPoints";
import usePaymentColumns from "../utils/paymentColumns";
import CreatePayment from "../components/CreatePayment";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../utilities/NoPermissionData";

const PaymentPage = () => {
  const dispatch = useDispatch();

  const { page_size, page } = useAppSelector(FilterState);
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = usePaymentColumns();

  const {
    data: paymentData,
    isLoading,
    isFetching,
    refetch,
  } = useGetPaymentQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.payment,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.payment,
    actionNames.add
  );

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
                      title: "Add Payment ",
                      content: <CreatePayment />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Payment
              </Button>
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
            total={paymentData?.data?.count}
            dataSource={paymentData?.data?.results}
            columns={columns}
          />
        ) : (
          <NoPermissionData />
        )}
      </Card>
    </div>
  );
};

export default PaymentPage;
