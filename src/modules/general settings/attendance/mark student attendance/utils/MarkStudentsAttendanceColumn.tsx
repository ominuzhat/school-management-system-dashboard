import { Button, Radio, Space } from "antd";
import { useEffect, useState } from "react";

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
        return {
          admission: student.admission.id,
          status: status,
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
      const updatedData = prevData.filter(
        (item) => item.admission !== recordId
      );
      return [...updatedData, { admission: Number(recordId), status: value }];
    });
  };

  const handleSetAllStatus = (status: string) => {
    const updatedStatusMap: Record<string, string> = {};
    const updatedAdmission = attendanceData?.map((student) => {
      updatedStatusMap[student.admission.id] = status;
      return {
        admission: student.admission.id,
        status: status,
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
        <span>
          {admission?.student?.first_name} {admission?.student?.last_name}
        </span>
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
      title: (
        <div className="flex items-center justify-center gap-5">
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
