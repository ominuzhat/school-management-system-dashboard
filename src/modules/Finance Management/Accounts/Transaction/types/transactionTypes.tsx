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
  target_account: string;
}

export interface IGetTransaction {
  id: number;
  account: IGetAccount;
  transaction_type: TransactionType;
  target_account: string;
  amount: number;
  description: string;
}
