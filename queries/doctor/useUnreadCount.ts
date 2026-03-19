import { useQuery } from "@tanstack/react-query";
import { getUnreadCount } from "@/api/doctor/notifications";

export const useUnreadCount = () => {
  return useQuery<number>({
    queryKey: ["unread-count"],
    queryFn: getUnreadCount,
    refetchInterval: 30000,
  });
};