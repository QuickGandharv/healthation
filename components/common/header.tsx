"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  X,
  Bell,
  Calendar,
  LayoutDashboard,
  LogOut,
  Settings,
  User as UserIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import useMediaQuery from "@/hooks/use-media-query"
import icon from "@/public/assets/icon/logo-light.png"

import type { User, Notification, NavItem } from "@/types/header"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"

interface HeaderProps {
  user?: User
  notifications?: Notification[]
  onNotificationClick?: (notification: Notification) => void
  onLogout?: () => void
}

export default function Header({
  notifications = [],
  onNotificationClick,
  onLogout,
}: HeaderProps) {
  const { user } = useAuth()
  const pathname = usePathname()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Navigation items
  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "My Schedules",
      href: "/schedules",
      icon: <Calendar className="h-4 w-4" />,
      badge: 3, // Example badge count
    },
    {
      title: "Appointments",
      href: "/appointments",
      icon: <UserIcon className="h-4 w-4" />,
    },
    {
      title: "Notifications",
      href: "/notifications",
      icon: <Bell className="h-4 w-4" />,
      badge: unreadCount,
    },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update unread count when notifications change
  useEffect(() => {
    setUnreadCount(notifications.filter((n) => !n.read).length)
  }, [notifications])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const name = user ? `${user.first_name} ${user.last_name}` : "User"

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.name) return "U"
    return user.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Format notification time
  const formatNotificationTime = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  // Get notification icon color
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "appointment":
        return "text-blue-500"
      case "message":
        return "text-green-500"
      case "alert":
        return "text-red-500"
      case "reminder":
        return "text-yellow-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm",
        isScrolled
          ? 'bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b'
          : 'bg-background'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            {/* <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">HP</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold leading-tight">HealthCare Pro</h1>
              <p className="text-xs text-muted-foreground">Telehealth Platform</p>
            </div> */}
            <Image src={icon} alt="Logo" width={180} height={32} />
          </Link>
        </div>

        {/* Desktop Navigation */}
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

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Notifications Dropdown */}
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
                {notifications.length > 0 && (
                  <Button variant="ghost" size="sm" className="h-auto text-xs">
                    Mark all as read
                  </Button>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="h-75">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={cn(
                        "flex cursor-pointer flex-col items-start gap-1 p-3",
                        !notification.read && "bg-accent/50"
                      )}
                      onClick={() => onNotificationClick?.(notification)}
                    >
                      <div className="flex w-full items-start justify-between gap-2">
                        <span className="text-sm font-medium">
                          {notification.title}
                        </span>
                        <span className="text-xs whitespace-nowrap text-muted-foreground">
                          {formatNotificationTime(notification.timestamp)}
                        </span>
                      </div>
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {notification.message}
                      </p>
                      <Badge
                        variant="outline"
                        className={cn(
                          "mt-1 text-xs",
                          getNotificationIcon(notification.type)
                        )}
                      >
                        {notification.type}
                      </Badge>
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
                <Link href="/notifications" className="w-full justify-center">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm leading-none font-medium">
                  {/* {`${user?.first_name} ${user?.last_name}`} */}
                  {name}
                  </p>
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
                  <Link href="/profile" className="cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={onLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
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
                      <span className="text-lg font-bold text-primary-foreground">
                        HP
                      </span>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">HealthCare Pro</h2>
                      <p className="text-xs text-muted-foreground">
                        Telehealth Platform
                      </p>
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
                      {item.badge ? (
                        <Badge className="ml-auto">{item.badge}</Badge>
                      ) : null}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  )
}
