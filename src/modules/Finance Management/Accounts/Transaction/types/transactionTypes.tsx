import { IGetAccount } from "../../account/types/accountTypes";

/* eslint-disable no-unused-vars */
export enum TransactionType {
  CREDIT = "credit",
  DEBIT = "debit",
  TRANSFER = "transfer",
}

export interface ICreateTransaction {
  account: IGetAccount;
  transaction_type: TransactionType;
  amount: number;
  description: string;
}

export interface IGetTransaction {
  id: number;
  account: IGetAccount;
  transaction_type: TransactionType;
  amount: number;
  description: string;
}
