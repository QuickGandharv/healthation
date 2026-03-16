'use client';

import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import { useAuth } from '@/context/AuthContext';
import { mockUser, mockNotifications } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  const router = useRouter();
  const handleNotificationClick = (notification: any) => {
    // Handle notification click
    console.log('Notification clicked:', notification);
    // You might want to mark as read, navigate, etc.
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={mockUser}
        notifications={mockNotifications}
        onNotificationClick={handleNotificationClick}
        onLogout={logout}
      />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}