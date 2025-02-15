import { useParams } from "react-router-dom";
import { useGetSingleRoutineQuery } from "../api/routineEndPoints";
import { Card, Table, Avatar, Tag } from "antd";
import dayjs from "dayjs";
import BreadCrumb from "../../../../common/BreadCrumb/BreadCrumb";

const ViewRoutine = () => {
  const { routineID } = useParams();
  const { data: routineData } = useGetSingleRoutineQuery<any>(
    Number(routineID)
  );
  const formatTime = (time: string) =>
    dayjs(time, "HH:mm:ss").format("hh:mm A");

  const routine = routineData?.data;

  const getDayColor = (day: string) => {
    const colors: Record<string, string> = {
      Sunday: "red",
      Monday: "blue",
      Tuesday: "green",
      Wednesday: "purple",
      Thursday: "orange",
      Friday: "cyan",
      Saturday: "magenta",
    };
    return colors[day] || "default";
  };

  const columns = [
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
      render: (day: string) => <Tag color={getDayColor(day)}>{day}</Tag>,
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
      render: (time: string) => formatTime(time),
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
      render: (time: string) => formatTime(time),
    },
    {
      title: "Subject",
      dataIndex: ["subject", "name"],
      key: "subject",
    },
    {
      title: "Teacher",
      key: "teacher",
      render: (_: any, record: any) => (
        <div className="flex items-center gap-2">
          <Avatar src={record.teacher.image} />
          <span>
            {record.teacher.first_name} {record.teacher.last_name}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="py-5">
        <BreadCrumb />
      </div>

      <div>
        <div className="mb-6 shadow-lg border border-gray-200 rounded-lg">
          <div className="p-4 bg-baseColor  rounded-t-lg">
            <h2 className="text-lg font-semibold">Routine Details</h2>
          </div>
          <div className="p-6 bg-white">
            <div className="grid grid-cols-3 gap-4 text-gray-700">
              <div className="flex flex-col items-center">
                <span className="font-semibold text-lg">Session</span>
                <span className="text-md">{routine?.session?.name}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold text-lg">Grade</span>
                <span className="text-md">{routine?.grade_level?.name}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold text-lg">Section</span>
                <span className="text-md">{routine?.section?.name}</span>
              </div>
            </div>
          </div>
        </div>

        <Card className="shadow-lg" title="Routine Schedule">
          <Table
            dataSource={routine?.slots}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        </Card>
      </div>
    </div>
  );
};

export default ViewRoutine;
