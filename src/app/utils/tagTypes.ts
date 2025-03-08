export const TagTypes = {
  RESTAURANT: "Restaurant",
  USERS: "Users",
  LOGIN: "Login",
  CART: "Cart",
  PRODUCT: "Product",
  CATEGORY: "Category",
  ORDER: "Order",
  SERVICE: "Service",

  // school
  INSTITUTE_PROFILE: "Institution_Profile",
  ROLE_PERMISSION: "Role_Permission",
  TEACHER: "Teacher",
  STUDENTS: "Students",
  EMPLOYEE: "Employee",
  ClASSES: "Classes",
  SUBJECTS: "Subjects",
  SECTION: "Section",
  PROFILE: "Profile",
  ROUTINE: "Routine",
  FESS: "Fees",
  TERM: "Term",
  ACCOUNT: "Account",
  DASHBOARD: "Dashboard",
  TRANSACTION: "Transaction",
  ADDITIONAL_FEE: "Additional_fees",
  COLLECT_FEE: "Collect_fees",
  TUITION_FEES_PAYMENT: "Tuition_fees_Payment",
  PAYROLL: "Payroll",
  PAYMENT: "Payment",
  NOTICE: "Notice",
  RULES: "Rules",
  SMS: "Sms",
  SHIFT: "Shift",
  EXAM: "Exam",
  EXAM_Hall: "Exam_Hall",
  ADMISSION: "Admission",
  DEPARTMENT: "Department",
  ADMISSION_SESSION: "Admission_Session",
  STUDENT_ATTENDANCE: "Student_Attendance",
  TEACHER_ATTENDANCE: "Teacher_Attendance",
} as const;

export type TagType = (typeof TagTypes)[keyof typeof TagTypes];
