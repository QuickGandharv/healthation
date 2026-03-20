"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Bell,
  Calendar,
  LayoutDashboard,
  LogOut,
  Settings,
  User as UserIcon,
  Loader2,
  Clock,
  Star,
  FileText,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import useMediaQuery from "@/hooks/use-media-query";
import icon from "@/public/assets/icon/logo-light.png";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

import type { User, NavItem } from "@/types/header";
import { useNotifications } from "@/queries/doctor/useNotifications";
import {
  getSingleNotification,
} from "@/api/doctor/notifications";
import { NotificationItem } from "@/types/doctor/notification";
import { useUnreadCount } from "@/queries/doctor/useUnreadCount";

interface HeaderProps {
  user?: User;
  onLogout?: () => void;
  onNotificationClick?: (notification: any) => void;
}

export default function Header({ onLogout, onNotificationClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const queryClient = useQueryClient();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [readingId, setReadingId] = useState<string | null>(null);

  const { data, isLoading } = useNotifications();

  const notifications = data?.data ?? [];

  // only show 5 in header dropdown
  const topFiveNotifications = useMemo(() => {
    return notifications.slice(0, 5);
  }, [notifications]);

  const { data: unreadCount = 0, isLoading: unreadLoading } = useUnreadCount();

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/doctor/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "My Schedules",
      href: "/doctor/schedules",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "Appointments",
      href: "/doctor/appointments",
      icon: <UserIcon className="h-4 w-4" />,
    },
    {
      title: "Notifications",
      href: "/doctor/notifications",
      icon: <Bell className="h-4 w-4" />,
      badge: unreadCount,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    onError: (error) => {
      console.error("Failed to read notification:", error);
    },
  });

  const markAllReadMutation = useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      console.error("Failed to mark all as read:", error);
    },
  });

  if (!mounted) return null;

  const name = user ? `${user.first_name} ${user.last_name}` : "User";

  const getUserInitials = () => {
    if (!user) return "U";

    const first = user.first_name?.[0] || "";
    const last = user.last_name?.[0] || "";

    return (first + last).toUpperCase() || "U";
  };

  const formatNotificationTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getNotificationTypeColor = (group: NotificationItem["group"]) => {
    switch (group) {
      case "appointment":
        return "text-blue-500";
      case "availability":
        return "text-green-500";
      case "review":
        return "text-yellow-500";
      case "document":
        return "text-rose-500";
      default:
        return "text-gray-500";
    }
  };

  const getNotificationTypeIcon = (group: NotificationItem["group"]) => {
    switch (group) {
      case "appointment":
        return <Calendar className="h-4 w-4" />;
      case "availability":
        return <Clock className="h-4 w-4" />;
      case "review":
        return <Star className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const handleNotificationClick = (notificationId: string) => {
    // Optional external callback from route layouts.
    onNotificationClick?.(notificationId);
    readNotificationMutation.mutate(notificationId);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm",
        isScrolled
          ? "bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b"
          : "bg-background"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image src={icon} alt="Logo" width={180} height={32} />
          </Link>
        </div>

        {isDesktop && (
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {item.icon}
                <span>{item.title}</span>
                {item.badge ? (
                  <Badge
                    variant={pathname === item.href ? "secondary" : "default"}
                    className="ml-auto flex h-5 w-5 items-center justify-center rounded-full p-0"
                  >
                    {item.badge}
                  </Badge>
                ) : null}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>

                {/* {notifications.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto text-xs"
                    onClick={() => markAllReadMutation.mutate()}
                    disabled={markAllReadMutation.isPending}
                  >
                    {markAllReadMutation.isPending ? "Loading..." : "Mark all as read"}
                  </Button>
                )} */}
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <ScrollArea className="h-75">
                {isLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : topFiveNotifications.length > 0 ? (
                  topFiveNotifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={cn(
                        "flex cursor-pointer flex-col items-start gap-2 p-3",
                        !notification.is_read && "bg-accent/50"
                      )}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="flex w-full items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={getNotificationTypeColor(notification.group)}>
                            {getNotificationTypeIcon(notification.group)}
                          </span>
                          <span className="text-sm font-medium">{notification.title}</span>
                        </div>

                        <span className="text-xs whitespace-nowrap text-muted-foreground">
                          {formatNotificationTime(notification.created_at)}
                        </span>
                      </div>

                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {notification.desc}
                      </p>

                      <div className="flex w-full items-center justify-between">
                        <Badge
                          variant="outline"
                          className={cn("mt-1 text-xs", getNotificationTypeColor(notification.group))}
                        >
                          {notification.group}
                        </Badge>

                        {readingId === notification.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : notification.is_read && (
                          <Badge variant="secondary" className="text-[10px]">
                            Read
                          </Badge>
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No notifications
                  </div>
                )}
              </ScrollArea>

              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/doctor/notifications" className="w-full justify-center">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user?.avatar}
                    alt={`${user?.first_name} ${user?.last_name}`}
                  />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm leading-none font-medium">{name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || "Not signed in"}
                  </p>
                  {user?.role && (
                    <Badge variant="outline" className="mt-1 w-fit capitalize">
                      {user.role}
                    </Badge>
                  )}
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/doctor/profile" className="cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/doctor/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {!isDesktop && (
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-75 sm:w-100">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                      <span className="text-lg font-bold text-primary-foreground">HP</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">HealthCare Pro</h2>
                      <p className="text-xs text-muted-foreground">Telehealth Platform</p>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <Separator className="my-4" />

                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                      {item.badge ? <Badge className="ml-auto">{item.badge}</Badge> : null}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}