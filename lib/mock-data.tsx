// lib/mock-data.ts
import { User, Notification } from '@/types/header';

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'patient',
  avatar: 'https://github.com/shadcn.png',
};

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Appointment Reminder',
    message: 'You have an appointment with Dr. Smith tomorrow at 10:00 AM',
    type: 'appointment',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: '2',
    title: 'New Message',
    message: 'Dr. Johnson sent you a message about your lab results',
    type: 'message',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '3',
    title: 'Medication Reminder',
    message: 'Time to take your evening medication',
    type: 'reminder',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
];