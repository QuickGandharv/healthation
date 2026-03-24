"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Calendar,
  Clock,
  Users,
  Star,
  TrendingUp,
  Video,
  Phone,
  MessageSquare,
  Bell,
  CalendarClock,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import axios from "axios"
import EmptyState from "@/components/ui/empty-state"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

// Notification type based on API response
interface Notification {
  id: string;
  title: string;
  desc: string;
  is_read: boolean;
  created_at: string;
  group: string;
}

// API Response type
interface NotificationsResponse {
  data: Notification[];
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
  };
}

export default function Dashboard() {
  const router = useRouter()
  const { user, loading, token } = useAuth()
  console.log(token);

  const [dashboardData, setDashboardData] = useState<any>(null)
  const [apiLoading, setApiLoading] = useState(false)
  const [apiError, setApiError] = useState("")

  // Notification states
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [notificationsLoading, setNotificationsLoading] = useState(false)
  const [notificationsError, setNotificationsError] = useState("")
  const [unreadCount, setUnreadCount] = useState(0)

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboard = async () => {
      if (loading) return
      if (!token) {
        setApiError("Token not found")
        return
      }

      try {
        setApiLoading(true)
        setApiError("")

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/doctor/home`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        )

        // console.log("Dashboard API response:", response.data)
        setDashboardData(response.data.data)
      } catch (error: any) {
        console.error("Dashboard API error:", error)
        setApiError(error?.response?.data?.message || "Something went wrong")
      } finally {
        setApiLoading(false)
      }
    }

    fetchDashboard()
  }, [token, loading])

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) return

      try {
        setNotificationsLoading(true)
        setNotificationsError("")

        const response = await axios.get<NotificationsResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/notifications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        )

        console.log("Notifications API response:", response.data)
        const notificationsData = response.data.data
        // console.log("Notifications data:", notificationsData)

        setNotifications(notificationsData)

        // Calculate unread count
        const unread = notificationsData.filter(n => !n.is_read).length
        setUnreadCount(unread)
      } catch (error: any) {
        console.error("Notifications API error:", error)
        setNotificationsError(error?.response?.data?.message || "Failed to load notifications")
      } finally {
        setNotificationsLoading(false)
      }
    }

    fetchNotifications()
  }, [token])

  // Get icon based on notification group
  const getNotificationIcon = (group: string) => {
    switch (group.toLowerCase()) {
      case 'appointment':
        return <CalendarClock className="h-4 w-4 text-blue-500" />
      case 'reminder':
        return <Bell className="h-4 w-4 text-amber-500" />
      case 'alert':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <MessageSquare className="h-4 w-4 text-primary" />
    }
  }

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications/${notificationId}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      // Update local state
      setNotifications(prev =>
        prev.map(n =>
          n.id === notificationId ? { ...n, is_read: true } : n
        )
      )
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const summary = dashboardData?.summary

  const stats = [
    {
      label: "Today's Appointments",
      value: summary?.todays_appointments ?? 0,
      icon: Calendar,
      change: "+0",
      color: "text-blue-600",
    },
    {
      label: "Upcoming Appointments",
      value: summary?.upcoming_appointments ?? 0,
      icon: Clock,
      change: "+0",
      color: "text-emerald-600",
    },
    {
      label: "Cancelled Appointments",
      value: summary?.cancelled_appointments ?? 0,
      icon: Users,
      change: "+0",
      color: "text-purple-600",
    },
    {
      label: "Average Rating",
      value: dashboardData?.doctor_reviews?.length ?? 0,
      icon: Star,
      change: "+0",
      color: "text-amber-500",
    },
  ]

  const upcomingAppointments = dashboardData?.upcoming_appointments || []
  const todaysAppointments = dashboardData?.todays_appointments || []

  if (loading || apiLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">
            Loading your dashboard...
          </p>
        </div>
      </div>
    )
  }

  if (apiError) {
    return (
      <div className="p-6">
        <p className="font-medium text-red-500">Error: {apiError}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">
          Welcome back, Dr.{" "}
          {user &&
            `${user.first_name?.charAt(0).toUpperCase() + user.first_name?.slice(1).toLowerCase() || ""} ${user.last_name?.charAt(0).toUpperCase() +
            user.last_name?.slice(1).toLowerCase() || ""
            }`}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your practice today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  <span>Updated from API</span>
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
            <CardDescription>
              You have {todaysAppointments.length} appointments scheduled
            </CardDescription>
          </CardHeader>
          {todaysAppointments.length === 0 ? (
            <EmptyState
              title="No Appointments Yet"
              message="You don't have any appointments scheduled."
              icon={<Calendar size={40} className="text-gray-400" />}
              actionLabel="Book Appointment"
              onAction={() => console.log("clicked")}
            />
          ) : (
            <CardContent className="space-y-4">
              {todaysAppointments.map((appointment: any, index: number) => (
                <Link
                  key={appointment.id || index}  // ✅ Fixed: key moved to Link
                  href={`/doctor/appointments/${appointment.id}`}
                >
                  <div className="flex items-center justify-between rounded-lg border border-border bg-accent/30 p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={appointment.avatar || ""}
                          alt={appointment.patient_name || "Patient"}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {(appointment.patient_name || "P")
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {appointment.patient_name || "Unknown Patient"}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{appointment.time || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 capitalize">
                        {appointment.status || "pending"}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Notifications Card - Replacing Recent Activity */}
        <Card className="border-border flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                {unreadCount > 0
                  ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                  : 'No unread notifications'
                }
              </CardDescription>
            </div>
            {unreadCount > 0 && (
              <Badge variant="default" className="bg-primary">
                {unreadCount} new
              </Badge>
            )}
          </CardHeader>

          <CardContent className="flex flex-col flex-1 justify-between">
            {notificationsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
              </div>
            ) : notificationsError ? (
              <div className="py-8 text-center text-sm text-destructive">
                {notificationsError}
              </div>
            ) : notifications.length === 0 ? (
              <EmptyState
                title="No Notifications"
                message="You don't have any notifications at the moment."
                icon={<Bell size={40} className="text-gray-400" />}
                actionLabel=""
                onAction={() => { }}
              />
            ) : (
              <div className="space-y-4">
                {/* Show only first 3 notifications */}
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex gap-3 p-2 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors ${!notification.is_read ? 'bg-accent/30' : ''
                      }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                      {getNotificationIcon(notification.group)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium truncate">
                          {notification.title}
                        </p>
                        {!notification.is_read && (
                          <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0"></span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {notification.desc}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Show count of remaining notifications if more than 3 */}
                {notifications.length > 3 && (
                  <p className="text-xs text-muted-foreground text-center pt-2">
                    +{notifications.length - 3} more notifications
                  </p>
                )}
              </div>
            )}

            {/* Bottom clickable text */}
            <button
              className="mt-4 text-sm text-primary hover:underline text-center"
              onClick={() => router.push('/doctor/notifications')}
            >
              View All Notifications
            </button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-5">
            <Button
              variant="outline"
              className="h-auto flex-col gap-2 py-6"
              onClick={() => router.push("/doctor/dashboard/all-patients")}
            >
              <Calendar className="h-6 w-6 text-primary" />
              <span>All Patients</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto flex-col gap-2 py-6"
              onClick={() => router.push("/doctor/dashboard/reports")}
            >
              <Users className="h-6 w-6 text-primary" />
              <span>Patient Reports</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto flex-col gap-2 py-6"
              onClick={() => router.push("/doctor/dashboard/inventory")}
            >
              <MessageSquare className="h-6 w-6 text-primary" />
              <span>Medicine Inventory</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto flex-col gap-2 py-6"
              onClick={() => router.push("/doctor/dashboard/payments")}
            >
              <Star className="h-6 w-6 text-primary" />
              <span>Payment History</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto flex-col gap-2 py-6"
              onClick={() => router.push("/doctor/dashboard/reviews")}
            >
              <Star className="h-6 w-6 text-primary" />
              <span>All Reviews</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}