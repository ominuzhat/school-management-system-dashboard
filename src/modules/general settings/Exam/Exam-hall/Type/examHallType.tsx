export interface ICreateExamHall {
  name: string;
  capacity: number;
  description: string;
}

export interface IGetExamHall {
  id: number;
  name: string;
  capacity: number;
  description: string;
  available_capacity: string;
}


