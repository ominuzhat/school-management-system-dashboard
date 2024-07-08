import React from "react";
import { useGetRestaurantsQuery } from "../api/restaurantsEndpoint";
import { Space, Tag } from "antd";
import { Table } from "../../../common/CommonAnt";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import ViewButton from "../../../common/CommonAnt/Button/ViewButton";
import EditButton from "../../../common/CommonAnt/Button/EditButton";
import UpdateRestaurant from "./UpdateRestaurant";
import { showModal } from "../../../app/features/modalSlice";

const RestaurantTable: React.FC = () => {
  const filter = useSelector((state: RootState) => state.filter);
  const { data, isLoading } = useGetRestaurantsQuery(filter);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Table
        loading={isLoading}
        total={data?.total}
        dataSource={data?.data || []}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Restaurant Name",
            dataIndex: "restaurant_name",
            key: "restaurant_name",
          },
          {
            title: "Restaurant Address",
            dataIndex: "restaurant_address",
            key: "restaurant_address",
          },
          {
            title: "Res. Hotline",
            dataIndex: "restaurant_hotline",
            key: "restaurant_hotline",
          },
          {
            title: "Res. Version",
            render: ({ restaurant_version }) => (
              <>
                {restaurant_version === 1 ? (
                  <Tag color="pink">VERSION 1</Tag>
                ) : (
                  <Tag color="purple">VERSION 2</Tag>
                )}
              </>
            ),
            key: "company_name",
          },
          {
            title: "BIN Number",
            dataIndex: "restaurant_bin_number",
            key: "restaurant_bin_number",
          },
          {
            title: "Owner Name",
            dataIndex: "restaurant_owner_name",
            key: "restaurant_owner_name",
          },
          {
            title: "NBR (%)",
            render: (render) =>
              `${render?.restaurant_nbr_percentage || "N/A"}%`,
            key: "restaurant_nbr_percentage",
          },
          {
            title: "Actions",
            render: (record) => (
              <Space>
                <EditButton
                  onClick={() =>
                    dispatch(
                      showModal({
                        title: "Update Restaurant",
                        content: <UpdateRestaurant record={record} />,
                      })
                    )
                  }
                />
                <ViewButton to={`${record.id}`} />
              </Space>
            ),
          },
        ]}
      />
    </React.Fragment>
  );
};

export default RestaurantTable;
