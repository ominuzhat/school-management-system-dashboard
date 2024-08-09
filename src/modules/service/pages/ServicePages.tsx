import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { Button, Card, Col, Row } from "antd";
import { SearchComponent } from "../../../common/CommonAnt/CommonSearch/CommonSearch";
import { RootState } from "../../../app/store";
import { Table } from "../../../common/CommonAnt";
import { useState } from "react";
import { showModal } from "../../../app/features/modalSlice";
import { PlusOutlined } from "@ant-design/icons";
import { useGetServiceQuery } from "../api/serviceEndpoints";
import useColumns from "../utils/service.util";
import CreateService from "../components/CreateService";

const ServicePages = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => ({
    ...state.filter,
    keyword: search,
  }));

  const { data: serviceData, isLoading } = useGetServiceQuery(filter);

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
                    title: "Add Service",
                    content: <CreateService />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Service
            </Button>
          </Col>
          <Col lg={6}>
            <SearchComponent
              onSearch={(value) => setSearch(value)}
              placeholder="Enter Your Cart Name"
            />
          </Col>
        </Row>
      </Card>

      <Table
        loading={isLoading}
        total={serviceData?.total || 0}
        dataSource={serviceData?.data || []}
        columns={useColumns()}
      />
    </div>
  );
};

export default ServicePages;
