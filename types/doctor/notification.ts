// export type NotificationGroup =
//   | "appointment"
//   | "availability"
//   | "review"
//   | "document"
//   | string;

// export interface NotificationItem {
//   id: string;
//   title: string;
//   desc: string;
//   is_read: boolean;
//   created_at: string;
//   group: NotificationGroup;
// }

// export interface NotificationsResponse {
//   data: NotificationItem[];
//   links: {
//     first: string | null;
//     last: string | null;
//     prev: string | null;
//     next: string | null;
//   };
//   meta: {
//     path: string;
//     per_page: number;
//     next_cursor: string | null;
//     prev_cursor: string | null;
//     current_user_id: string;
//     total_unread: number;
//   };
// }

export type NotificationGroup =
  | "appointment"
  | "availability"
  | "review"
  | "document"
  | string;

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  is_read: boolean;
  created_at: string;
  group: NotificationGroup;
}

export interface NotificationsResponse {
  data: NotificationItem[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    path: string;
    per_page: number;
    next_cursor: string | null;
    prev_cursor: string | null;
    current_user_id: string;
    total_unread: number;
  };
}