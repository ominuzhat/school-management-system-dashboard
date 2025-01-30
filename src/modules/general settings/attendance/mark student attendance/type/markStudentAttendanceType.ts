export type TAttendanceRecord = {
  admission: number; // ID of the admission (student)
  status: "present" | "late" | "absent"; // Status of the attendance
};

export type TAttendanceData = {
  session: number; 
  grade_level: number; 
  date: string; 
  records: TAttendanceRecord[];
};
