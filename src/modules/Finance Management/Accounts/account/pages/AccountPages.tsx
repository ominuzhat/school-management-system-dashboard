import { Card, Col, Row } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

import { useGetAccountQuery } from "../api/accountEndPoints";
import useAccountColumns from "../utils/accountColumns";
import { IGetAccount } from "../types/accountTypes";
import CreateAccount from "../components/CreateAccount";
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

const AccountPage = () => {
  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useAccountColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.account,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.account,
    actionNames.add
  );

  const {
    data: accountList,
    isLoading,
    isFetching,
    refetch,
  } = useGetAccountQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength = (accountList?.data as IGetAccount[] | any)?.length ?? 0;

  const dataSource = (accountList?.data as IGetAccount[] | undefined) ?? [];

  return (
    <div className="space-y-5">
      {/* <div className="my-5">
        <BreadCrumb />
      </div> */}

      <Row gutter={[16, 16]}>
        {/* Account Form */}
        {createPermission && (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
            <Card
              className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
              title={
                <div className="flex items-center">
                  <ArrowUpOutlined className="text-blue-600 mr-2" />
                  <span>Quick Account</span>
                </div>
              }
            >
              <CreateAccount />
            </Card>
          </Col>
        )}

        {/* Account History */}
        {viewPermission ? (
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
            <Card
              className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
              title="Accounts"
            >
              <Table
                rowKey={"id"}
                loading={isLoading || isFetching}
                refetch={refetch}
                total={dataLength}
                dataSource={dataSource}
                columns={columns}
              />
            </Card>
          </Col>
        ) : (
          <NoPermissionData />
        )}
      </Row>

      {/* <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          {createPermission && (
            <Col lg={4} xs={24}>
              <Button
                type="primary"
                onClick={() =>
                  dispatch(
                    showModal({
                      title: "Add Account",
                      content: <CreateAccount />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Account
              </Button>
            </Col>
          )}
        </Row>
      </Card> */}
      {/* 
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
      )} */}
    </div>
  );
};

export default AccountPage;
