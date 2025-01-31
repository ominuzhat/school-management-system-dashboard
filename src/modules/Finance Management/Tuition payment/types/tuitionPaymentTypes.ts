export interface ICreateTuitionFeePayment {
  payroll: number;
  amount: number;
  payment_method: string;
}

export interface IGetTuitionFeePayment {
  id: number;
  payroll: number;
  amount: number;
  payment_date: string;
  payment_method: string;
}
