import React from "react";
import Container from "../../../common/Container/Container";
import UsersTable from "../components/UsersTable";
import { Select } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import CreateUser from "../components/CreateUser";

const Users: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <React.Fragment>
      {pathname === "/users" ? (
        <Container
          headerTitle="List of Users"
          content={<UsersTable />}
          buttonLabel="Create User"
          openModal={{ title: "Create User", content: <CreateUser /> }}
          additionalContent={
            <Select
              style={{ width: 150 }}
              placeholder="Select Status"
              optionFilterProp="children"
              filterOption={(input, option) =>
                ((option?.label ?? "") as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "1", label: "Active" },
                { value: "2", label: "In active" },
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

export default Users;
