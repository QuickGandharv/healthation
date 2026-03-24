import { useQuery } from "@tanstack/react-query";
import { getMyTransactions } from "@/api/common/transactions";

export const useMyTransactions = () => {
  return useQuery({
    queryKey: ["my-transactions"],
    queryFn: getMyTransactions,
  });
};