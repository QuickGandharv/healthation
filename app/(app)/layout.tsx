'use client';

import Header from '@/components/common/header';
// app/layout.tsx or app/dashboard/layout.tsx
import { mockUser, mockNotifications } from '@/lib/mock-data';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleNotificationClick = (notification: any) => {
    // Handle notification click
    console.log('Notification clicked:', notification);
    // You might want to mark as read, navigate, etc.
  };

  const handleLogout = async () => {
    // Handle logout logic
    console.log('Logging out...');
    // Add your logout logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={mockUser}
        notifications={mockNotifications}
        onNotificationClick={handleNotificationClick}
        onLogout={handleLogout}
      />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}