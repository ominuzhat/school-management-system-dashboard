export interface ICreateTicket {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  ticket_type: "technical" | "billing" | "general" | string; // extend as needed
  comment: ITicketComment;
}

export interface ITicketComment {
  content: string;
  attachments: string[]; // assuming attachments are URLs or file names. Update type if needed
}
