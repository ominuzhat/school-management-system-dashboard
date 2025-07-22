import type { ColumnsType } from "antd/es/table";

const usersRoleColumn = (): ColumnsType<any> => {
  return [
    {
      key: "1",
      title: "Name",
      dataIndex: "username",
      align: "center",
      render: (name) => (name ? name : "-"),
    },
  ];
};

export default usersRoleColumn;
