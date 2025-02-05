import { Button, Card, Col, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { showModal } from "../../../../app/features/modalSlice";
import CreatePayrollModal from "../components/CreatePayrollModal";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { Table } from "../../../../common/CommonAnt";

import usePayrollColumns from "../utils/payrollColumns";
import { useGetPayrollQuery } from "../api/payrollEndPoints";
import { useState } from "react";

const PayrollPage = () => {
  const [search, setSearch] = useState();

  const { data: payrollData, isLoading } = useGetPayrollQuery({
    search: search,
  });
  const dispatch = useDispatch();
  return (
    <div className="space-y-5">
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row justify="space-between">
          <Col lg={4}>
            <Button
              type="primary"
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Add Payroll",
                    content: <CreatePayrollModal />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Payroll
            </Button>
          </Col>
          <Col lg={6}>
            <SearchComponent
              onSearch={(value: any) => setSearch(value)}
              placeholder="Enter Your Payroll"
            />
          </Col>
        </Row>
      </Card>

      <Table
        loading={isLoading}
        total={payrollData?.data?.results?.length}
        dataSource={payrollData?.data?.results}
        columns={usePayrollColumns()}
      />
    </div>
  );
};

export default PayrollPage;
