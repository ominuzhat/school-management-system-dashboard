import React from "react";
import { useGetUsersQuery } from "../api/usersEndpoint";
import { Table } from "../../../common/CommonAnt";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Space } from "antd";
import EditButton from "../../../common/CommonAnt/Button/EditButton";
import ViewButton from "../../../common/CommonAnt/Button/ViewButton";
import { showModal } from "../../../app/features/modalSlice";
import UpdateUsers from "./UpdateUsers";

const UsersTable: React.FC = () => {
  const filter = useSelector((state: RootState) => state.filter);
  const { data, isLoading } = useGetUsersQuery(filter);
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
            title: "Owner Name",
            dataIndex: "owner_name",
            key: "owner_name",
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
          },
          {
            title: "Address",
            dataIndex: "address",
            key: "address",
          },
          {
            title: "Restaurant Name",
            dataIndex: "restaurant_name",
            key: "restaurant_name",
          },
          {
            title: "Actions",
            render: (record) => (
              <Space>
                <EditButton
                  onClick={() =>
                    dispatch(
                      showModal({
                        title: "Update User",
                        content: <UpdateUsers record={record} />,
                      })
                    )
                  }
                />
                <ViewButton to={`${record.id}`} />
              </Space>
            ),
            key: "restaurant_name",
          },
        ]}
      />
    </React.Fragment>
  );
};

export default UsersTable;
