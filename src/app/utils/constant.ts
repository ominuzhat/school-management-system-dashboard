import { Dispatch, SetStateAction } from "react";

export interface ApiResponse<T> {
  admission: any;
  id: boolean;
  data?: T | PaginatedResponse<T>; 
  message?: string;
  success: boolean;
  token?: string;
  status?: number;
  total?: number;
  type?: string;
}

export interface PaginatedResponse<T> {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results: T[];
}
export type SetStateAnyOrNull = Dispatch<SetStateAction<any | null>>;
export type SetStateNullable<T> = Dispatch<SetStateAction<T | null>>;
