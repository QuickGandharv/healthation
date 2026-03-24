import { useQuery } from "@tanstack/react-query";
import { getMyReviews } from "@/api/doctor/reviews";

interface UseMyReviewsParams {
  page?: number;
  per_page?: number;
}

export const useMyReviews = ({
  page = 1,
  per_page = 15,
}: UseMyReviewsParams = {}) => {
  return useQuery({
    queryKey: ["my-reviews", page, per_page],
    queryFn: () => getMyReviews({ page, per_page }),
  });
};