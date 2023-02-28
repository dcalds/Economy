import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation';
import { AuthProvider } from '@/components';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard | Economy',
  description: 'Economy | Here you can take control of your financial life!',
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const userSession = await getServerSession(authOptions);
  console.log('SESSION', userSession);

  if (!userSession) {
    redirect('/signin');
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <>{children}</>
      </body>
    </html>
  )
}
