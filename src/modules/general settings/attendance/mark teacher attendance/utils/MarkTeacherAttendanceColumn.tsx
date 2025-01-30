import { Button, Radio, Space } from "antd";
import { useEffect, useState } from "react";

const useMarkTeacherAttendanceColumns = ({
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
      const initialAdmission = attendanceData?.map((teacher) => {
        const status =
          teacher?.status === "not marked"
            ? "present"
            : teacher?.status || "present";
        initialStatusMap[teacher?.id] = status;
        return {
          admission: teacher?.id,
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
    const updatedAdmission = attendanceData?.map((teacher) => {
      updatedStatusMap[teacher?.id] = status;
      return {
        admission: teacher?.id,
        status: status,
      };
    });

    setStatusMap(updatedStatusMap);
    setAdmission(updatedAdmission);
    setResult(updatedAdmission);
  };

  return [
    {
      title: "Name",
      dataIndex: "first_name",
      key: "teacher",
      align: "center",
      render: (_: any, record: any) =>
        `${record.first_name} ${record.last_name}`,
    },

    {
      title: "User Name",
      dataIndex: "user",
      key: "user",
      align: "center",
      render: (user: any) => <span>{user?.username}</span>,
    },

    {
      title: "Role Name",
      dataIndex: "phone_number",
      key: "user",
      align: "center",
      render: (phone_number: any) => <span>{phone_number}</span>,
    },
    {
      title: "Role Name",
      dataIndex: "user",
      key: "user",
      align: "center",
      render: (user: any) => <span>{user?.role?.name}</span>,
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

export default useMarkTeacherAttendanceColumns;


