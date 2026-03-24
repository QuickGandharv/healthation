import axiosInstance from "@/lib/axios";
import type { GetMyTransactionsResponse } from "@/types/common/transactions";

export const getMyTransactions = async (): Promise<GetMyTransactionsResponse> => {
  const response = await axiosInstance.get<GetMyTransactionsResponse>(
    "/patient/my-transactions"
  );

  return response.data;
};