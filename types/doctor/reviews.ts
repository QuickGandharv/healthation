export interface MyReviewItem {
  id: string;
  patient_name: string;
  patient_image: string | null;
  patient_age: string | null;
  patient_location: string | null;
  title: string;
  content: string;
  rating: number;
  total_reviews: number;
  doctor_name: string;
  doctor_avatar: string | null;
  doctor_experience: string | null;
  doctor_departments: string | null;
  rating_stars: string;
  created_at: string;
}

export interface ReviewsPagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface GetMyReviewsResponse {
  success: boolean;
  message: string;
  pagination: ReviewsPagination;
  path: string;
  timestamp: string;
  data: MyReviewItem[];
}