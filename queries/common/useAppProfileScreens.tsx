// // import { getAppProfileScreens } from "@/api/common/appProfileScreens";
// // import { useQuery } from "@tanstack/react-query";

// // export const useAppProfileScreens = (token?: string) => {
// //     return useQuery({
// //         queryKey: ["app-profile-screens", token],
// //         queryFn: () => getAppProfileScreens(token),
// //         staleTime: 1000 * 60 * 60, // 1 hour
// //         gcTime: 1000 * 60 * 60 * 24, // 24 hours
// //         enabled: !!token, // Only run query if token exists
// //     });
// // };

// import api from "@/lib/axios";

// export interface FaqItem {
//   title: string;
//   description: string;
//   icon: string | null;
// }

// export interface AppProfileScreensData {
//   faq: FaqItem[];
//   about_us: string;
//   term_and_conditions: string;
//   privacy_policy: string;
// }

// export interface AppProfileScreensApiResponse {
//   success: boolean;
//   message: string;
//   path: string;
//   timestamp: string;
//   data: AppProfileScreensData;
// }

// export const getAppProfileScreens = async (): Promise<AppProfileScreensData> => {
//   const response = await api.get<AppProfileScreensApiResponse>("/app-profile-screens");
//   return response.data.data;
// };

import { getAppProfileScreens } from "@/api/common/appProfileScreens";
import { useQuery } from "@tanstack/react-query";
import { AppProfileScreensResponse } from "@/api/common/appProfileScreens";

export const useAppProfileScreens = () => {
  return useQuery<AppProfileScreensResponse>({
    queryKey: ["app-profile-screens"],
    queryFn: () => getAppProfileScreens(),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};