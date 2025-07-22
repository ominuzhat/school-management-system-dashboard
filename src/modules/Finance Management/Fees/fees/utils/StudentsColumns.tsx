import type { ColumnsType } from "antd/es/table";

const useStudentsColumns = (): ColumnsType<any> => {
  return [
    {
      key: "0",
      title: "SL No.",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "User ID",
      dataIndex: "user",
      align: "center",
      render: (user) => (user ? user.username : "-"),
    },
    // {
    //   key: "1",
    //   title: "Name",
    //   dataIndex: "user",
    //   align: "center",
    //   render: (user) => (user ? user.username : "-"),
    // },
  ];
};

export default useStudentsColumns;
