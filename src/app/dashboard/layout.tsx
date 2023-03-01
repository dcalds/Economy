'use client'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/components';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard | Economy',
  description: 'Economy | Here you can take control of your financial life!',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
    <AuthProvider>
      <body className={inter.className}>
        <>{children}</>
      </body>
    </AuthProvider>
    </html>
  )
}
