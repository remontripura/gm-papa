export interface PaymentMethod {
  id: number;
  icon: string;
  method: string;
}

export interface Item {
  id: number;
  name: string;
  price: number;
  description: string | null;
  status: number;
  denom: string;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  input_name: string;
  input_others: string | null;
  is_auto: number;
}

export interface Order {
  id: number;
  user_id: number;
  product_id: number;
  item_id: number;
  name: string;
  phone: string | null;
  email: string;
  quantity: number;
  total: number;
  customer_data: string;
  others_data: string | null;
  status: string;
  order_note: string | null;
  payment_method: PaymentMethod;
  transaction_id: string;
  number: string;
  uid: string;
  created_at: string;
  updated_at: string;
  product: Product | null;
  item: Item | null;
}

export interface OrderListResponse {
  status: boolean;
  message: string;
  data: Order[];
  total: number;
  current: number;
  lastpage: number;
  first: number;
  from: number;
  perPage: number;
}
