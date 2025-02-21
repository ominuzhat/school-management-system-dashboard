export type NoticeBoardTargetAudience =
  | "Students"
  | "Teachers"
  | "Parents"
  | "All";

export type NoticeBoardCategory =
  | "General"
  | "Academic"
  | "Sports"
  | "Events"
  | "Examinations"
  | "Other";

export interface ICreateNotice {
  title: string;
  description: string;
  category: NoticeBoardCategory;
  target_audience: NoticeBoardTargetAudience;
  is_published: boolean;
  publish_date: string;
  expiry_date: string;
}

export interface IGetNotice {
  id: number;
  title: string;
  description: string;
  category: NoticeBoardCategory;
  target_audience: NoticeBoardTargetAudience;
  is_published: boolean;
  publish_date: string;
  expiry_date: string;
  created_at: string;
  updated_at: string;
}
