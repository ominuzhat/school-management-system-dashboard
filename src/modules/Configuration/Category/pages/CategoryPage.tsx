import { Button, Card, Col, Row } from "antd";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../../../app/features/modalSlice";
import { SearchComponent } from "../../../../common/CommonAnt/CommonSearch/CommonSearch";
import { RootState } from "../../../../app/store";
import { PlusOutlined } from "@ant-design/icons";
import useColumns from "../utils/CategoryUtils";
import { useGetCategoryQuery } from "../api/CategoryEndPoints";
import CreateCategory from "../components/CreateCategory";
import { Table } from "../../../../common/CommonAnt";

const CategoryPage = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => ({
    ...state.filter,
    keyword: search,
  }));

  const { data: categoryData, isLoading } = useGetCategoryQuery(filter);

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
                    title: "Add Category",
                    content: <CreateCategory />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Category
            </Button>
          </Col>
          <Col lg={6}>
            <SearchComponent
              onSearch={(value) => setSearch(value)}
              placeholder="Enter Your Category Name"
            />
          </Col>
        </Row>
      </Card>

      <Table
        loading={isLoading}
        total={categoryData?.total || 0}
        dataSource={categoryData?.data || []}
        columns={useColumns()}
      />
    </div>
  );
};

export default CategoryPage;
