"use client"

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar"; // ✅ ShadCN Calendar
import { ChevronLeft, ChevronRight, Plus, Video, Stethoscope, Users , Phone,  Clock,  CalendarIcon } from "lucide-react";
import { ScheduleCard } from "@/components/custom/ScheduleCard";
import { AppointmentCard } from "@/components/custom/AppointmentCard";

export default function Schedules() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 10)); // March 10, 2026
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Day Schedule Data
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

  // Week Schedule Data
  const weekSchedule = [
    { day: "Mon", date: "8", count: 6 },
    { day: "Tue", date: "9", count: 8 },
    { day: "Wed", date: "10", count: 6, isToday: true },
    { day: "Thu", date: "11", count: 7 },
    { day: "Fri", date: "12", count: 5 },
    { day: "Sat", date: "13", count: 2 },
    { day: "Sun", date: "14", count: 0 },
  ];

  // Week total
  const weekTotal = weekSchedule.reduce((total, day) => total + day.count, 0); // 33

  // Month Schedule Data with actual counts
  const monthSchedule = [
    { date: 1, count: 4 },
    { date: 3, count: 3 },
    { date: 5, count: 5 },
    { date: 8, count: 6 },
    { date: 9, count: 8 },
    { date: 10, count: 6 },
    { date: 11, count: 7 },
    { date: 12, count: 5 },
    { date: 13, count: 2 },
    { date: 15, count: 4 },
    { date: 17, count: 6 },
    { date: 19, count: 5 },
    { date: 22, count: 7 },
    { date: 24, count: 4 },
    { date: 26, count: 5 },
    { date: 29, count: 3 },
  ];

  // Month calculations
  const monthTotal = monthSchedule.reduce((total, day) => total + day.count, 0); // 80
  const appointmentDays = monthSchedule.map(day => day.date); // [1, 3, 5, 8, 9, 10, 11, 12, 13, 15, 17, 19, 22, 24, 26, 29]

  // Helper functions for month view
  const getAppointmentCount = (date: Date) => {
    const dayData = monthSchedule.find(d => d.date === date.getDate());
    return dayData?.count || 0;
  };

  const hasAppointments = (date: Date) => {
    return appointmentDays.includes(date.getDate());
  };

  // Custom day render for calendar
  const renderDay = (date: Date) => {
    const count = getAppointmentCount(date);
    const isSelected = selectedDate?.toDateString() === date.toDateString();
    const isToday = date.getDate() === 10 && date.getMonth() === 2 && date.getFullYear() === 2026;
    
    return (
      <div className="relative flex flex-col items-center justify-center">
        <span className={isSelected || isToday ? "text-primary-foreground" : ""}>
          {date.getDate()}
        </span>
        {count > 0 && (
          <span className={`text-[10px] font-medium ${
            isSelected || isToday ? "text-primary-foreground" : "text-primary"
          }`}>
            {count}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Schedules</h1>
          <p className="text-muted-foreground">Manage your appointments and availability</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="day" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="day">Day View</TabsTrigger>
          <TabsTrigger value="week">Week View</TabsTrigger>
          <TabsTrigger value="month">Month View</TabsTrigger>
        </TabsList>

        {/* ==================== DAY VIEW ==================== */}
        <TabsContent value="day" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tuesday, March 10, 2026</CardTitle>
                  <CardDescription>{daySchedule.length} appointments scheduled</CardDescription>
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
                    className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 hover:bg-accent/30 transition-colors"
                  >
                    {/* Time Column */}
                    <div className="flex flex-col items-center min-w-20 text-center">
                      <span className="font-medium">{appointment.time}</span>
                      <span className="text-xs text-muted-foreground">{appointment.duration}</span>
                    </div>

                    {/* Divider */}
                    <div className="h-12 w-px bg-border" />

                    {/* Patient Avatar */}
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" alt={appointment.patient} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {appointment.patient.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    {/* Patient Details */}
                    <div className="flex-1">
                      <p className="font-medium">{appointment.patient}</p>
                      <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                    </div>

                    {/* Status & Type */}
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ==================== WEEK VIEW ==================== */}
        <TabsContent value="week" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Week of March 8 - 14, 2026</CardTitle>
                  <CardDescription>
                    <span className="font-semibold text-primary">{weekTotal} OPD</span> this week
                  </CardDescription>
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
                    {/* Day Name */}
                    <p className={`text-sm font-medium mb-1 ${
                      day.isToday ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {day.day}
                    </p>
                    
                    {/* Date */}
                    <p className={`text-2xl font-bold mb-2 ${
                      day.isToday ? 'text-primary' : ''
                    }`}>
                      {day.date}
                    </p>
                    
                    {/* OPD Count Badge */}
                    <div className="space-y-1">
                      <Badge variant="secondary" className="w-full justify-center">
                        {day.count} OPD
                      </Badge>
                    </div>
                    
                    {/* Appointment Density Dots */}
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

        {/* ==================== MONTH VIEW - 3 COLUMN LAYOUT ==================== */}
        <TabsContent value="month" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>March 2026</CardTitle>
                  <CardDescription>
                    <span className="font-semibold text-primary">{monthTotal} OPD sessions</span> this month
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setMonth(newDate.getMonth() - 1);
                      setCurrentDate(newDate);
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newDate = new Date(currentDate);
                      newDate.setMonth(newDate.getMonth() + 1);
                      setCurrentDate(newDate);
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Three Column Grid Inside Month Tab */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ========== LEFT COLUMN - CALENDAR ========== */}
                <div className="lg:col-span-1">
                  <Card className="border-border h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                        Calendar
                      </CardTitle>
                      <CardDescription>Select a date to view OPD details</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        month={currentDate}
                        onMonthChange={setCurrentDate}
                        className="rounded-lg border w-full"
                        components={{
                          DayButton: ({ day, ...props }) => {
                            const date = day.date;
                            const count = getAppointmentCount(date);
                            const isSelected = selectedDate?.toDateString() === date.toDateString();
                            const isToday = date.getDate() === 10 &&
                              date.getMonth() === 2 &&
                              date.getFullYear() === 2026;

                            return (
                              <button
                                {...props}
                                className={`
                          relative flex items-center justify-center
                          aspect-square w-full
                          text-sm font-normal rounded-md transition-all duration-200
                          h-15 mx-auto z-10
                          ${isSelected
                                    ? 'bg-primary text-primary-foreground shadow-sm scale-105'
                                    : ''
                                  }
                          ${isToday && !isSelected
                                  ? 'bg-primary/5 text-primary hover:bg-primary/10'
                                    : ''
                                  }
                          ${hasAppointments(date) && !isSelected && !isToday
                                    ? 'bg-primary/5 text-primary hover:bg-primary/10'
                                    : ''
                                  }
                        `}
                              >
                                <div className="flex flex-col items-center justify-center">
                                  <span>{date.getDate()}</span>
                                  {count > 0 && (
                                    <span className="h-1 w-1 bg-primary rounded-full mt-1">
                                      
                                    </span>
                                  )}
                                </div>
                              </button>
                            );
                          }
                        }}
                      />

                      {/* Month Summary */}
                      <div className="mt-4 pt-3 border-t border-border">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Total OPD</span>
                          <Badge variant="outline" className="font-semibold">{monthTotal}</Badge>
                        </div>
                        <div className="flex justify-between items-center mt-1 text-sm">
                          <span className="text-muted-foreground">Active Days</span>
                          <Badge variant="outline" className="font-semibold">{appointmentDays.length}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-1">
                  <ScheduleCard
                    title="Doctor OPD Schedule"
                    date={selectedDate
                      ? selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                      : 'Select a date'}
                    count={selectedDate ? getAppointmentCount(selectedDate) : 0}
                    countLabel="OPD"
                    viewAllText="View All Doctors"
                    viewAllCount={Math.min(3, Math.ceil((selectedDate ? getAppointmentCount(selectedDate) : 0) / 2))}
                    onViewAll={() => console.log("View all doctors")}
                    emptyIcon={<Stethoscope className="h-8 w-8 mx-auto mb-2 opacity-30" />}
                    emptyMessage="No doctor OPD scheduled"
                    emptySubMessage="Select a date with OPD sessions"
                  >
                    {/* Doctor Cards */}
                    {selectedDate && getAppointmentCount(selectedDate) >= 4 && (
                      <AppointmentCard
                        type="doctor"
                        title="Dr. Amit Sharma"
                        subtitle="Video"
                        avatar="AS"
                        specialization="Cardiology, Neurology"
                        timeSlot="9:00 AM - 1:00 PM"
                        appointments={Math.floor(getAppointmentCount(selectedDate) / 2)}
                        available={true}
                        onClick={() => console.log("Dr. Amit Sharma clicked")}
                      />
                    )}

                    {selectedDate && getAppointmentCount(selectedDate) >= 3 && (
                      <AppointmentCard
                        type="doctor"
                        title="Dr. Priya Patel"
                        subtitle="In-Person"
                        avatar="PP"
                        specialization="Dermatology"
                        timeSlot="2:00 PM - 5:00 PM"
                        appointments={Math.ceil(getAppointmentCount(selectedDate) / 2)}
                        available={true}
                        onClick={() => console.log("Dr. Priya Patel clicked")}
                      />
                    )}

                    {selectedDate && getAppointmentCount(selectedDate) >= 6 && (
                      <AppointmentCard
                        type="doctor"
                        title="Dr. Rajesh Kumar"
                        subtitle="Video"
                        avatar="RK"
                        specialization="Orthopedics"
                        timeSlot="10:00 AM - 3:00 PM"
                        appointments={Math.floor(getAppointmentCount(selectedDate) / 3)}
                        available={true}
                        onClick={() => console.log("Dr. Rajesh Kumar clicked")}
                      />
                    )}
                  </ScheduleCard>
                </div>

                {/* ========== RIGHT COLUMN - PATIENT OPD SCHEDULE ========== */}
                <div className="lg:col-span-1">
                  <ScheduleCard
                    title="Patient Appointments"
                    date={selectedDate
                      ? selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                      : 'Select a date'}
                    count={selectedDate ? getAppointmentCount(selectedDate) : 0}
                    countLabel="Patients"
                    viewAllText="View All Patients"
                    viewAllCount={selectedDate ? getAppointmentCount(selectedDate) : 0}
                    onViewAll={() => console.log("View all patients")}
                    emptyIcon={<Users className="h-8 w-8 mx-auto mb-2 opacity-30" />}
                    emptyMessage="No patient appointments"
                    emptySubMessage="Select a date with OPD sessions"
                  >
                    {/* Patient Cards */}
                    {selectedDate && getAppointmentCount(selectedDate) >= 1 && (
                      <AppointmentCard
                        type="patient"
                        title="Alice Johnson"
                        avatar="AJ"
                        doctor="Dr. Amit Sharma"
                        time="9:00 AM"
                        appointmentType="Video"
                        status="Confirmed"
                        onClick={() => console.log("Alice Johnson clicked")}
                      />
                    )}

                    {selectedDate && getAppointmentCount(selectedDate) >= 3 && (
                      <AppointmentCard
                        type="patient"
                        title="Michael Chen"
                        avatar="MC"
                        doctor="Dr. Priya Patel"
                        time="10:00 AM"
                        appointmentType="In-Person"
                        status="Confirmed"
                        onClick={() => console.log("Michael Chen clicked")}
                      />
                    )}

                    {selectedDate && getAppointmentCount(selectedDate) >= 5 && (
                      <AppointmentCard
                        type="patient"
                        title="Emma Wilson"
                        avatar="EW"
                        doctor="Dr. Rajesh Kumar"
                        time="11:30 AM"
                        appointmentType="Phone"
                        status="Pending"
                        onClick={() => console.log("Emma Wilson clicked")}
                      />
                    )}

                    {selectedDate && getAppointmentCount(selectedDate) >= 7 && (
                      <AppointmentCard
                        type="patient"
                        title="James Rodriguez"
                        avatar="JR"
                        doctor="Dr. Amit Sharma"
                        time="2:00 PM"
                        appointmentType="Video"
                        status="Pending"
                        onClick={() => console.log("James Rodriguez clicked")}
                      />
                    )}

                    {selectedDate && getAppointmentCount(selectedDate) >= 8 && (
                      <AppointmentCard
                        type="patient"
                        title="Sophia Lee"
                        avatar="SL"
                        doctor="Dr. Priya Patel"
                        time="3:00 PM"
                        appointmentType="Video"
                        status="Confirmed"
                        onClick={() => console.log("Sophia Lee clicked")}
                      />
                    )}
                  </ScheduleCard>
                </div>
              </div>

              {/* Month Summary Section (Below the 3 columns) */}
              <div className="mt-6 border-t border-border pt-4">
                {/* Key Stats */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div className="text-center p-2 bg-accent/20 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{monthTotal}</p>
                    <p className="text-xs text-muted-foreground">Total OPD</p>
                  </div>
                  <div className="text-center p-2 bg-accent/20 rounded-lg">
                    <p className="text-2xl font-bold text-primary">{appointmentDays.length}</p>
                    <p className="text-xs text-muted-foreground">Active Days</p>
                  </div>
                  <div className="text-center p-2 bg-accent/20 rounded-lg">
                    <p className="text-2xl font-bold text-primary">
                      {(monthTotal / appointmentDays.length).toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">Avg/Day</p>
                  </div>
                  <div className="text-center p-2 bg-accent/20 rounded-lg">
                    <p className="text-2xl font-bold text-primary">
                      {Math.max(...monthSchedule.map(d => d.count))}
                    </p>
                    <p className="text-xs text-muted-foreground">Peak Day</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                    <span>150</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-accent/30 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${(monthTotal / 150) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}