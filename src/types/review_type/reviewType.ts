export interface ReviewResponse {
  status: boolean;
  reviews: Reviews;
  total_reviews: number;
  average_rating: number;
  rating_breakdown: RatingBreakdown;
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
  product_id: number;
  review: string;
  rating: number;
  created_at: string;
  updated_at: string;
  user: ReviewUser;
}

export interface ReviewUser {
  image: string;
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  email_verified_at: string | null;
  wallet: number;
  created_at: string;
  updated_at: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface RatingBreakdown {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface addReview {
  success: boolean;
  message: string;
}

export interface addReview {
  success: boolean;
  message: string;
}
