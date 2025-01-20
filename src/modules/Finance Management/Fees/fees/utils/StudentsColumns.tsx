import type { ColumnsType } from "antd/es/table";

const useStudentsColumns = (): ColumnsType<any> => {
  return [
    {
      key: "1",
      title: "Name",
      dataIndex: "user",
      align: "center",
      render: (user) => (user ? user.username : "N/A"),
    },
  ];
};

export default useStudentsColumns;
