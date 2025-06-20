export  interface ICreateInvoiceEntry {
    vendor:string;
    amount: number;
    date: string;
    description: string;
    file: File | null;
}

export interface IGetInvoiceEntry {
    id: number;
    vendor:string;
    amount: number;
    date: string;
    description: string;
    file: File | null;
}