export type TAttendanceRecord = {
  admission: number; // ID of the admission (student)
  status: "present" | "late" | "absent"; // Status of the attendance
};

export type TAttendanceData = {
  session: number; // Session ID
  grade_level: number; // Grade level ID
  date: string; // The date for the attendance record
  records: TAttendanceRecord[]; // List of attendance records
};
