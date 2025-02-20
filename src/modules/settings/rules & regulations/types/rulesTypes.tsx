import {
  NoticeBoardCategory,
  NoticeBoardTargetAudience,
} from "../../notice/types/noticeTypes";

export interface ICreateRules {
  title: string;
  description: string;
  category: NoticeBoardCategory;
  target_audience: NoticeBoardTargetAudience;
  is_active: boolean;
}

export interface IGetRules {
  id: number;
  title: string;
  description: string;
  category: NoticeBoardCategory;
  target_audience: NoticeBoardTargetAudience;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
