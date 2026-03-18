import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { Metadata, Viewport } from "next";
import PwaRegister from '@/components/PwaRegister'
import { AuthProvider } from "@/context/AuthContext";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { BookingProvider } from "@/context/BookingContext";

export const metadata: Metadata = {
  title: 'Telehealth App',
  description: 'My first Next.js PWA',
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body cz-shortcut-listen="true">
      <ReactQueryProvider>
        <PwaRegister />
        <AuthProvider>
          <BookingProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
          </BookingProvider>
        </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
