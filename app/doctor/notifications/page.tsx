// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { 
//   Calendar, 
//   MessageSquare, 
//   Star, 
//   UserPlus, 
//   FileText,
//   Clock,
//   CheckCheck,
//   BellOff
// } from "lucide-react";

// export default function Notifications() {
//   const notifications = [
//     {
//       id: 1,
//       type: "appointment",
//       title: "New appointment request",
//       message: "Michael Chen has requested a video consultation for March 12 at 2:00 PM",
//       time: "5 min ago",
//       unread: true,
//       icon: Calendar
//     },
//     {
//       id: 2,
//       type: "message",
//       title: "New message from patient",
//       message: "Emma Wilson: Thank you for the consultation. I have a follow-up question about...",
//       time: "15 min ago",
//       unread: true,
//       icon: MessageSquare
//     },
//     {
//       id: 3,
//       type: "review",
//       title: "New patient review",
//       message: "Sarah Miller left a 5-star review: 'Excellent doctor, very professional and caring'",
//       time: "1 hour ago",
//       unread: true,
//       icon: Star
//     },
//     {
//       id: 4,
//       type: "patient",
//       title: "New patient registration",
//       message: "James Rodriguez has registered and selected you as their primary care physician",
//       time: "2 hours ago",
//       unread: false,
//       icon: UserPlus
//     },
//     {
//       id: 5,
//       type: "document",
//       title: "Lab results uploaded",
//       message: "Lab results for patient Alice Johnson are now available for review",
//       time: "3 hours ago",
//       unread: false,
//       icon: FileText
//     },
//     {
//       id: 6,
//       type: "appointment",
//       title: "Appointment reminder",
//       message: "Upcoming appointment with Sophia Lee in 30 minutes",
//       time: "4 hours ago",
//       unread: false,
//       icon: Clock
//     },
//     {
//       id: 7,
//       type: "appointment",
//       title: "Appointment completed",
//       message: "Video consultation with David Park has been completed",
//       time: "5 hours ago",
//       unread: false,
//       icon: CheckCheck
//     },
//   ];

//   const getIconColor = (type: string) => {
//     switch(type) {
//       case "appointment": return "text-blue-600";
//       case "message": return "text-emerald-600";
//       case "review": return "text-amber-500";
//       case "patient": return "text-purple-600";
//       case "document": return "text-rose-600";
//       default: return "text-primary";
//     }
//   };

//   const unreadCount = notifications.filter(n => n.unread).length;
//   const todayNotifications = notifications.slice(0, 5);
//   const earlierNotifications = notifications.slice(5);

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="mb-2">Notifications</h1>
//           <p className="text-muted-foreground">
//             You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline">
//             <CheckCheck className="mr-2 h-4 w-4" />
//             Mark all as read
//           </Button>
//           <Button variant="outline">
//             <BellOff className="mr-2 h-4 w-4" />
//             Clear all
//           </Button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <Tabs defaultValue="all" className="w-full">
//         <TabsList>
//           <TabsTrigger value="all">
//             All
//             {unreadCount > 0 && (
//               <Badge className="ml-2 bg-primary text-primary-foreground" variant="secondary">
//                 {unreadCount}
//               </Badge>
//             )}
//           </TabsTrigger>
//           <TabsTrigger value="unread">Unread</TabsTrigger>
//           <TabsTrigger value="appointments">Appointments</TabsTrigger>
//           <TabsTrigger value="messages">Messages</TabsTrigger>
//         </TabsList>

//         <TabsContent value="all" className="space-y-4 mt-6">
//           {/* Today */}
//           <div className="space-y-3">
//             <h3 className="text-sm font-medium text-muted-foreground">Today</h3>
//             {todayNotifications.map((notification) => {
//               const Icon = notification.icon;
//               return (
//                 <Card 
//                   key={notification.id}
//                   className={`border-border transition-colors hover:bg-accent/30 cursor-pointer ${
//                     notification.unread ? 'bg-primary/5 border-l-4 border-l-primary' : ''
//                   }`}
//                 >
//                   <CardContent className="flex items-start gap-4 p-4">
//                     <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-accent ${getIconColor(notification.type)}`}>
//                       <Icon className="h-5 w-5" />
//                     </div>
//                     <div className="flex-1 space-y-1">
//                       <div className="flex items-start justify-between gap-2">
//                         <p className="font-medium">{notification.title}</p>
//                         {notification.unread && (
//                           <div className="h-2 w-2 rounded-full bg-primary" />
//                         )}
//                       </div>
//                       <p className="text-sm text-muted-foreground">{notification.message}</p>
//                       <p className="text-xs text-muted-foreground flex items-center gap-1">
//                         <Clock className="h-3 w-3" />
//                         {notification.time}
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>

//           {/* Earlier */}
//           {earlierNotifications.length > 0 && (
//             <div className="space-y-3">
//               <h3 className="text-sm font-medium text-muted-foreground">Earlier</h3>
//               {earlierNotifications.map((notification) => {
//                 const Icon = notification.icon;
//                 return (
//                   <Card 
//                     key={notification.id}
//                     className="border-border transition-colors hover:bg-accent/30 cursor-pointer"
//                   >
//                     <CardContent className="flex items-start gap-4 p-4">
//                       <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-accent ${getIconColor(notification.type)}`}>
//                         <Icon className="h-5 w-5" />
//                       </div>
//                       <div className="flex-1 space-y-1">
//                         <p className="font-medium">{notification.title}</p>
//                         <p className="text-sm text-muted-foreground">{notification.message}</p>
//                         <p className="text-xs text-muted-foreground flex items-center gap-1">
//                           <Clock className="h-3 w-3" />
//                           {notification.time}
//                         </p>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//             </div>
//           )}
//         </TabsContent>

//         <TabsContent value="unread" className="space-y-3 mt-6">
//           {notifications.filter(n => n.unread).length === 0 ? (
//             <Card className="border-border">
//               <CardContent className="flex flex-col items-center justify-center py-12 text-center">
//                 <CheckCheck className="h-12 w-12 text-muted-foreground/40 mb-3" />
//                 <p className="font-medium mb-1">All caught up!</p>
//                 <p className="text-sm text-muted-foreground">You have no unread notifications</p>
//               </CardContent>
//             </Card>
//           ) : (
//             notifications.filter(n => n.unread).map((notification) => {
//               const Icon = notification.icon;
//               return (
//                 <Card 
//                   key={notification.id}
//                   className="border-border bg-primary/5 border-l-4 border-l-primary transition-colors hover:bg-accent/30 cursor-pointer"
//                 >
//                   <CardContent className="flex items-start gap-4 p-4">
//                     <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-accent ${getIconColor(notification.type)}`}>
//                       <Icon className="h-5 w-5" />
//                     </div>
//                     <div className="flex-1 space-y-1">
//                       <div className="flex items-start justify-between gap-2">
//                         <p className="font-medium">{notification.title}</p>
//                         <div className="h-2 w-2 rounded-full bg-primary" />
//                       </div>
//                       <p className="text-sm text-muted-foreground">{notification.message}</p>
//                       <p className="text-xs text-muted-foreground flex items-center gap-1">
//                         <Clock className="h-3 w-3" />
//                         {notification.time}
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               );
//             })
//           )}
//         </TabsContent>

//         <TabsContent value="appointments" className="space-y-3 mt-6">
//           {notifications.filter(n => n.type === "appointment").map((notification) => {
//             const Icon = notification.icon;
//             return (
//               <Card 
//                 key={notification.id}
//                 className={`border-border transition-colors hover:bg-accent/30 cursor-pointer ${
//                   notification.unread ? 'bg-primary/5 border-l-4 border-l-primary' : ''
//                 }`}
//               >
//                 <CardContent className="flex items-start gap-4 p-4">
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-accent ${getIconColor(notification.type)}`}>
//                     <Icon className="h-5 w-5" />
//                   </div>
//                   <div className="flex-1 space-y-1">
//                     <div className="flex items-start justify-between gap-2">
//                       <p className="font-medium">{notification.title}</p>
//                       {notification.unread && (
//                         <div className="h-2 w-2 rounded-full bg-primary" />
//                       )}
//                     </div>
//                     <p className="text-sm text-muted-foreground">{notification.message}</p>
//                     <p className="text-xs text-muted-foreground flex items-center gap-1">
//                       <Clock className="h-3 w-3" />
//                       {notification.time}
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </TabsContent>

//         <TabsContent value="messages" className="space-y-3 mt-6">
//           {notifications.filter(n => n.type === "message").map((notification) => {
//             const Icon = notification.icon;
//             return (
//               <Card 
//                 key={notification.id}
//                 className={`border-border transition-colors hover:bg-accent/30 cursor-pointer ${
//                   notification.unread ? 'bg-primary/5 border-l-4 border-l-primary' : ''
//                 }`}
//               >
//                 <CardContent className="flex items-start gap-4 p-4">
//                   <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-accent ${getIconColor(notification.type)}`}>
//                     <Icon className="h-5 w-5" />
//                   </div>
//                   <div className="flex-1 space-y-1">
//                     <div className="flex items-start justify-between gap-2">
//                       <p className="font-medium">{notification.title}</p>
//                       {notification.unread && (
//                         <div className="h-2 w-2 rounded-full bg-primary" />
//                       )}
//                     </div>
//                     <p className="text-sm text-muted-foreground">{notification.message}</p>
//                     <p className="text-xs text-muted-foreground flex items-center gap-1">
//                       <Clock className="h-3 w-3" />
//                       {notification.time}
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }


"use client";

import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Star,
  FileText,
  Clock,
  CheckCheck,
  BellOff,
  Loader2,
  Bell,
  Eye,
} from "lucide-react";

import { useNotifications } from "@/queries/doctor/useNotifications";
import {
  getSingleNotification,
} from "@/api/doctor/notifications";
import { NotificationItem } from "@/types/doctor/notification";

const getNotificationIcon = (group: string) => {
  switch (group) {
    case "appointment":
      return Calendar;
    case "review":
      return Star;
    case "availability":
      return Clock;
    case "document":
      return FileText;
    default:
      return Bell;
  }
};

const getIconColor = (group: string) => {
  switch (group) {
    case "appointment":
      return "text-blue-600";
    case "review":
      return "text-amber-500";
    case "availability":
      return "text-emerald-600";
    case "document":
      return "text-rose-600";
    default:
      return "text-primary";
  }
};

const formatRelativeTime = (dateString: string) => {
  const now = new Date();
  const createdAt = new Date(dateString);

  const diffMs = now.getTime() - createdAt.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
};

const isToday = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

interface NotificationCardProps {
  notification: NotificationItem;
  onRead: (id: string) => void;
  isReading: boolean;
}

function NotificationCard({
  notification,
  onRead,
  isReading,
}: NotificationCardProps) {
  const Icon = getNotificationIcon(notification.group);

  return (
    <Card
      className={`border-border transition-colors hover:bg-accent/30 ${!notification.is_read ? "bg-primary/5 border-l-4 border-l-primary" : ""
        }`}
    >
      <CardContent className="flex items-start justify-between gap-4 p-4">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent ${getIconColor(
              notification.group
            )}`}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium">{notification.title}</p>

              {notification.is_read && (
                <Badge variant="secondary">Read</Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground">{notification.desc}</p>

            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {formatRelativeTime(notification.created_at)}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          {!notification.is_read && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onRead(notification.id)}
              disabled={isReading}
            >
              {isReading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Eye className="mr-2 h-4 w-4" />
              )}
              {isReading ? "Reading..." : "Mark as read"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function NotificationsPage() {
  const { data, isLoading, isError, error, refetch } = useNotifications();
  const queryClient = useQueryClient();

  const [readingId, setReadingId] = useState<string | null>(null);

  const notifications = data?.data ?? [];
  const unreadCount = data?.meta?.total_unread ?? 0;

  const readNotificationMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      setReadingId(notificationId);
      return await getSingleNotification(notificationId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onSettled: () => {
      setReadingId(null);
    },
    onError: (err) => {
      console.error("Read notification failed:", err);
    },
  });

  const unreadNotifications = useMemo(() => {
    return notifications.filter((item) => !item.is_read);
  }, [notifications]);

  const appointmentNotifications = useMemo(() => {
    return notifications.filter((item) => item.group === "appointment");
  }, [notifications]);

  const reviewNotifications = useMemo(() => {
    return notifications.filter((item) => item.group === "review");
  }, [notifications]);

  const todayNotifications = useMemo(() => {
    return notifications.filter((item) => isToday(item.created_at));
  }, [notifications]);

  const earlierNotifications = useMemo(() => {
    return notifications.filter((item) => !isToday(item.created_at));
  }, [notifications]);

  const handleReadNotification = (notificationId: string) => {
    readNotificationMutation.mutate(notificationId);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="border-border">
        <CardContent className="flex flex-col items-center justify-center space-y-3 py-12 text-center">
          <BellOff className="h-12 w-12 text-muted-foreground/40" />
          <p className="font-medium">Failed to load notifications</p>
          <p className="text-sm text-muted-foreground">
            {error?.message || "Something went wrong"}
          </p>
          <Button onClick={() => refetch()} variant="outline">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex h-auto flex-wrap">
          <TabsTrigger value="all">
            All
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2 bg-primary text-primary-foreground">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>

          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-4">
          {notifications.length === 0 ? (
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <BellOff className="mb-3 h-12 w-12 text-muted-foreground/40" />
                <p className="mb-1 font-medium">No notifications found</p>
                <p className="text-sm text-muted-foreground">
                  You do not have any notifications yet
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {todayNotifications.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">Today</h3>
                  {todayNotifications.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onRead={handleReadNotification}
                      isReading={readingId === notification.id}
                    />
                  ))}
                </div>
              )}

              {earlierNotifications.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">Earlier</h3>
                  {earlierNotifications.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onRead={handleReadNotification}
                      isReading={readingId === notification.id}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="unread" className="mt-6 space-y-3">
          {unreadNotifications.length === 0 ? (
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCheck className="mb-3 h-12 w-12 text-muted-foreground/40" />
                <p className="mb-1 font-medium">All caught up!</p>
                <p className="text-sm text-muted-foreground">
                  You have no unread notifications
                </p>
              </CardContent>
            </Card>
          ) : (
            unreadNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onRead={handleReadNotification}
                isReading={readingId === notification.id}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="appointments" className="mt-6 space-y-3">
          {appointmentNotifications.length === 0 ? (
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="mb-3 h-12 w-12 text-muted-foreground/40" />
                <p className="mb-1 font-medium">No appointment notifications</p>
                <p className="text-sm text-muted-foreground">
                  Appointment-related notifications will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            appointmentNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onRead={handleReadNotification}
                isReading={readingId === notification.id}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="reviews" className="mt-6 space-y-3">
          {reviewNotifications.length === 0 ? (
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Star className="mb-3 h-12 w-12 text-muted-foreground/40" />
                <p className="mb-1 font-medium">No review notifications</p>
                <p className="text-sm text-muted-foreground">
                  Review-related notifications will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            reviewNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onRead={handleReadNotification}
                isReading={readingId === notification.id}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}