import { IGetPayment } from "../../../payment/types/paymentTypes";
import { IGetFee } from "../../fees/types/feesType";

export interface ICreateTuitionFee {
  admission: number;
  month: string;
}

export interface IGetTuitionFee {
  id: number;
  admission: number;
  month: string;
  gross_amount: number;
  net_amount: number;
  paid_amount: number;
  status: "paid" | "unpaid";
  created_at: string;
  one_time_fee: number;
  fees: IGetFee[];
  payments: IGetPayment;
}
