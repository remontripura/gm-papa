export interface IOrderResponse {
  status: boolean;
  paymentUrl: string;
  message: string;
  order: Order;
}

interface Product {
  id: number;
  name: string;
  image: string;
}

export interface Order {
  message?: string;
  status?: boolean;
  id: number;
  product_id: number;
  quantity: number;
  total: number;
  items: string;
  customer_data: string;
  others_data: string;
  payment_method: string;
  transaction_id: string;
  payment_number: string;
  user_id: number | null;
  name: string;
  phone: string;
  email: string;
  created_at: string;
  updated_at: string;
  product: Product;
}
