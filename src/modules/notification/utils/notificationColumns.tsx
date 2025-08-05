import { Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs"; // For formatting dates

const useNotificationColumns = (): ColumnsType<any> => {
  return [
    {
      key: "0",
      title: "SL",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "Title",
      dataIndex: "title",
      align: "center",
      sorter: (a, b) => (a.title || "").localeCompare(b.title || ""),
      render: (title) => (title ? title : "-"),
    },
    // {
    //   key: "2",
    //   title: "Description",
    //   dataIndex: "description",
    //   align: "center",
    //   sorter: (a, b) =>
    //     (a.description || "").localeCompare(b.description || ""),
    //   render: (description) => (description ? description : "-"),
    // },
    {
      key: "3",
      title: "Category",
      dataIndex: "category",
      align: "center",
      sorter: (a, b) => (a.category || "").localeCompare(b.category || ""),
      render: (category) => (category ? category : "-"),
    },
    {
      key: "4",
      title: "Target Audience",
      dataIndex: "target_audience",
      align: "center",
      sorter: (a, b) =>
        (a.target_audience || "").localeCompare(b.target_audience || ""),
      render: (audience) => (audience ? audience : "-"),
    },
    {
      key: "5",
      title: "Published Status",
      dataIndex: "is_published",
      align: "center",
      sorter: (a, b) => Number(b.is_published) - Number(a.is_published),
      render: (is_published) =>
        is_published ? (
          <Tag color="green">Published</Tag>
        ) : (
          <Tag color="red">Unpublished</Tag>
        ),
    },
    {
      key: "6",
      title: "Publish Date",
      dataIndex: "publish_date",
      align: "center",
      sorter: (a, b) =>
        dayjs(a.publish_date || 0).unix() - dayjs(b.publish_date || 0).unix(),
      render: (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "-"),
    },
    {
      key: "7",
      title: "Expiry Date",
      dataIndex: "expiry_date",
      align: "center",
      sorter: (a, b) =>
        dayjs(a.expiry_date || 0).unix() - dayjs(b.expiry_date || 0).unix(),
      render: (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "-"),
    },
  ];
};

export default useNotificationColumns;
