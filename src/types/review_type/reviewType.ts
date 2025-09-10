export interface ReviewResponse {
  status: boolean;
  reviews: Reviews;
}

export interface Reviews {
  current_page: number;
  data: Review[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface Review {
  id: number;
  user_id: number;
  image: string;
  product_id: number;
  review: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface addReview {
  success: boolean;
  message: string;
}
