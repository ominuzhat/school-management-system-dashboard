import { Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import ViewButton from "../../../../../common/CommonAnt/Button/ViewButton";

const useResultsColumns = (): ColumnsType<any> => {
  return [
    {
      key: "0",
      title: "SL",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "Exam Name",
      dataIndex: "exam",
      align: "center",
      render: (title) => (title ? title.name : "N/A"),
    },
    {
      key: "2",
      title: "Student Name",
      dataIndex: "admission",
      align: "center",
      render: (title) =>
        title
          ? title.student.first_name + " " + title.student.last_name
          : "N/A",
    },
    {
      key: "3",
      title: "Class",
      dataIndex: "admission",
      align: "center",
      render: (title) => (title ? title.grade_level : "N/A"),
    },
    {
      key: "4",
      title: "Roll No.",
      dataIndex: "admission",
      align: "center",
      render: (title) => (title ? title.roll : "N/A"),
    },

    {
      key: "5",
      title: "Grade",
      dataIndex: "grade",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },

    {
      key: "6",
      title: "Contribution Marks",
      dataIndex: "contribution_marks",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "7",
      title: "Total Marks",
      dataIndex: "total_marks",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "8",
      title: "Status",
      dataIndex: "is_passed",
      align: "center",
      render: (title) =>
        title ? <Tag color="green">PASS</Tag> : <Tag color="red">FAIL</Tag>,
    },
    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          <ViewButton to={`view/${record?.id}`} />
        </Space>
      ),
    },
  ];
};

export default useResultsColumns;
