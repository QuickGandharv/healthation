// 'use client';

// import Footer from '@/components/common/footer';
// import Header from '@/components/common/header';
// import { useAuth } from '@/context/AuthContext';
// // import { mockUser, mockNotifications } from '@/lib/mock-data';
// import { useRouter } from 'next/navigation';


// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { logout } = useAuth();
//   const router = useRouter();

//   return (
//     <div className="min-h-screen bg-background">
//       <Header
//         // user={mockUser}
//         // notifications={mockNotifications}
//         onLogout={logout}
//       />
//       <main className="container mx-auto px-4 py-6">
//         {children}
//       </main>
//       <Footer />
//     </div>
//   );
// }

'use client';

import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header onLogout={logout} />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}