// types/header.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'patient' | 'doctor' | 'admin';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'message' | 'alert' | 'reminder';
  read: boolean;
  timestamp: Date;
  link?: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  badge?: number;
}