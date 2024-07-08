import React from "react";
import Container from "../../../common/Container/Container";
import RestaurantTable from "../components/RestaurantTable";
import { Select } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import CreateRestaurant from "../components/CreateRestaurant";

const Restaurants: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <React.Fragment>
      {pathname === "/restaurants" ? (
        <Container
          headerTitle="List of Restaurants"
          buttonLabel="Create Restaurant"
          content={<RestaurantTable />}
          openModal={{
            title: "Create Restaurant",
            content: <CreateRestaurant />,
          }}
          additionalContent={
            <Select
              style={{ width: 150 }}
              placeholder="Select Version"
              optionFilterProp="children"
              filterOption={(input, option) =>
                ((option?.label ?? "") as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "1", label: "Version 1" },
                { value: "2", label: "Version 2" },
              ]}
            />
          }
        />
      ) : (
        <Outlet />
      )}
    </React.Fragment>
  );
};

export default Restaurants;
