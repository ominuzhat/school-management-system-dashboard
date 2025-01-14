export interface ICreateTeacher {
    id:           number;
    first_name:   string;
    last_name:    string;
    email:        string;
    phone_number: string;
    hire_date:    Date;
    is_active:    boolean;
    user:         IUser;
}

export interface IUser {
    username: string;
    password: string;
}
