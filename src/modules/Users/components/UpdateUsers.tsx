import React from "react";
import { UsersTypes } from "../types/UsersTypes";
import { useUpdateUserMutation } from "../api/usersEndpoint";
import { Form } from "../../../common/CommonAnt";
import { Input } from "antd";
import {
  emailValidator,
  nameValidator,
  phoneValidator,
} from "../../../utilities/validator";

interface Props {
  record: UsersTypes;
}

const UpdateUsers: React.FC<Props> = React.memo(({ record }) => {
  const [update, { isLoading, isSuccess }] = useUpdateUserMutation();

  const onFinish = (value: UsersTypes) => {
    update({ id: record.id, data: value });
  };

  return (
    <React.Fragment>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        defaultRecord={{ ...record }}
      >
        <Form.Item<UsersTypes>
          label="User Name"
          name="owner_name"
          rules={[{ validator: nameValidator }]}
        >
          <Input placeholder="Enter your user name" />
        </Form.Item>

        <Form.Item<UsersTypes>
          label="Email Address"
          name="email"
          rules={[{ validator: emailValidator }]}
        >
          <Input placeholder="Email address" />
        </Form.Item>

        <Form.Item<UsersTypes>
          label="Phone Number"
          name="phone"
          rules={[{ validator: phoneValidator }]}
        >
          <Input addonBefore="+88" placeholder="017XXXXXXXX" />
        </Form.Item>

        <Form.Item<UsersTypes> label="User Address" name="address">
          <Input placeholder="Address" />
        </Form.Item>
      </Form>
    </React.Fragment>
  );
});

export default UpdateUsers;
