import { IGetSection } from "../../Section/types/sectionTypes";

interface Slot {
  day: string;
  start_time: string;
  end_time: string;
  subject: number;
  teacher: number;
}

export interface ICreateRoutine {
  slots: Slot[];
  section: number;
}

export interface IGetRoutine {
  id: number;
  slots: Slot[];
  section: IGetSection;
}
