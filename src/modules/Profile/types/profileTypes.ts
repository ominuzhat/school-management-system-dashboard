// export type ProfileTypes = {
//   id: number;
//   name: string;
//   email: string;
// };
export type ProfileTypes = {
  createdAt: string;
  updatedAt: string;
  status: boolean;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  gender: string;
  image: string;
  role: {
    id: number;
    name: string;
  };
  customer: null;
  details: null;
};

export type PasswordTypes = {
  old_password: string;
  new_password: string;
};
