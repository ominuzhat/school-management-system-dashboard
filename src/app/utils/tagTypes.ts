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
  PROFILE: "Profile",
  FESS: "Fees",
  TUITION_FEES: "Tuition_fees",
  TUITION_FEES_PAYMENT: "Tuition_fees_Payment",
  PAYROLL: "Payroll",
  PAYMENT: "Payment",
  ADMISSION: "Admission",
  DEPARTMENT: "Department",
  ADMISSION_SESSION: "Admission_Session",
  STUDENT_ATTENDANCE: "Student_Attendance",
  TEACHER_ATTENDANCE: "Teacher_Attendance",
} as const;

export type TagType = (typeof TagTypes)[keyof typeof TagTypes];
