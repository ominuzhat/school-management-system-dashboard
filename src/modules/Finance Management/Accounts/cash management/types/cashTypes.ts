/* eslint-disable no-unused-vars */
// Enums
export enum EntryTypeEnum {
  INCOME = "income",
  EXPENSE = "expense",
}

export enum PaymentMethodEnum {
  CASH = "cash",
  CARD = "card",
  ONLINE = "online",
}

// Main type/interface
export interface IGetCash {
  id: number;
  account: any;
  amount: number;
  description: string;
  entry_type?: EntryTypeEnum; // optional if not marked with *
  payment_method?: PaymentMethodEnum; // optional if not marked with *
  date?: string; // ISO string or Date
  created_at: string; // ISO string
  updated_at: string; // ISO string
}

export interface ICreateCash {
  account: number;
  amount: number;
  description: string;
  entry_type: EntryTypeEnum;
  payment_method: PaymentMethodEnum;
  date: string;
}
