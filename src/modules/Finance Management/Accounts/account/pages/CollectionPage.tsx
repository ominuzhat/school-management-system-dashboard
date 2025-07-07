import { Card, Col, Row, DatePicker, Button } from "antd";
import { useAppSelector } from "../../../../../app/store";
import { FilterState } from "../../../../../app/features/filterSlice";
import { useGetDashboardDataQuery } from "../../../../Dashboard/api/dashoboardEndPoints";
import {
  useGetCollectionQuery,
  useLazyGetStaffLedgerFormQuery,
} from "../api/accountEndPoints";
import { GetPermission } from "../../../../../utilities/permission";
import {
  actionNames,
  moduleNames,
} from "../../../../../utilities/permissionConstant";
import NoPermissionData from "../../../../../utilities/NoPermissionData";
import { Table } from "../../../../../common/CommonAnt";
import useCollectionColumns from "../utils/colelctionColumns";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { FaFilePdf } from "react-icons/fa6";

const { MonthPicker } = DatePicker;

const CollectionPage = () => {
  const { page_size, page } = useAppSelector(FilterState);
  const { data: dashboardData } = useGetDashboardDataQuery({});
  const columns = useCollectionColumns();

  const [filters, setFilters] = React.useState({
    start_date: "",
    end_date: "",
    year_month: dayjs().format("YYYY-MM") + "-01",
    collected_by: "",
  });

  const {
    data: collectionData,
    isLoading,
    isFetching,
    refetch,
  } = useGetCollectionQuery({
    page_size: page_size,
    page: Number(page) || undefined,
  });

  const dataLength =
    (collectionData?.data?.results as any[] | undefined)?.length ?? 0;

  const dataSource = (collectionData?.data?.results as any[] | undefined) ?? [];

  const viewPermission = GetPermission(
    dashboardData?.data?.permissions,
    moduleNames.department,
    actionNames.view
  );
  // const createPermission = GetPermission(
  //   dashboardData?.data?.permissions,
  //   moduleNames.department,
  //   actionNames.add
  // );

  const [getPayrollForm, { data: singleFeeForm }] =
    useLazyGetStaffLedgerFormQuery<any>();
  useEffect(() => {
    if (singleFeeForm) {
      const url = URL.createObjectURL(singleFeeForm);

      const newWindow = window.open("", "_blank");

      if (newWindow) {
        newWindow.document.write(`
                <html>
                  <head>
                    <title>Transfer History</title>
                  </head>
                  <body style="margin:0">
                    <iframe 
                      src="${url}" 
                      frameborder="0" 
                      style="width:100%;height:100vh;"
                    ></iframe>
                  </body>
                </html>
              `);
        newWindow.document.close();
      }

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [singleFeeForm]);

  const handleForm = () => {
    getPayrollForm({
      ...filters,
    });
  };

  return (
    <div className="space-y-5">
      {/* <div className="my-5">
        <BreadCrumb />
      </div> */}

      <Card>
        <Row gutter={[10, 10]} justify="end" align="middle">
          {/* Start Date */}
          <Col xs={24} sm={12} md={6} lg={4}>
            <DatePicker
              className="w-full"
              placeholder="Start Date"
              onChange={(date) =>
                setFilters((prev) => ({
                  ...prev,
                  start_date: date ? date.format("YYYY-MM-DD") : "",
                }))
              }
            />
          </Col>

          {/* End Date */}
          <Col xs={24} sm={12} md={6} lg={4}>
            <DatePicker
              className="w-full"
              placeholder="End Date"
              onChange={(date) =>
                setFilters((prev) => ({
                  ...prev,
                  end_date: date ? date.format("YYYY-MM-DD") : "",
                }))
              }
            />
          </Col>

          {/* Year & Month */}
          <Col xs={24} sm={12} md={6} lg={4}>
            <MonthPicker
              className="w-full"
              placeholder="Year & Month"
              defaultValue={dayjs(filters.year_month, "YYYY-MM-DD")}
              onChange={(date) => {
                const formatted = date ? date.format("YYYY-MM") + "-01" : "";
                setFilters((prev) => ({
                  ...prev,
                  year_month: formatted,
                }));
              }}
              format="MMMM YYYY"
            />
          </Col>

          <Col xs={24} sm={12} md={8} lg={4}>
            <Button
              title="Generate File"
              size="middle"
              type="default"
              style={{
                color: "#c20a0a",
                border: "1px solid gray",
                width: "100%",
              }}
              onClick={handleForm}
            >
              <FaFilePdf /> Generate File
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Data Table */}
      <Card>
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
    </div>
  );
};

export default CollectionPage;
