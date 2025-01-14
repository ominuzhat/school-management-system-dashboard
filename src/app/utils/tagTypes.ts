export const TagTypes = {
  PROFILE: "Profile",
  RESTAURANT: "Restaurant",
  USERS: "Users",
  LOGIN: "Login",
  CART: "Cart",
  PRODUCT: "Product",
  CATEGORY: "Category",
  ORDER: "Order",
  SERVICE: "Service",

  // school
  ROLE_PERMISSION: "Role_Permission",
  TEACHER: "Teacher",
} as const;

export type TagType = (typeof TagTypes)[keyof typeof TagTypes];
