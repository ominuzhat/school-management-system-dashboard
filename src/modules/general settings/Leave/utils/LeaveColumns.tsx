import { Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import EditButton from "../../../../common/CommonAnt/Button/EditButton";
import { showModal } from "../../../../app/features/modalSlice";
import { useDispatch } from "react-redux";
import UpdateLeave from "../components/UpdateLeave";

const useLeaveColumns = (): ColumnsType<any> => {
  const dispatch = useDispatch();

  return [
    {
      key: "0",
      title: "SL",
      align: "center",
      render: (_text, _record, index) => index + 1,
    },
    {
      key: "1",
      title: "Student Name",
      dataIndex: "admission",
      align: "center",
      render: (title) =>
        title
          ? title?.student?.first_name + " " + title?.student?.last_name
          : "N/A",
    },
    {
      key: "2",
      title: "Section Name",
      dataIndex: "admission",
      align: "center",
      render: (title) => (title ? title?.section?.name : "N/A"),
    },
    {
      key: "3",
      title: "Session Name",
      dataIndex: "admission",
      align: "center",
      render: (title) => (title ? title?.session?.name : "N/A"),
    },
    {
      key: "4",
      title: "Leave Type",
      dataIndex: "leave_type",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      key: "5",
      title: "Duration",
      dataIndex: "duration",
      align: "center",
      render: (type) => {
        if (type === "F") return "Full Day";
        if (type === "H") return "Half Day";
        if (type === "M") return "Multiple Days";
        return "N/A";
      },
    },

    {
      key: "6",
      title: "Start Date",
      dataIndex: "start_date",
      align: "center",
      render: (date) =>
        date
          ? new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }).format(new Date(date))
          : "N/A",
    },
    {
      key: "7",
      title: "End Date",
      dataIndex: "end_date",
      align: "center",
      render: (date) =>
        date
          ? new Intl.DateTimeFormat("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }).format(new Date(date))
          : "N/A",
    },

    {
      key: "7",
      title: "Reason",
      dataIndex: "reason",
      align: "center",
      render: (title) => (title ? title : "N/A"),
    },
    {
      title: "Actions",
      align: "center",
      render: (record) => (
        <Space>
          <EditButton
            onClick={() =>
              dispatch(
                showModal({
                  title: "Update Leave",
                  content: <UpdateLeave record={record?.id} />,
                })
              )
            }
          />
          {/* <ViewButton to={`student-view/1`} />
          <DeleteButton
          onClick={() => handleDelete(record.id)}>
            Delete
          </DeleteButton> */}
        </Space>
      ),
    },
  ];
};

export default useLeaveColumns;
