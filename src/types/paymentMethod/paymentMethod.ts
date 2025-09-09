export interface PaymentMethod {
  id: number;
  icon: string;
  method: string;
  description: string;
  number: string;
  status: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface paymentMethodResponse {
  status: boolean;
  data: PaymentMethod[];
}