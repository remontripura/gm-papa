export interface ITransactionHistoryRes {
  status: boolean;
  history: ITransactionHistory[];
}

export interface ITransactionHistory {
  id: number;
  user_id: number;
  amount: number;
  type: "debit" | "credit"; 
  description: string;
  status: number; 
  created_at: string;
  updated_at: string; 
}
