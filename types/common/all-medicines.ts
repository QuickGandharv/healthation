export interface PaginationMeta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface MedicineItem {
  id: string;
  name: string;
  type: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface GetMedicinesResponse {
  success: boolean;
  message: string;
  pagination: PaginationMeta;
  path: string;
  timestamp: string;
  data: MedicineItem[];
}