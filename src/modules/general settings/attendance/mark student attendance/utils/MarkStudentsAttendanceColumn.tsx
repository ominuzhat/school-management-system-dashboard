import { Button, Radio, Space } from "antd";
import { useEffect, useState } from "react";

const useMarkStudentsAttendanceColumns = ({
  attendanceData,
  formData,
  setResult,
  gradeLevel,
  session,
}: {
  attendanceData: any[];
  formData: any;
  setResult: any;
  gradeLevel: any;
  session: any;
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
      title: "Registration Number",
      dataIndex: "admission",
      key: "registration_number",
      align: "left",
      render: (admission: any) => <span>{admission?.registration_number}</span>,
    },
    {
      title: "Class",
      dataIndex: "admission",
      key: "grade_level",
      align: "center",
      render: () => <span>{gradeLevel?.name}</span>,
    },
    {
      title: "Session",
      dataIndex: "admission",
      key: "session",
      align: "center",
      render: () => <span>{session?.name}</span>,

    },
    {
      title: (
        <div className="flex items-center justify-center gap-5">
          <Button onClick={() => handleSetAllStatus("present")}>
            All Present
          </Button>
          <Button onClick={() => handleSetAllStatus("late")}>All Late</Button>
          <Button onClick={() => handleSetAllStatus("absent")}>
            All Absent
          </Button>
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
            <Radio value="late">L</Radio>
            <Radio value="absent">A</Radio>
          </Radio.Group>
        </Space>
      ),
    },
  ];
};

export default useMarkStudentsAttendanceColumns;
