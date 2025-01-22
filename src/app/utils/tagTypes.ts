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
  ClASSES: "Classes",
  SUBJECTS: "Subjects",
  PROFILE: "Profile",
  FESS: "Fess",
  ADMISSION_SESSION: "Admission_Session",
  ADMISSION: "Admission",
} as const;

export type TagType = (typeof TagTypes)[keyof typeof TagTypes];
