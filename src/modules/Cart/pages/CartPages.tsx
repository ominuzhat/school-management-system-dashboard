import { useDispatch, useSelector } from "react-redux";
import { useGetCartQuery } from "../api/CartEndpoints";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { Card, Col, Row } from "antd";
import { SearchComponent } from "../../../common/CommonAnt/CommonSearch/CommonSearch";
import { RootState } from "../../../app/store";
import { Table } from "../../../common/CommonAnt";
import useColumns from "../utils/CartUtils";
import { useEffect, useState } from "react";
import { ProductsTypes } from "../types/CartTypes";

const CartPages = () => {
  const [search, setSearch] = useState("");
  const [cartDataItem, setCartDataItem] = useState<ProductsTypes[]>([]);
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => ({
    ...state.filter, // Assuming you have other filters in the state
    search,
  }));

  const { data: cartData, isLoading } = useGetCartQuery(filter);

  useEffect(() => {
    if (cartData?.data?.[0]?.products) {
      setCartDataItem(cartData.data[0].products);
    }
  }, [cartData]);
  console.log("cartDataItem", cartDataItem);
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
        total={cartData?.total || 0}
        dataSource={cartDataItem || []}
        columns={useColumns()}
      />
    </div>
  );
};

export default CartPages;
