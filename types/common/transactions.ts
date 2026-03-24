export interface TransactionItem {
  id: string;
  patient_name: string;
  doctor_name: string;
  amount: string;
  currency: string;
  status: string;
  status_label: string;
  transaction_id: string | null;
  order_id: string;
  date: string;
  payment_type: string;
  payment_method: string;
  upi_id?: string | null;
  bank_name?: string | null;
}

export interface GetMyTransactionsResponse {
  success: boolean;
  message: string;
  path: string;
  timestamp: string;
  data: TransactionItem[];
}