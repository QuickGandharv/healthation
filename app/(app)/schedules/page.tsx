"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Video, Phone, ChevronLeft, ChevronRight, Plus } from "lucide-react";

export default function Schedules() {
  const [currentDate] = useState(new Date(2026, 2, 10)); // March 10, 2026

  const daySchedule = [
    {
      id: 1,
      time: "09:00 AM",
      duration: "30 min",
      patient: "Alice Johnson",
      type: "video",
      reason: "Annual Checkup",
      status: "confirmed"
    },
    {
      id: 2,
      time: "10:00 AM",
      duration: "45 min",
      patient: "Michael Chen",
      type: "video",
      reason: "Follow-up Consultation",
      status: "confirmed"
    },
    {
      id: 3,
      time: "11:30 AM",
      duration: "30 min",
      patient: "Emma Wilson",
      type: "phone",
      reason: "Lab Results Discussion",
      status: "confirmed"
    },
    {
      id: 4,
      time: "01:00 PM",
      duration: "60 min",
      patient: "Break",
      type: "break",
      reason: "Lunch Break",
      status: "break"
    },
    {
      id: 5,
      time: "02:00 PM",
      duration: "30 min",
      patient: "James Rodriguez",
      type: "video",
      reason: "Initial Consultation",
      status: "pending"
    },
    {
      id: 6,
      time: "03:00 PM",
      duration: "30 min",
      patient: "Sophia Lee",
      type: "video",
      reason: "Prescription Renewal",
      status: "confirmed"
    },
  ];

  const weekSchedule = [
    { day: "Mon", date: "8", count: 6 },
    { day: "Tue", date: "9", count: 8 },
    { day: "Wed", date: "10", count: 6, isToday: true },
    { day: "Thu", date: "11", count: 7 },
    { day: "Fri", date: "12", count: 5 },
    { day: "Sat", date: "13", count: 2 },
    { day: "Sun", date: "14", count: 0 },
  ];

  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const appointmentDays = [1, 3, 5, 8, 9, 10, 11, 12, 13, 15, 17, 19, 22, 24, 26, 29];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">My Schedules</h1>
          <p className="text-muted-foreground">Manage your appointments and availability</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="day" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
        </TabsList>

        {/* Day View */}
        <TabsContent value="day" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tuesday, March 10, 2026</CardTitle>
                  <CardDescription>{daySchedule.filter(s => s.status !== 'break').length} appointments scheduled</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {daySchedule.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className={`flex items-center gap-4 rounded-lg border p-4 ${
                      appointment.status === 'break' 
                        ? 'border-border bg-muted/30' 
                        : 'border-border bg-card hover:bg-accent/30 transition-colors'
                    }`}
                  >
                    <div className="flex flex-col items-center min-w-[80px] text-center">
                      <span className="font-medium">{appointment.time}</span>
                      <span className="text-xs text-muted-foreground">{appointment.duration}</span>
                    </div>
                    
                    <div className="h-12 w-px bg-border" />
                    
                    {appointment.status === 'break' ? (
                      <div className="flex-1">
                        <p className="font-medium text-muted-foreground">{appointment.patient}</p>
                        <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                      </div>
                    ) : (
                      <>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="" alt={appointment.patient} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {appointment.patient.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <p className="font-medium">{appointment.patient}</p>
                          <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {appointment.type === 'video' ? (
                            <Video className="h-4 w-4 text-primary" />
                          ) : (
                            <Phone className="h-4 w-4 text-primary" />
                          )}
                          <Badge 
                            variant={appointment.status === "confirmed" ? "default" : "secondary"}
                            className={appointment.status === "confirmed" ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Week View */}
        <TabsContent value="week" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Week of March 8 - 14, 2026</CardTitle>
                  <CardDescription>34 total appointments this week</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-3">
                {weekSchedule.map((day) => (
                  <div 
                    key={day.day}
                    className={`rounded-lg border p-4 text-center ${
                      day.isToday 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border bg-card hover:bg-accent/30 transition-colors'
                    }`}
                  >
                    <p className={`text-sm font-medium mb-1 ${day.isToday ? 'text-primary' : 'text-muted-foreground'}`}>
                      {day.day}
                    </p>
                    <p className={`text-2xl font-bold mb-2 ${day.isToday ? 'text-primary' : ''}`}>
                      {day.date}
                    </p>
                    <div className="space-y-1">
                      <Badge variant="secondary" className="w-full justify-center">
                        {day.count} sessions
                      </Badge>
                    </div>
                    {day.count > 0 && (
                      <div className="mt-3 space-y-1">
                        {Array.from({ length: Math.min(day.count, 3) }).map((_, i) => (
                          <div key={i} className="h-1 rounded-full bg-primary/30" />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Month View */}
        <TabsContent value="month" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>March 2026</CardTitle>
                  <CardDescription>Overview of monthly appointments</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Header */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for days before month starts (March 1, 2026 is Sunday) */}
                {monthDays.map((day) => {
                  const hasAppointments = appointmentDays.includes(day);
                  const isToday = day === 10;
                  
                  return (
                    <button
                      key={day}
                      className={`aspect-square rounded-lg border p-2 text-center transition-colors ${
                        isToday
                          ? 'border-primary bg-primary text-primary-foreground font-bold'
                          : hasAppointments
                          ? 'border-border bg-accent/50 hover:bg-accent font-medium'
                          : 'border-border hover:bg-accent/30'
                      }`}
                    >
                      <span className="text-sm">{day}</span>
                      {hasAppointments && !isToday && (
                        <div className="mt-1 flex justify-center gap-0.5">
                          <div className="h-1 w-1 rounded-full bg-primary" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
