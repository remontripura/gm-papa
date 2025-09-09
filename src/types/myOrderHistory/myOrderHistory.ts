export interface Order {
    id: number;
    user_id: number;
    product_id: number;
    items: string;
    name: string;
    phone: string;
    email: string;
    quantity: number;
    total: number;
    discount: number;
    customer_data: string;
    others_data: string;
    payment_method: string;
    number: string;
    transaction_id: string;
    status: string;
    created_at: string;
    updated_at: string;
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
  }
  