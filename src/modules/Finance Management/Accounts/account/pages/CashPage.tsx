/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Table } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../../../app/store";
import { FilterState } from "../../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import useTransactionColumns from "../../../Accounts/Transaction/utils/transactionColumns";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import { useGetTransactionQuery } from "../../../Accounts/Transaction/api/transactionEndPoints";
import { IGetTransaction } from "../../../Accounts/Transaction/types/transactionTypes";
import NoPermissionData from "../../../../../utilities/NoPermissionData";

const CashPage = () => {
  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useTransactionColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.transaction,
    actionNames.view
  );

  const { data: transactionList } = useGetTransactionQuery({
    page_size: page_size,
    page: Number(page) || undefined,
    account__type: "cash",
  });

  const dataSource =
    (transactionList?.data?.results as IGetTransaction[] | undefined) ?? [];

  return (
    <div>
      {viewPermission ? (
        <Card
          className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
          title="Transfer History"
        >
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey="id"
            size="middle"
            scroll={{ x: true }}
            pagination={{ pageSize: 10 }}
            expandable={{
              expandedRowRender: (record) => (
                <div className="p-4 bg-gray-50 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center">
                      <ArrowUpOutlined className="text-red-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium">From</p>
                        <p className="text-sm">
                          {record.account?.account_type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <ArrowDownOutlined className="text-green-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium">To</p>
                        <p className="text-sm">
                          {record.target_account?.account_type}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">Purpose:</span>{" "}
                      {record.description}
                    </p>
                  </div>
                </div>
              ),
              rowExpandable: () => true,
            }}
          />
        </Card>
      ) : (
        <NoPermissionData />
      )}
    </div>
  );
};

export default CashPage;
