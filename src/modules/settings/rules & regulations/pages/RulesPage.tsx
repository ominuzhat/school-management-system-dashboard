import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Table } from "../../../../common/CommonAnt";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { useState } from "react";
import { useGetRuleQuery } from "../api/rulesEndPoints";
import useRulesColumns from "../utils/rulesColumns";
import CreateRules from "../components/CreateRules";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../utilities/NoPermissionData";

const RulesPage = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ search: "" });

  const { page_size, page } = useAppSelector(FilterState);

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useRulesColumns();

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.rulesandregulations,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.rulesandregulations,
    actionNames.add
  );

  const {
    data: rulesList,
    isLoading,
    isFetching,
    refetch,
  } = useGetRuleQuery({
    search: filters.search,
    page_size: page_size,
    page: Number(page) || undefined,
  });

  return (
    <div className="space-y-5">
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          {createPermission && (
            <Col lg={4} xs={24}>
              <Button
                type="primary"
                onClick={() =>
                  dispatch(
                    showModal({
                      title: "Add Rule",
                      content: <CreateRules />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Rule
              </Button>
            </Col>
          )}

          <Col lg={8} xs={12}>
            <SearchComponent
              onSearch={(value) =>
                setFilters((prev) => ({ ...prev, search: value }))
              }
              placeholder="Search Notice"
            />
          </Col>
        </Row>
      </Card>

      {viewPermission ? (
        <Table
          rowKey={"id"}
          loading={isLoading || isFetching}
          refetch={refetch}
          total={rulesList?.data?.count}
          dataSource={rulesList?.data?.results || []}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <p className="m-0">
                <span className="font-semibold">Description: </span>
                {record.description || "-"}
              </p>
            ),
            rowExpandable: (record) => !!record.description,
          }}
        />
      ) : (
        <NoPermissionData />
      )}
    </div>
  );
};

export default RulesPage;
