export interface Notice {
  id: number;
  notice: string;
  status: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface NoticeResponse {
  status: boolean;
  data: Notice[];
}
