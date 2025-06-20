import { Card, Table } from "antd";
import { LuClock2 } from "react-icons/lu";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../../../app/store";
import { FilterState } from "../../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../../utilities/NoPermissionData";
import { useGetTransactionQuery } from "../../Transaction/api/transactionEndPoints";
import { IGetTransaction } from "../../Transaction/types/transactionTypes";
import useTransactionApprovalColumns from "../../Transaction/utils/transactionApprovalColumns";

const ApprovalPage = () => {
  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useTransactionApprovalColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.transaction,
    actionNames.view
  );

  const { data: transactionList } = useGetTransactionQuery({
    page_size: page_size,
    page: Number(page) || undefined,
    approval_status: "requested",
    transaction_type: "debit",
  });

  const dataSource =
    (transactionList?.data?.results as IGetTransaction[] | undefined) ?? [];
  return (
    <div className="space-y-4">
      <Card>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div>
              <LuClock2 className="text-green-600 text-5xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Approval System</h1>
              <p>Approve staff payment & fee collection requests</p>
            </div>
          </div>
        </div>
      </Card>

      {viewPermission ? (
        <Card
          className="bg-white/60 backdrop-blur-sm border-blue-100 h-full"
          title="Pending Requests"
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

export default ApprovalPage;
