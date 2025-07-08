import { Button, Radio, Space } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const useMarkStudentsAttendanceColumns = ({
  attendanceData,
  formData,
  setResult,
}: {
  attendanceData: any[];
  formData: any;
  setResult: any;
}) => {
  const [admission, setAdmission] = useState<any[]>([]);
  const [statusMap, setStatusMap] = useState<Record<string, string>>({});
  const [previousAttendanceData, setPreviousAttendanceData] = useState<any[]>(
    []
  );
  const [checkInOutMap, setCheckInOutMap] = useState<
    Record<number, { check_in?: string; check_out?: string }>
  >({});

  useEffect(() => {
    if (
      JSON.stringify(attendanceData) !== JSON.stringify(previousAttendanceData)
    ) {
      const initialStatusMap: Record<string, string> = {};
      const initialAdmission = attendanceData?.map((student) => {
        const status =
          student?.status === "not marked"
            ? "present"
            : student?.status || "present";

        initialStatusMap[student.admission.id] = status;

        // Initialize check-in/out map
        setCheckInOutMap((prev) => ({
          ...prev,
          [student.admission.id]: {
            check_in: student.check_in,
            check_out: student.check_out,
          },
        }));

        return {
          admission: student.admission.id,
          status: status,
          check_in: student.check_in,
          check_out: student.check_out,
        };
      });

      setStatusMap(initialStatusMap);
      setAdmission(initialAdmission);
      setPreviousAttendanceData(attendanceData);
    }
  }, [attendanceData, previousAttendanceData]);

  useEffect(() => {
    if (formData && admission.length > 0) {
      const result = {
        session: formData?.session,
        grade_level: formData.grade_level,
        date: formData.date,
        records: admission,
      };
      setResult(result);
    }
  }, [formData, admission, setResult]);

  const handleStatusChange = (e: any, recordId: string) => {
    const value = e.target.value;
    setStatusMap((prevStatusMap) => ({
      ...prevStatusMap,
      [recordId]: value,
    }));

    setAdmission((prevData) => {
      const filtered = prevData.filter((item) => item.admission !== recordId);
      return [
        ...filtered,
        {
          admission: Number(recordId),
          status: value,
          check_in: checkInOutMap[Number(recordId)]?.check_in,
          check_out: checkInOutMap[Number(recordId)]?.check_out,
        },
      ];
    });
  };

  const handleSetAllStatus = (status: string) => {
    const updatedStatusMap: Record<string, string> = {};
    const updatedAdmission = attendanceData?.map((student) => {
      updatedStatusMap[student.admission.id] = status;
      return {
        admission: student.admission.id,
        status: status,
        check_in: checkInOutMap[student.admission.id]?.check_in,
        check_out: checkInOutMap[student.admission.id]?.check_out,
      };
    });

    setStatusMap(updatedStatusMap);
    setAdmission(updatedAdmission);
    setResult(updatedAdmission);
  };

  return [
    {
      key: "0",
      title: "SL No.",
      align: "center",
      render: (_text: any, _record: any, index: any) => index + 1,
    },

    {
      title: "Student Name",
      dataIndex: "admission",
      key: "student",
      align: "center",
      render: (admission: any) => (
        <Link
          to={`/admission/admission-view/${admission?.id}`}
          className="text-green-500"
        >
          {admission?.student?.first_name} {admission?.student?.last_name}
        </Link>
      ),
    },
    {
      title: "User ID",
      dataIndex: "admission",
      key: "username",
      align: "center",
      render: (admission: any) => (
        <span>{admission?.student?.user?.username}</span>
      ),
    },
    {
      title: "Shift",
      dataIndex: "admission",
      key: "shift",
      align: "center",
      render: (admission: any) => <span>{admission?.shift?.name}</span>,
    },
    {
      title: "Section",
      dataIndex: "admission",
      key: "section",
      align: "center",
      render: (admission: any) => <span>{admission?.section?.name}</span>,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      align: "center",
      render: (duration: any) => <span>{duration}</span>,
    },
    {
      title: "Check-in",
      key: "check_in",
      align: "center",
      render: (record: any) => {
        const value =
          checkInOutMap[record.admission.id]?.check_in || record?.check_in;

        // Convert to HH:mm for input type="time"
        const timeValue = value ? value.slice(0, 5) : "";

        return (
          <input
            type="time"
            value={timeValue}
            onChange={(e) => {
              const timeStr = e.target.value
                ? `${e.target.value}:00`
                : undefined;

              setCheckInOutMap((prev) => ({
                ...prev,
                [record.admission.id]: {
                  ...prev[record.admission.id],
                  check_in: timeStr,
                },
              }));

              setAdmission((prev) => {
                const filtered = prev.filter(
                  (item) => item.admission !== record.admission.id
                );
                return [
                  ...filtered,
                  {
                    admission: record.admission.id,
                    status: statusMap[record.admission.id] || "present",
                    check_in: timeStr,
                    check_out: checkInOutMap[record.admission.id]?.check_out,
                  },
                ];
              });
            }}
            className="border border-gray-300 w-full rounded-lg px-3 py-0.5"
          />
        );
      },
    },

    {
      title: "Check-out",
      key: "check_out",
      align: "center",
      render: (record: any) => {
        const value =
          checkInOutMap[record.admission.id]?.check_out || record?.check_out;

        // Convert to HH:mm for input type="time"
        const timeValue = value ? value.slice(0, 5) : "";

        return (
          <input
            type="time"
            value={timeValue}
            onChange={(e) => {
              const timeStr = e.target.value
                ? `${e.target.value}:00`
                : undefined;

              setCheckInOutMap((prev) => ({
                ...prev,
                [record.admission.id]: {
                  ...prev[record.admission.id],
                  check_out: timeStr,
                },
              }));

              setAdmission((prev) => {
                const filtered = prev.filter(
                  (item) => item.admission !== record.admission.id
                );
                return [
                  ...filtered,
                  {
                    admission: record.admission.id,
                    status: statusMap[record.admission.id] || "present",
                    check_in: checkInOutMap[record.admission.id]?.check_in,
                    check_out: timeStr,
                  },
                ];
              });
            }}
            className="border border-gray-300 w-full rounded-lg px-3 py-0.5"
          />
        );
      },
    },

    {
      title: (
        <div className="flex items-center justify-center gap-2">
          <Button onClick={() => handleSetAllStatus("present")}>
            All Present
          </Button>
          <Button onClick={() => handleSetAllStatus("late")}>All Delay</Button>
          <Button onClick={() => handleSetAllStatus("absent")}>
            All Absent
          </Button>
          <Button onClick={() => handleSetAllStatus("half")}>All Half</Button>
        </div>
      ),
      width: 400,
      align: "center",
      render: (record: any) => (
        <Space>
          <Radio.Group
            onChange={(e) => handleStatusChange(e, record.admission.id)}
            value={statusMap[record.admission?.id] || "present"}
          >
            <Radio value="present">P</Radio>
            <Radio value="late">D</Radio>
            <Radio value="absent">A</Radio>
            <Radio value="half">H</Radio>
          </Radio.Group>
        </Space>
      ),
    },
  ];
};

export default useMarkStudentsAttendanceColumns;
