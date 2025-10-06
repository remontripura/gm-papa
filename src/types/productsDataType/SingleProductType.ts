export interface IItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface IGameData {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  tags: string;
  keywords: string;
  input_name: string;
  input_others: string;
  total_input: number;
  image: string;
  cover_image: string;
  created_at: string | null;
  updated_at: string | null;
  support_country: string | null;
  delivery_system: string | null;
  seo_title: null | string;
  seo_description: null | string;
  seo_keywords: null | string;
  items: IItem[];
}

export interface IGameRes {
  status: boolean;
  data: IGameData;
}
