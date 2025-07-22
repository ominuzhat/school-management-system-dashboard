import type { ColumnsType } from "antd/es/table";

const permissionColumn = (): ColumnsType<any> => {
  return [
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
      align: "center",
      render: (name) => (name ? name : "-"),
    },
  ];
};

export default permissionColumn;
