// import { useQuery } from "@tanstack/react-query";
// import { getNotifications } from "@/api/doctor/notifications";
// import { NotificationsResponse } from "@/types/doctor/notification";

// export const useNotifications = () => {
//   return useQuery<NotificationsResponse, Error>({
//     queryKey: ["notifications"],
//     queryFn: getNotifications,
//     retry: false,
//   });
// };

import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/api/doctor/notifications";
import { NotificationsResponse } from "@/types/doctor/notification";

export const useNotifications = () => {
  return useQuery<NotificationsResponse, Error>({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    retry: false,
  });
};