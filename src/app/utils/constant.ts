import { Dispatch, SetStateAction } from "react";

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success: boolean;
  token?: string;
  status?: number;
  total?: number;
  type?: string;
}

export type SetStateAnyOrNull = Dispatch<SetStateAction<any | null>>;

export type SetStateNullable<T> = Dispatch<SetStateAction<T | null>>;
