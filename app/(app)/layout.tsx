'use client';

import Header from '@/components/common/header';
// app/layout.tsx or app/dashboard/layout.tsx
import { mockUser, mockNotifications } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handleNotificationClick = (notification: any) => {
    // Handle notification click
    console.log('Notification clicked:', notification);
    // You might want to mark as read, navigate, etc.
  };

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.cookie = 'token=; path=/; max-age=0; samesite=lax';

    router.push('/login');
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