/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, Col, Row, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";

import { showModal } from "../../../../app/features/modalSlice";

import useTeacherColumns from "../utils/ticketColumns";
import { useAppSelector } from "../../../../app/store";
import { FilterState } from "../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../Dashboard/api/dashoboardEndPoints";
import { GetPermission } from "../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../utilities/NoPermissionData";
import { useGetTicketQuery } from "../api/ticketEndPoints";
import CreateTicket from "../components/CreateTicket";
import { Table } from "../../../../common/CommonAnt";

const TicketPage = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ search: "", is_active: "" });

  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useTeacherColumns();

  const { page_size, page } = useAppSelector(FilterState);

  const {
    data: ticketData,
    isLoading,
    refetch,
    isFetching,
  } = useGetTicketQuery({
    search: filters.search,
    is_active: filters.is_active,
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.teacher,
    actionNames.view
  );
  const createPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.teacher,
    actionNames.add
  );

  return (
    <div>
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
                      title: "Add Ticket",
                      content: <CreateTicket />,
                    })
                  )
                }
                icon={<PlusOutlined />}
                className="w-full"
              >
                Add Ticket
              </Button>
            </Col>
          )}
          <Col lg={10} xs={24}>
            <Row justify="space-between" gutter={[16, 0]}>
              <Col lg={8} xs={12}>
                <Select
                  placeholder="Select Active"
                  className="w-full"
                  allowClear
                  onChange={(value) =>
                    setFilters((prev) => ({ ...prev, is_active: value }))
                  }
                >
                  <Select.Option value={true}>ACTIVE</Select.Option>
                  <Select.Option value={false}>INACTIVE</Select.Option>
                </Select>
              </Col>
              <Col lg={16} xs={12}>
                <SearchComponent
                  onSearch={(value) =>
                    setFilters((prev) => ({ ...prev, search: value }))
                  }
                  placeholder="Search Teacher"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {viewPermission ? (
        <Card
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>All Ticket</span>
            </div>
          }
        >
          <Table
            rowKey={"id"}
            loading={isLoading || isFetching}
            refetch={refetch}
            total={ticketData?.data?.results?.length}
            dataSource={ticketData?.data?.results}
            columns={columns}
          />
        </Card>
      ) : (
        <NoPermissionData />
      )}
    </div>
  );
};

export default TicketPage;
