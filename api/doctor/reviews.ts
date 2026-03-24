import axiosInstance from "@/lib/axios";
import type { GetMyReviewsResponse } from "@/types/doctor/reviews";

interface GetMyReviewsParams {
  page?: number;
  per_page?: number;
}

export const getMyReviews = async ({
  page = 1,
  per_page = 15,
}: GetMyReviewsParams = {}): Promise<GetMyReviewsResponse> => {
  const response = await axiosInstance.get<GetMyReviewsResponse>(
    "/reviews/my",
    {
      params: {
        page,
        per_page,
      },
    }
  );

  return response.data;
};