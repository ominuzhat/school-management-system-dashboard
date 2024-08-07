import { useSelector } from "react-redux";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { Card, Col, Row } from "antd";
import { SearchComponent } from "../../../common/CommonAnt/CommonSearch/CommonSearch";
import { RootState } from "../../../app/store";
import { Table } from "../../../common/CommonAnt";
import { useState } from "react";
import { useGetProductQuery } from "../api/productEndPoints";
import useColumns from "../utils/ProductUtils";

const ProductPages = () => {
  const [search, setSearch] = useState("");
  //   const [cartDataItem, setCartDataItem] = useState<ProductsTypes[]>([]);
  const filter = useSelector((state: RootState) => ({
    ...state.filter, // Assuming you have other filters in the state
    keyword: search,
  }));

  const { data: productData, isLoading } = useGetProductQuery(filter);

  //   useEffect(() => {
  //     if (cartData?.data?.[0]?.products) {
  //       setCartDataItem(cartData.data[0].products);
  //     }
  //   }, [cartData]);
  console.log("productData", productData);
  return (
    <div className="space-y-5">
      <div className="my-5">
        <BreadCrumb />
      </div>
      <Card>
        <Row justify="space-between">
          {/* <Col lg={4}>
            <Button
              type="primary"
              onClick={() =>
                dispatch(
                  showModal({
                    title: "Add Balance Transfer",
                    content: <CreateClientModalForm />,
                  })
                )
              }
              icon={<PlusOutlined />}
              className="w-full"
            >
              Add Balance Transfer
            </Button>
          </Col> */}
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
        total={productData?.total || 0}
        dataSource={productData?.data || []}
        columns={useColumns()}
      />
    </div>
  );
};

export default ProductPages;
