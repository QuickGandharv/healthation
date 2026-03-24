import axiosInstance from "@/lib/axios";
import type { GetMedicinesResponse } from "@/types/common/all-medicines";

interface GetMedicinesParams {
  page?: number;
  per_page?: number;
}

export const getMedicines = async ({
  page = 1,
  per_page = 5,
}: GetMedicinesParams = {}): Promise<GetMedicinesResponse> => {
  const response = await axiosInstance.get<GetMedicinesResponse>("/medicines", {
    params: {
      page,
      per_page,
    },
  });

  return response.data;
};