export  interface ICreateVendorEntry {
    vendor:string;
    amount: number;
    date: string;
    description: string;
    file: File | null;
}

export interface IGetVendorEntry {
    id: number;
    vendor:string;
    amount: number;
    date: string;
    description: string;
    file: File | null;
}