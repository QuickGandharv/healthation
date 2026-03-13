import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, Star, TrendingUp, Video, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const stats = [
    { label: "Total Appointments", value: "248", icon: Calendar, change: "+12%", color: "text-blue-600" },
    { label: "Today's Sessions", value: "8", icon: Clock, change: "+3", color: "text-emerald-600" },
    { label: "New Patients", value: "156", icon: Users, change: "+8%", color: "text-purple-600" },
    { label: "Average Rating", value: "4.9", icon: Star, change: "+0.2", color: "text-amber-500" },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: "Michael Chen",
      time: "10:00 AM",
      type: "Video Consultation",
      avatar: "",
      reason: "Follow-up Checkup",
      status: "confirmed"
    },
    {
      id: 2,
      patient: "Emma Wilson",
      time: "11:30 AM",
      type: "Phone Call",
      avatar: "",
      reason: "Lab Results Discussion",
      status: "confirmed"
    },
    {
      id: 3,
      patient: "James Rodriguez",
      time: "2:00 PM",
      type: "Video Consultation",
      avatar: "",
      reason: "Initial Consultation",
      status: "pending"
    },
  ];

  const recentActivity = [
    { id: 1, action: "Completed consultation with Sarah Miller", time: "30 min ago" },
    { id: 2, action: "Updated prescription for John Davis", time: "1 hour ago" },
    { id: 3, action: "Received new appointment request", time: "2 hours ago" },
    { id: 4, action: "Lab results uploaded for patient #2847", time: "3 hours ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Welcome back, Dr. Sarah Johnson</h1>
        <p className="text-muted-foreground">Here's what's happening with your practice today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
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
                <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  <span className="text-emerald-600">{stat.change}</span>
                  <span>from last month</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Appointments */}
        <Card className="lg:col-span-2 border-border">
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
            <CardDescription>You have {upcomingAppointments.length} appointments scheduled</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div 
                key={appointment.id}
                className="flex items-center justify-between rounded-lg border border-border bg-accent/30 p-4"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={appointment.avatar} alt={appointment.patient} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {appointment.patient.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{appointment.patient}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{appointment.time}</span>
                      <span>•</span>
                      <span>{appointment.reason}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"} className="bg-primary/10 text-primary hover:bg-primary/20">
                    {appointment.status}
                  </Badge>
                  {appointment.type.includes("Video") ? (
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      <Video className="h-4 w-4 mr-1" />
                      Join
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {upcomingAppointments.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground/40 mb-3" />
                <p className="text-muted-foreground">No appointments scheduled for today</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-5">
            <Button variant="outline" className="h-auto flex-col gap-2 py-6">
              <Calendar className="h-6 w-6 text-primary" />
              <span>All Patients</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-6">
              <Users className="h-6 w-6 text-primary" />
              <span>Patient Records</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-6">
              <MessageSquare className="h-6 w-6 text-primary" />
              <span>Medicine Investory</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-6">
              <Star className="h-6 w-6 text-primary" />
              <span>payment history</span>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-6">
              <Star className="h-6 w-6 text-primary" />
              <span>All Reviews</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
