/* eslint-disable no-unused-vars */
export enum AccountType {
  BRAC_VISA = "brac_visa",
  DBBL_VISA = "dbbl_visa",
  CITY_VISA = "city_visa",
  EBL_VISA = "ebl_visa",
  SBL_VISA = "sbl_visa",
  BRAC_MASTER = "brac_master",
  DBBL_MASTER = "dbbl_master",
  CITY_MASTER = "city_master",
  EBL_MASTER = "ebl_master",
  SBL_MASTER = "sbl_master",
  CITY_AMEX = "city_amex",
  QCASH = "qcash",
  DBBL_NEXUS = "dbbl_nexus",
  BANK_ASIA = "bankasia",
  AB_BANK = "abbank",
  IBBL = "ibbl",
  MTBL = "mtbl",
  BKASH = "bkash",
  DBBL_MOBILE_BANKING = "dbblmobilebanking",
  CITY_TOUCH = "city",
  UPAY = "upay",
  TAP_N_PAY = "tapnpay",
  WALLET = "wallet",
}

export interface ICreateAccount {
  account_type: AccountType;
  balance: number;
}

export interface IGetAccount {
  id: number;
  account_type: AccountType;
  balance: number;
  created_at: string;
  institution: number;
}
