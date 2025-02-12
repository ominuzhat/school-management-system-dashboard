// import { Button, Radio, Space } from "antd";
// import { useEffect, useState } from "react";

// const useMarkTeacherAttendanceColumns = ({
//   attendanceData,
//   formData,
//   setResult,
// }: {
//   attendanceData: any[];
//   formData: any;
//   setResult: any;
// }) => {
//   const [admission, setAdmission] = useState<any[]>([]);
//   const [statusMap, setStatusMap] = useState<Record<string, string>>({});
//   const [previousAttendanceData, setPreviousAttendanceData] = useState<any[]>(
//     []
//   );

//   useEffect(() => {
//     if (
//       JSON.stringify(attendanceData) !== JSON.stringify(previousAttendanceData)
//     ) {
//       const initialStatusMap: Record<string, string> = {};
//       const initialAdmission = attendanceData
//         ?.map((data) => {
//           const status =
//             data?.status === "not marked"
//               ? "present"
//               : data?.status || "present";

//           if (data?.teacher) {
//             initialStatusMap[`teacher-${data?.teacher.id}`] = status;
//             return { teacher: data?.teacher.id, status };
//           } else if (data?.employee) {
//             initialStatusMap[`employee-${data.employee.id}`] = status;
//             return { employee: data.employee.id, status };
//           }

//           return null;
//         })
//         .filter(Boolean);

//       setStatusMap(initialStatusMap);
//       setAdmission(initialAdmission);
//       setPreviousAttendanceData(attendanceData);
//     }
//   }, [attendanceData, previousAttendanceData]);

//   useEffect(() => {
//     if (formData && admission.length > 0) {
//       const result = {
//         date: formData.date,
//         records: admission,
//       };
//       setResult(result);
//     }
//   }, [formData, admission, setResult]);

//   const handleStatusChange = (
//     e: any,
//     recordId: number,
//     type: "teacher" | "employee"
//   ) => {
//     const value = e.target.value;
//     const statusKey = `${type}-${recordId}`;

//     setStatusMap((prevStatusMap) => ({
//       ...prevStatusMap,
//       [statusKey]: value,
//     }));

//     setAdmission((prevData) => {
//       const updatedData = prevData.filter(
//         (item) => !(item.teacher === recordId || item.employee === recordId)
//       );

//       return [
//         ...updatedData,
//         type === "teacher"
//           ? { teacher: recordId, status: value }
//           : { employee: recordId, status: value },
//       ];
//     });
//   };

//   const handleSetAllStatus = (status: string) => {
//     const updatedStatusMap: Record<string, string> = {};
//     const updatedAdmission = attendanceData
//       ?.map((data) => {
//         if (data?.teacher) {
//           updatedStatusMap[`teacher-${data?.teacher.id}`] = status;
//           return { teacher: data?.teacher.id, status };
//         } else if (data?.employee) {
//           updatedStatusMap[`employee-${data.employee.id}`] = status;
//           return { employee: data.employee.id, status };
//         }
//         return null;
//       })
//       .filter(Boolean);

//     setStatusMap(updatedStatusMap);
//     setAdmission(updatedAdmission);
//     setResult({
//       date: formData.date,
//       records: updatedAdmission,
//     });
//   };

//   return [
//     {
//       title: "Full Name",
//       dataIndex: "full_name",
//       key: "1",
//       align: "center" as "left" | "right" | "center",
//       render: (_: any, record: any) =>
//         record?.teacher
//           ? `${record?.teacher.first_name} ${record?.teacher.last_name}`
//           : `${record?.employee.first_name} ${record?.employee.last_name}`,
//     },
//     {
//       title: "User Name",
//       dataIndex: "username",
//       key: "2",
//       align: "center" as "left" | "right" | "center",
//       render: (_: any, record: any) =>
//         record?.teacher
//           ? `${record?.teacher?.user?.username} `
//           : `${record?.employee?.user?.username} `,
//     },
//     {
//       title: "Role Type",
//       dataIndex: "roll_type",
//       key: "3",
//       align: "center" as "left" | "right" | "center",
//       render: (_: any, record: any) =>
//         record?.teacher
//           ? `${record?.teacher?.user?.role?.name} `
//           : `${record?.employee?.user?.role?.name} `,
//     },
//     {
//       title: "Phone Number",
//       dataIndex: "phone_number",
//       key: "4",
//       align: "center" as "left" | "right" | "center",
//       render: (_: any, record: any) =>
//         record?.teacher
//           ? `${record?.teacher?.phone_number} `
//           : `${record?.employee.phone_number} `,
//     },
//     {
//       title: (
//         <div className="flex items-center justify-center gap-5">
//           <Button onClick={() => handleSetAllStatus("present")}>
//             All Present
//           </Button>
//           <Button onClick={() => handleSetAllStatus("leave")}>All Leave</Button>
//           <Button onClick={() => handleSetAllStatus("absent")}>
//             All Absent
//           </Button>
//         </div>
//       ) as React.ReactNode,
//       key: "5",
//       width: 400,
//       align: "center" as "left" | "right" | "center",
//       render: (record: any) => {
//         const recordId = record.teacher
//           ? record?.teacher?.id
//           : record?.employee?.id;
//         const type = record?.teacher ? "teacher" : "employee";
//         const statusKey = `${type}-${recordId}`;

//         return (
//           <Space size="middle">
//             <Radio.Group
//               value={statusMap[statusKey]}
//               onChange={(e) => handleStatusChange(e, recordId, type)}
//             >
//               <Radio value="present">Present</Radio>
//               <Radio value="leave">Leave</Radio>
//               <Radio value="absent">Absent</Radio>
//             </Radio.Group>
//           </Space>
//         );
//       },
//     },
//   ];
// };

// export default useMarkTeacherAttendanceColumns;

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
      const initialAdmission = attendanceData
        ?.map((data) => {
          const status =
            data?.status === "not marked"
              ? "present"
              : data?.status || "present";

          if (data?.teacher) {
            initialStatusMap[`teacher-${data?.teacher.id}`] = status;
            return { teacher: data?.teacher.id, status };
          } else if (data?.employee) {
            initialStatusMap[`employee-${data.employee.id}`] = status;
            return { employee: data.employee.id, status };
          }

          return null;
        })
        .filter(Boolean);

      setStatusMap(initialStatusMap);
      setAdmission(initialAdmission);
      setPreviousAttendanceData(attendanceData);
    }
  }, [attendanceData, previousAttendanceData]);

  useEffect(() => {
    if (formData && admission.length > 0) {
      const result = {
        date: formData.date,
        records: attendanceData?.map((data) => {
          const status =
            statusMap[
              `${data?.teacher ? "teacher" : "employee"}-${
                data?.teacher ? data.teacher.id : data.employee.id
              }`
            ] ||
            data?.status ||
            "present";

          return {
            [data?.teacher ? "teacher" : "employee"]:
              data?.teacher?.id || data?.employee?.id,
            status,
          };
        }),
      };

      setResult(result);
    }
  }, [formData, admission, statusMap, attendanceData, setResult]);

  const handleStatusChange = (
    e: any,
    recordId: number,
    type: "teacher" | "employee"
  ) => {
    const value = e.target.value;
    const statusKey = `${type}-${recordId}`;

    setStatusMap((prevStatusMap) => ({
      ...prevStatusMap,
      [statusKey]: value,
    }));

    setAdmission((prevData) => {
      const updatedData = prevData.filter(
        (item) => !(item.teacher === recordId || item.employee === recordId)
      );

      return [
        ...updatedData,
        type === "teacher"
          ? { teacher: recordId, status: value }
          : { employee: recordId, status: value },
      ];
    });
  };

  const handleSetAllStatus = (status: string) => {
    const updatedStatusMap: Record<string, string> = {};
    const updatedAdmission = attendanceData
      ?.map((data) => {
        if (data?.teacher) {
          updatedStatusMap[`teacher-${data?.teacher.id}`] = status;
          return { teacher: data?.teacher.id, status };
        } else if (data?.employee) {
          updatedStatusMap[`employee-${data.employee.id}`] = status;
          return { employee: data.employee.id, status };
        }

        return null;
      })
      .filter(Boolean);

    setStatusMap(updatedStatusMap);
    setAdmission(updatedAdmission);
    setResult({
      date: formData.date,
      records: updatedAdmission,
    });
  };

  return [
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "1",
      align: "center",
      render: (_: any, record: any) =>
        record?.teacher
          ? `${record?.teacher.first_name} ${record?.teacher.last_name}`
          : `${record?.employee.first_name} ${record?.employee.last_name}`,
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "2",
      align: "center",
      render: (_: any, record: any) =>
        record?.teacher
          ? `${record?.teacher?.user?.username} `
          : `${record?.employee?.user?.username} `,
    },
    {
      title: "Role Type",
      dataIndex: "roll_type",
      key: "3",
      align: "center",
      render: (_: any, record: any) =>
        record?.teacher
          ? `${record?.teacher?.user?.role?.name} `
          : `${record?.employee?.user?.role?.name} `,
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "4",
      align: "center",
      render: (_: any, record: any) =>
        record?.teacher
          ? `${record?.teacher?.phone_number} `
          : `${record?.employee.phone_number} `,
    },

    {
      title: (
        <div className="flex items-center justify-center gap-5">
          <Button onClick={() => handleSetAllStatus("present")}>
            All Present
          </Button>
          <Button onClick={() => handleSetAllStatus("leave")}>All leave</Button>
          <Button onClick={() => handleSetAllStatus("absent")}>
            All Absent
          </Button>
        </div>
      ),
      width: 400,
      align: "center",
      render: (record: any) => {
        const recordId = record.teacher
          ? record?.teacher?.id
          : record?.employee?.id;
        const type = record?.teacher ? "teacher" : "employee";
        const statusKey = `${type}-${recordId}`;

        return (
          <Space size="middle">
            <Radio.Group
              value={statusMap[statusKey]}
              onChange={(e) => handleStatusChange(e, recordId, type)}
            >
              <Radio value="present">Present</Radio>
              <Radio value="leave">leave</Radio>
              <Radio value="absent">Absent</Radio>
            </Radio.Group>
          </Space>
        );
      },
    },
  ];
};

export default useMarkTeacherAttendanceColumns;
