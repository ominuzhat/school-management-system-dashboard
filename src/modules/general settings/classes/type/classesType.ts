import { IGetTeacher } from "../../../members/teachers/types/teacherType";

export interface IClasses {
  id: number;
  name: string;
  description: string;
  class_teacher: IGetTeacher;
}
