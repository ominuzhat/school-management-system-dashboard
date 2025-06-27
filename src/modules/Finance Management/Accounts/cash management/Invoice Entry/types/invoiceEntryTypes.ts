export  interface ICreateInvoiceEntry {
    vendor_id:string;
    amount: number;
    date: string;
    description: string;
    uploaded_files: File | null;
}

export interface IGetInvoiceEntry {
    id: number;
    vendor_id:string;
    amount: number;
    date: string;
    description: string;
    uploaded_files: File | null;
}