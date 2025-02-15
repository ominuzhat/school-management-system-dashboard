import { ISession } from "../../../Finance Management/Fees/Collect Fee/type/collectFeeType";
import { IClasses } from "../../classes/type/classesType";
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
  grade_level: number;
  session: number;
}

export interface IGetRoutine {
  id: number;
  slots: Slot[];
  section: IGetSection;
  grade_level: IClasses;
  session: ISession;
}
