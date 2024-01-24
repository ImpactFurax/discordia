import { ClerkProvider, auth } from '@clerk/nextjs'
import './globals.css'
import { Metadata } from 'next'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Outfit } from 'next/font/google';
import { userRole } from '@/lib/actions/user.actions';
import AuthProvider from '@/components/providers/AuthProvider';

const outfit = Outfit({
  weight: '300',
  subsets: ['latin'],
})


export const metadata: Metadata = {
  title: 'Discordia',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  let user = null;
  if (userId) {
    user = await userRole(userId);
  }
  return (
    <ClerkProvider>
      <AuthProvider role={user?.role}>
        <html lang="en" suppressHydrationWarning>
          <body className={outfit.className}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </body>
        </html>
      </AuthProvider>
    </ClerkProvider >
  )
}
