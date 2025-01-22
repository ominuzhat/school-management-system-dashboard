import { Button, Card, Col, Row, Select } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Table } from "../../../../common/CommonAnt";
import { useGetAdmissionQuery } from "../api/admissionEndPoints";
import useAdmissionColumns from "../utils/admissionColumns";
import { useNavigate } from "react-router-dom";

const AdmissionPage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { data: getAdmission, isLoading } = useGetAdmissionQuery({});

  return (
    <div>
      <div className="my-5">
        <BreadCrumb />
      </div>

      <Card>
        <Row justify="space-between" gutter={[10, 10]}>
          <Col lg={4} xs={24}>
            <Button
              type="primary"
              onClick={() => navigate("/admission/create-admission")}
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Admission
            </Button>
          </Col>
          <Col lg={10} xs={24}>
            <Row justify="space-between" gutter={[16, 0]}>
              <Col lg={12} xs={12}>
                <Select placeholder="Select Class" className="w-full">
                  {/* {categoryData?.data?.map((category) => (
                  <Select.Option key={category.id} value={category?.id}>
                    {category?.name}
                  </Select.Option>
                ))} */}

                  <Select.Option value={1}>1</Select.Option>
                </Select>
              </Col>
              <Col lg={12} xs={12}>
                <SearchComponent
                  onSearch={(value) => setSearch(value)}
                  placeholder="Search students"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <Card>
        <Table
          loading={isLoading}
          total={getAdmission?.data?.results?.length}
          dataSource={getAdmission?.data?.results}
          columns={useAdmissionColumns()}
        />
      </Card>
    </div>
  );
};

export default AdmissionPage;
