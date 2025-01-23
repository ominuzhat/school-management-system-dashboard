import { Button, Radio, Space } from "antd";
import { useEffect, useState } from "react";

const MarkStudentsAttendanceColumns = ({
  admissionData,
  formData,
  setResult,
}: {
  admissionData: any[];
  formData: any;
  setResult: any;
}) => {
  const [admission, setAdmission] = useState<any[]>([]);
  const [statusMap, setStatusMap] = useState<Record<string, string>>({});

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

  useEffect(() => {
    const initialAttendance = admissionData?.map((student) => ({
      admission: student.id,
      status: "present",
    }));
    setAdmission(initialAttendance);
  }, []);

  useEffect(() => {
    if (admission.length > 0 && formData) {
      const result = {
        session: formData?.session,
        grade_level: formData.grade_level,
        date: formData.date,
        records: admission,
      };

      setResult(result);
    }
  }, [admission, formData, setResult]);

  const handleSetAllStatus = (status: string) => {
    const updatedStatusMap: Record<string, string> = {};
    const updatedAdmission = admissionData.map((student) => {
      updatedStatusMap[student.id] = status;
      return {
        admission: student.id,
        status: status,
      };
    });

    setStatusMap(updatedStatusMap);

    setAdmission(updatedAdmission);
  };

  return [
    {
      title: "Student Name",
      dataIndex: "student",
      key: "student",
      align: "center",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Registration Number",
      dataIndex: "registration_number",
      key: "registration_number",
      align: "left",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Class",
      dataIndex: "grade_level",
      key: "grade_level",
      align: "center",
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: "Session",
      dataIndex: "session",
      key: "session",
      align: "center",
      render: (text: any) => <span>{text?.name}</span>,
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
            onChange={(e) => handleStatusChange(e, record.id)}
            value={statusMap[record?.id] || "present"}
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

export default MarkStudentsAttendanceColumns;
