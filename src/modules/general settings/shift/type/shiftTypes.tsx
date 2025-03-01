export interface IGetShift {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
}

export interface ICreateShift {
  name: string;
  start_time: string;
  end_time: string;
}
