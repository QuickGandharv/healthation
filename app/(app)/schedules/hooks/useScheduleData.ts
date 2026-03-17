import { useState, useEffect, useCallback, useMemo } from "react";
import { scheduleService } from "../services/scheduleService";
import { 
  DoctorSchedule, 
  PatientAppointment, 
  OPDSlot, 
  FilterType,
  DayScheduleResponse,
  WeekScheduleResponse,
  MonthScheduleResponse 
} from "../types";

export const useScheduleData = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSchedule, setSelectedSchedule] = useState<DoctorSchedule | null>(null);
  const [selectedDaySlots, setSelectedDaySlots] = useState<OPDSlot[]>([]);
  const [selectedSlotForAppointments, setSelectedSlotForAppointments] = useState<OPDSlot | null>(null);
  const [selectedMonthSlot, setSelectedMonthSlot] = useState<OPDSlot | null>(null);
  
  // View offsets for navigation
  const [weekOffset, setWeekOffset] = useState(0);
  const [dayOffset, setDayOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);

  // Loading states
  const [isLoadingDay, setIsLoadingDay] = useState(false);
  const [isLoadingWeek, setIsLoadingWeek] = useState(false);
  const [isLoadingMonth, setIsLoadingMonth] = useState(false);

  // Data states
  const [daySchedule, setDaySchedule] = useState<DayScheduleResponse | null>(null);
  const [weekSchedule, setWeekSchedule] = useState<WeekScheduleResponse | null>(null);
  const [monthSchedule, setMonthSchedule] = useState<MonthScheduleResponse | null>(null);

  // Error states
  const [dayError, setDayError] = useState<string | null>(null);
  const [weekError, setWeekError] = useState<string | null>(null);
  const [monthError, setMonthError] = useState<string | null>(null);

  // Doctor info - memoized to prevent unnecessary re-renders
  const doctorInfo = useMemo(() => ({
    name: "Dr. Amit Sharma",
    specialization: "Cardiology, Neurology",
    avatar: "AS"
  }), []);

  // Fetch day schedule
  const fetchDaySchedule = useCallback(async (date: Date) => {
    setIsLoadingDay(true);
    setDayError(null);
    try {
      const response = await scheduleService.getDaySchedule(date);
      if (response.success || response.status) {
        setDaySchedule(response.data);
      } else {
        setDayError(response.message || "Failed to fetch day schedule");
      }
    } catch (error: any) {
      setDayError(error.message || "Error fetching day schedule");
    } finally {
      setIsLoadingDay(false);
    }
  }, []); // No dependencies needed

  // Fetch week schedule
  const fetchWeekSchedule = useCallback(async (date: Date) => {
    setIsLoadingWeek(true);
    setWeekError(null);
    try {
      const response = await scheduleService.getWeekSchedule(date);
      if (response.success || response.status) {
        setWeekSchedule(response.data);
      } else {
        setWeekError(response.message || "Failed to fetch week schedule");
      }
    } catch (error: any) {
      setWeekError(error.message || "Error fetching week schedule");
    } finally {
      setIsLoadingWeek(false);
    }
  }, []); // No dependencies needed

  // Fetch month schedule
  const fetchMonthSchedule = useCallback(async (date: Date) => {
    setIsLoadingMonth(true);
    setMonthError(null);
    try {
      const response = await scheduleService.getMonthSchedule(date);
      if (response.success || response.status) {
        setMonthSchedule(response.data);
      } else {
        setMonthError(response.message || "Failed to fetch month schedule");
      }
    } catch (error: any) {
      setMonthError(error.message || "Error fetching month schedule");
    } finally {
      setIsLoadingMonth(false);
    }
  }, []); // No dependencies needed

  // Get current day date based on offset
  const getCurrentDayDate = useCallback(() => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + dayOffset);
    return date;
  }, [currentDate, dayOffset]);

  const currentDayDate = useMemo(() => getCurrentDayDate(), [getCurrentDayDate]);

  const formatDayHeader = useCallback(() => {
    return currentDayDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [currentDayDate]);

  const navigateDay = useCallback((direction: 'prev' | 'next') => {
    setDayOffset(prev => direction === 'next' ? prev + 1 : prev - 1);
  }, []);

  // Get week start date based on offset
  const getWeekStartDate = useCallback(() => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + (weekOffset * 7));
    return date;
  }, [currentDate, weekOffset]);

  const weekStartDate = useMemo(() => getWeekStartDate(), [getWeekStartDate]);
  
  const weekEndDate = useMemo(() => {
    const date = new Date(weekStartDate);
    date.setDate(date.getDate() + 6);
    return date;
  }, [weekStartDate]);

  const formatWeekRange = useCallback(() => {
    return `Week of ${weekStartDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  }, [weekStartDate, weekEndDate]);

  const navigateWeek = useCallback((direction: 'prev' | 'next') => {
    setWeekOffset(prev => direction === 'next' ? prev + 1 : prev - 1);
  }, []);

  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setMonthOffset(prev => direction === 'next' ? prev + 1 : prev - 1);
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  }, [currentDate]);

  // Transform API data to UI formats - memoized
  const getDayDoctorSchedules = useCallback((): DoctorSchedule[] => {
    if (!daySchedule?.slots) return [];
    
    return daySchedule.slots.map((slot, index) => {
      const transformed = scheduleService.transformToOPDSlot(slot, doctorInfo);
      return {
        id: slot.id || `day-slot-${index}`,
        day: daySchedule.day_name.substring(0, 3),
        date: new Date(daySchedule.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
        timeSlot: transformed.timeSlot || `${slot.start_time} - ${slot.end_time}`,
        type: transformed.type || "In-Person",
        location: transformed.location || "Clinic",
        platform: transformed.platform,
        appointments: slot.booked_count || 0,
        totalCapacity: slot.capacity || slot.slot_capacity || 10,
        hasBookings: (slot.booked_count || 0) > 0,
        doctorName: doctorInfo.name,
        doctorSpecialization: doctorInfo.specialization,
        doctorAvatar: doctorInfo.avatar,
      };
    });
  }, [daySchedule, doctorInfo]);

  const getWeekSchedulesByDay = useCallback(() => {
    if (!weekSchedule?.days) return {};
    
    const schedulesByDay: Record<string, DoctorSchedule[]> = {};
    
    weekSchedule.days.forEach(day => {
      const dayShort = (day as any).day_short || day.day_name?.substring(0, 3) || "Mon";
      schedulesByDay[dayShort] = day.slots.map((slot, index) => {
        const transformed = scheduleService.transformToOPDSlot(slot, doctorInfo);
        return {
          id: slot.id || `week-slot-${day.date}-${index}`,
          day: dayShort,
          date: new Date(day.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
          timeSlot: transformed.timeSlot || `${slot.start_time} - ${slot.end_time}`,
          type: transformed.type || "In-Person",
          location: transformed.location || "Clinic",
          platform: transformed.platform,
          appointments: slot.booked_count || 0,
          totalCapacity: slot.capacity || slot.slot_capacity || 10,
          hasBookings: (slot.booked_count || 0) > 0,
          doctorName: doctorInfo.name,
          doctorSpecialization: doctorInfo.specialization,
          doctorAvatar: doctorInfo.avatar,
        };
      });
    });
    
    return schedulesByDay;
  }, [weekSchedule, doctorInfo]);

  const getOPDSlotsForDate = useCallback((date: Date): OPDSlot[] => {
    if (!monthSchedule?.days) return [];
    
    const dateStr = scheduleService.formatDate(date);
    const dayData = monthSchedule.days.find(d => d.date === dateStr);
    
    if (!dayData) return [];
    
    return dayData.slots.map(slot => {
      const transformed = scheduleService.transformToOPDSlot(slot, doctorInfo);
      return {
        ...transformed,
        appointments: (slot.appointments || []).map((appt: any) => 
          scheduleService.transformToPatientAppointment(appt)
        ),
      };
    });
  }, [monthSchedule, doctorInfo]);

  const getOPDCount = useCallback((date: Date): number => {
    return getOPDSlotsForDate(date).length;
  }, [getOPDSlotsForDate]);

  const hasAppointments = useCallback((date: Date): boolean => {
    return getOPDCount(date) > 0;
  }, [getOPDCount]);

  const isToday = useCallback((date: Date): boolean => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  }, []);

  const handleDateClick = useCallback((date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      // Month API often returns counts but not nested appointment lists.
      // Fetch the day schedule for this date so we can show actual patients.
      fetchDaySchedule(date);
      const slots = getOPDSlotsForDate(date);
      setSelectedMonthSlot(slots.length > 0 ? slots[0] : null);
    }
  }, [fetchDaySchedule, getOPDSlotsForDate]);

  const handleScheduleClick = useCallback((schedule: DoctorSchedule) => {
    setSelectedSchedule(schedule);
  }, []);

  const resolveSlotAppointments = useCallback(
    (slot: OPDSlot): PatientAppointment[] => {
      const existing = (slot.appointments || []) as unknown as PatientAppointment[]
      if (existing.length > 0) return existing

      const daySlots = daySchedule?.slots || []
      const match = daySlots.find((s: any) => {
        if (slot.id && s.id && slot.id === s.id) return true
        if ((slot as any).time_range && s.time_range && (slot as any).time_range === s.time_range) return true
        if (slot.timeSlot && (s.timeSlot || s.time_range) && slot.timeSlot === (s.timeSlot || s.time_range)) return true
        return false
      })

      return ((match as any)?.appointments || []).map((appt: any) =>
        scheduleService.transformToPatientAppointment(appt)
      )
    },
    [daySchedule?.slots]
  )

  const resolveSlotWithAppointments = useCallback(
    (slot: OPDSlot): OPDSlot => {
      const appointments = resolveSlotAppointments(slot)
      if (appointments.length === (slot.appointments || []).length) return slot
      return { ...slot, appointments }
    },
    [resolveSlotAppointments]
  )

  const handleSlotAppointmentsClick = useCallback(
    (slot: OPDSlot) => {
      setSelectedSlotForAppointments(resolveSlotWithAppointments(slot))
    },
    [resolveSlotWithAppointments]
  )

  // Get patients for selected slot
  const getPatientsForSelectedSlot = useCallback(() => {
    if (!selectedMonthSlot) return [];
    return resolveSlotAppointments(selectedMonthSlot);
  }, [resolveSlotAppointments, selectedMonthSlot]);

  // Initial fetch - only on mount
  useEffect(() => {
    fetchDaySchedule(currentDate);
    fetchWeekSchedule(currentDate);
    fetchMonthSchedule(currentDate);
  }, []); // Empty dependency array - only run once on mount

  // Update day schedule when day offset changes
  useEffect(() => {
    fetchDaySchedule(currentDayDate);
  }, [dayOffset, fetchDaySchedule, currentDayDate]);

  // Update week schedule when week offset changes
  useEffect(() => {
    fetchWeekSchedule(weekStartDate);
  }, [weekOffset, fetchWeekSchedule, weekStartDate]);

  // Set default selected slot on mount when month data loads
  useEffect(() => {
    if (monthSchedule && selectedDate) {
      const slots = getOPDSlotsForDate(selectedDate);
      if (slots.length > 0 && !selectedMonthSlot) {
        setSelectedMonthSlot(slots[0]);
      }
    }
  }, [monthSchedule, selectedDate, getOPDSlotsForDate, selectedMonthSlot]);

  // Month calculations - memoized
  const monthTotal = useMemo(() => 
    monthSchedule?.days?.reduce((total, day) => total + day.slots.length, 0) || 0,
  [monthSchedule]);
  
  const appointmentDays = useMemo(() => 
    monthSchedule?.days
      ?.filter(day => day.slots.length > 0)
      ?.map(day => new Date(day.date).getDate()) || [],
  [monthSchedule]);

  const peakDayValue = useMemo(() => 
    Math.max(...(monthSchedule?.days?.map(day => day.slots.length) || [0])),
  [monthSchedule]);

  // Week days order - constant, no need to memoize
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Memoize transformed data to prevent unnecessary recalculations
  const dayDoctorSchedules = useMemo(() => 
    getDayDoctorSchedules(),
  [getDayDoctorSchedules]);

  const schedulesByDay = useMemo(() => 
    getWeekSchedulesByDay(),
  [getWeekSchedulesByDay]);

  return {
    // State
    currentDate,
    selectedDate,
    selectedSchedule,
    selectedDaySlots,
    selectedSlotForAppointments,
    selectedMonthSlot,
    dayOffset,
    weekOffset,
    monthOffset,
    currentDayDate,
    weekStartDate,
    weekEndDate,
    
    // Loading states
    isLoadingDay,
    isLoadingWeek,
    isLoadingMonth,
    
    // Error states
    dayError,
    weekError,
    monthError,
    
    // Data
    daySchedule,
    weekSchedule,
    monthSchedule,
    
    // Computed values
    monthTotal,
    appointmentDays,
    peakDayValue,
    weekDays,
    
    // Transformed data - now memoized
    dayDoctorSchedules,
    schedulesByDay,
    
    // Functions
    setCurrentDate,
    setSelectedDate,
    setSelectedSchedule,
    setSelectedDaySlots,
    setSelectedSlotForAppointments,
    setSelectedMonthSlot,
    setDayOffset,
    setWeekOffset,
    setMonthOffset,
    
    // Navigation
    navigateDay,
    navigateWeek,
    navigateMonth,
    formatDayHeader,
    formatWeekRange,
    
    // Data fetching
    fetchDaySchedule,
    fetchWeekSchedule,
    fetchMonthSchedule,
    
    // Helpers
    getOPDSlotsForDate,
    getOPDCount,
    hasAppointments,
    isToday,
    handleDateClick,
    handleScheduleClick,
    handleSlotAppointmentsClick,
    getPatientsForSelectedSlot,
    
    // Service utilities
    formatDate: scheduleService.formatDate.bind(scheduleService),
  };
};