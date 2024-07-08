import React from "react";
import { useCreateUserMutation } from "../api/usersEndpoint";
import { UsersTypes } from "../types/UsersTypes";
import { Form } from "../../../common/CommonAnt";
import { Input, Select } from "antd";
import { useGetRestaurantsQuery } from "../../Restaurants/api/restaurantsEndpoint";
import { RestaurantTypes } from "../../Restaurants/types/RestaurantTypes";
import {
  emailValidator,
  passwordValidator,
  phoneValidator,
  nameValidator,
} from "../../../utilities/validator";

const CreateUser: React.FC = React.memo(() => {
  const { data } = useGetRestaurantsQuery(undefined);

  const [create, { isLoading, isSuccess }] = useCreateUserMutation();

  const onFinish = (value: UsersTypes) => {
    create(value);
  };

  return (
    <React.Fragment>
      <Form onFinish={onFinish} isLoading={isLoading} isSuccess={isSuccess}>
        <Form.Item<UsersTypes>
          label="Select Restaurant"
          name="restaurant_id"
          rules={[{ required: true, message: "Restaurent is required" }]}
        >
          <Select
            showSearch
            allowClear
            placeholder="Select One"
            optionFilterProp="children"
            filterOption={(input, option) =>
              ((option?.label ?? "") as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={data?.data?.map(
              ({ restaurant_name, id }: RestaurantTypes) => {
                return {
                  label: restaurant_name,
                  value: id,
                };
              }
            )}
          />
        </Form.Item>

        <Form.Item<UsersTypes>
          label="User Name"
          name="owner_name"
          rules={[{ required: true }, { validator: nameValidator }]}
        >
          <Input placeholder="Enter your user name" />
        </Form.Item>

        <Form.Item<UsersTypes>
          label="Email Address"
          name="email"
          rules={[{ required: true }, { validator: emailValidator }]}
        >
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item<UsersTypes>
          label="Password"
          name="password"
          rules={[{ required: true }, { validator: passwordValidator }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item<UsersTypes>
          label="Phone Number"
          name="phone"
          rules={[{ required: true }, { validator: phoneValidator }]}
        >
          <Input addonBefore="+88" placeholder="017XXXXXXXX" />
        </Form.Item>

        <Form.Item<UsersTypes>
          label="User Address"
          name="address"
          rules={[{ required: true, message: "Address is required" }]}
        >
          <Input placeholder="Address" />
        </Form.Item>
      </Form>
    </React.Fragment>
  );
});

export default CreateUser;
