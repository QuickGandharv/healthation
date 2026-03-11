"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  Search,
  Filter,
  Plus,
  MoreVertical,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  FileText,
  User
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Appointments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const appointments = [
    {
      id: 1,
      patient: "Michael Chen",
      avatar: "",
      age: 45,
      gender: "Male",
      date: "March 11, 2026",
      time: "10:00 AM",
      duration: "30 min",
      type: "video",
      reason: "Follow-up Consultation",
      status: "confirmed",
      notes: "Patient requested to discuss recent lab results"
    },
    {
      id: 2,
      patient: "Emma Wilson",
      avatar: "",
      age: 32,
      gender: "Female",
      date: "March 11, 2026",
      time: "11:30 AM",
      duration: "45 min",
      type: "phone",
      reason: "Lab Results Discussion",
      status: "confirmed",
      notes: "Review blood test results and next steps"
    },
    {
      id: 3,
      patient: "James Rodriguez",
      avatar: "",
      age: 28,
      gender: "Male",
      date: "March 11, 2026",
      time: "2:00 PM",
      duration: "60 min",
      type: "video",
      reason: "Initial Consultation",
      status: "pending",
      notes: "New patient - comprehensive assessment needed"
    },
    {
      id: 4,
      patient: "Sophia Lee",
      avatar: "",
      age: 56,
      gender: "Female",
      date: "March 11, 2026",
      time: "3:30 PM",
      duration: "30 min",
      type: "video",
      reason: "Prescription Renewal",
      status: "confirmed",
      notes: "Medication review for hypertension"
    },
    {
      id: 5,
      patient: "David Park",
      avatar: "",
      age: 41,
      gender: "Male",
      date: "March 12, 2026",
      time: "9:00 AM",
      duration: "45 min",
      type: "in-person",
      reason: "Annual Physical",
      status: "confirmed",
      notes: "Complete physical examination required"
    },
    {
      id: 6,
      patient: "Alice Johnson",
      avatar: "",
      age: 38,
      gender: "Female",
      date: "March 10, 2026",
      time: "2:00 PM",
      duration: "30 min",
      type: "video",
      reason: "Follow-up",
      status: "completed",
      notes: "Post-surgery follow-up - healing well"
    },
    {
      id: 7,
      patient: "Robert Martinez",
      avatar: "",
      age: 52,
      gender: "Male",
      date: "March 9, 2026",
      time: "11:00 AM",
      duration: "30 min",
      type: "video",
      reason: "Consultation",
      status: "cancelled",
      notes: "Patient requested to reschedule"
    },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case "confirmed": return "bg-success/10 text-success hover:bg-success/20";
      case "pending": return "bg-warning/10 text-warning hover:bg-warning/20";
      case "completed": return "bg-info/10 text-info hover:bg-info/20";
      case "cancelled": return "bg-danger/10 text-danger hover:bg-danger/20";
      default: return "bg-primary/10 text-primary hover:bg-primary/20";
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case "video": return <Video className="h-4 w-4" />;
      case "phone": return <Phone className="h-4 w-4" />;
      case "in-person": return <MapPin className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || apt.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const upcomingAppointments = filteredAppointments.filter(apt => apt.status === "confirmed" || apt.status === "pending");
  const pastAppointments = filteredAppointments.filter(apt => apt.status === "completed" || apt.status === "cancelled");
  const todayAppointments = filteredAppointments.filter(apt => apt.date === "March 11, 2026" && (apt.status === "confirmed" || apt.status === "pending"));

  const stats = [
    { label: "Today's Appointments", value: todayAppointments.length, color: "text-primary" },
    { label: "Upcoming", value: upcomingAppointments.length, color: "text-success" },
    { label: "Pending", value: appointments.filter(a => a.status === "pending").length, color: "text-warning" },
    { label: "Completed", value: appointments.filter(a => a.status === "completed").length, color: "text-info" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="mb-2">Appointments</h1>
          <p className="text-muted-foreground">Manage all patient appointments</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Appointment</DialogTitle>
              <DialogDescription>Schedule a new appointment for a patient</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="patient">Patient Name</Label>
                  <Input id="patient" placeholder="Search patient..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apt-type">Appointment Type</Label>
                  <Select>
                    <SelectTrigger id="apt-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Consultation</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="in-person">In-Person Visit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select>
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Input id="reason" placeholder="e.g., Follow-up consultation" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Add any additional notes..."
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button className="bg-primary hover:bg-primary/90">Schedule Appointment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by patient name or reason..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Appointments</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        {/* All Appointments */}
        <TabsContent value="all" className="space-y-4 mt-6">
          {filteredAppointments.length === 0 ? (
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground/40 mb-3" />
                <p className="font-medium mb-1">No appointments found</p>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          ) : (
            filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-border hover:border-primary/20 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Patient Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={appointment.avatar} alt={appointment.patient} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {appointment.patient.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{appointment.patient}</h4>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span>{appointment.age}y, {appointment.gender}</span>
                          <span>•</span>
                          <span>{appointment.reason}</span>
                        </div>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-center gap-6">
                      <div className="text-center min-w-[120px]">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Calendar className="h-3 w-3" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Clock className="h-3 w-3" />
                          <span>{appointment.time}</span>
                          <span className="text-muted-foreground">({appointment.duration})</span>
                        </div>
                      </div>

                      {/* Type & Status */}
                      <div className="flex flex-col gap-2 min-w-[120px]">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                            {getTypeIcon(appointment.type)}
                          </div>
                          <span className="text-sm capitalize">{appointment.type}</span>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {appointment.status === "confirmed" && appointment.type === "video" && (
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            <Video className="h-4 w-4 mr-1" />
                            Join
                          </Button>
                        )}
                        {appointment.status === "pending" && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-success border-success hover:bg-success/10">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Confirm
                            </Button>
                            <Button size="sm" variant="outline" className="text-danger border-danger hover:bg-danger/10">
                              <XCircle className="h-4 w-4 mr-1" />
                              Decline
                            </Button>
                          </div>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              View Patient
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Notes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Appointment
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-danger">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel Appointment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {appointment.notes && (
                    <div className="mt-4 rounded-lg bg-accent/30 p-3">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Notes:</span> {appointment.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Today */}
        <TabsContent value="today" className="space-y-4 mt-6">
          {todayAppointments.length === 0 ? (
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground/40 mb-3" />
                <p className="font-medium mb-1">No appointments for today</p>
                <p className="text-sm text-muted-foreground">Your schedule is clear</p>
              </CardContent>
            </Card>
          ) : (
            todayAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-border hover:border-primary/20 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={appointment.avatar} alt={appointment.patient} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {appointment.patient.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{appointment.patient}</h4>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span>{appointment.age}y, {appointment.gender}</span>
                          <span>•</span>
                          <span>{appointment.reason}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center min-w-[120px]">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Clock className="h-3 w-3" />
                          <span>{appointment.time}</span>
                          <span className="text-muted-foreground">({appointment.duration})</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 min-w-[120px]">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                            {getTypeIcon(appointment.type)}
                          </div>
                          <span className="text-sm capitalize">{appointment.type}</span>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {appointment.status === "confirmed" && appointment.type === "video" && (
                          <Button size="sm" className="bg-primary hover:bg-primary/90">
                            <Video className="h-4 w-4 mr-1" />
                            Join
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              View Patient
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Notes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Appointment
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-danger">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel Appointment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                  {appointment.notes && (
                    <div className="mt-4 rounded-lg bg-accent/30 p-3">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Notes:</span> {appointment.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Upcoming */}
        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {upcomingAppointments.length === 0 ? (
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground/40 mb-3" />
                <p className="font-medium mb-1">No upcoming appointments</p>
                <p className="text-sm text-muted-foreground">Schedule new appointments to get started</p>
              </CardContent>
            </Card>
          ) : (
            upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-border hover:border-primary/20 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={appointment.avatar} alt={appointment.patient} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {appointment.patient.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{appointment.patient}</h4>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span>{appointment.age}y, {appointment.gender}</span>
                          <span>•</span>
                          <span>{appointment.reason}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center min-w-[120px]">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Calendar className="h-3 w-3" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Clock className="h-3 w-3" />
                          <span>{appointment.time}</span>
                          <span className="text-muted-foreground">({appointment.duration})</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 min-w-[120px]">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                            {getTypeIcon(appointment.type)}
                          </div>
                          <span className="text-sm capitalize">{appointment.type}</span>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {appointment.status === "pending" && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-success border-success hover:bg-success/10">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Confirm
                            </Button>
                          </div>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              View Patient
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Notes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Appointment
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-danger">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel Appointment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Past */}
        <TabsContent value="past" className="space-y-4 mt-6">
          {pastAppointments.length === 0 ? (
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground/40 mb-3" />
                <p className="font-medium mb-1">No past appointments</p>
                <p className="text-sm text-muted-foreground">Past appointments will appear here</p>
              </CardContent>
            </Card>
          ) : (
            pastAppointments.map((appointment) => (
              <Card key={appointment.id} className="border-border opacity-75">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={appointment.avatar} alt={appointment.patient} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {appointment.patient.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{appointment.patient}</h4>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <span>{appointment.age}y, {appointment.gender}</span>
                          <span>•</span>
                          <span>{appointment.reason}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center min-w-[120px]">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Calendar className="h-3 w-3" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Clock className="h-3 w-3" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 min-w-[120px]">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                            {getTypeIcon(appointment.type)}
                          </div>
                          <span className="text-sm capitalize">{appointment.type}</span>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            View Patient
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            View Notes
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
