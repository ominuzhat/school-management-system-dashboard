import { ISession } from "../../../Finance Management/Fees/Collect Fee/type/collectFeeType";
import { IGrade_Level } from "../../subjects/type/subjectsType";

export interface ICreateSection {
  name: string;
  capacity: number;
  is_active: boolean;
}
export interface IGetSection {
  id: number;
  name: string;
  session: ISession;
  grade_level: IGrade_Level;
  capacity: number;
  is_active: boolean;
}
