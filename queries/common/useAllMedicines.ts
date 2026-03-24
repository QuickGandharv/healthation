import { useQuery } from "@tanstack/react-query";
import { getMedicines } from "@/api/common/getMedicine";

interface UseMedicinesParams {
  page?: number;
  per_page?: number;
}

export const useMedicines = ({
  page = 1,
  per_page = 5,
}: UseMedicinesParams = {}) => {
  return useQuery({
    queryKey: ["medicines", page, per_page],
    queryFn: () => getMedicines({ page, per_page }),
    placeholderData: (previousData) => previousData,
  });
};