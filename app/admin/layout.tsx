import AdminNavbar from '@/components/shared/admin/AdminNavbar'
import AdminTopbar from '@/components/shared/admin/AdminTopbar'
import { userRole } from '@/lib/actions/user.actions'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  let user = null;
  if (userId) {
    user = await userRole(userId);
  }
  if (user?.role !== 'admin') redirect('/');

  return (
    <>
      {user?.role === 'admin' ? (
        <main className='min-h-screen py-20 sm:py-2 sm:pl-20 lg:pl-52'>
          <AdminTopbar />
          <div>
            {children}
            <AdminNavbar />
          </div>
        </main>

      ) : (
        <div className='w-full min-h-screen flex flex-col items-center justify-center gap-5'>
          <h1 className='text-5xl font-bold'>Page not found !</h1>
          <h2 className='text-3xl'>You will be redirected to the home page</h2>
        </div>
      )}
    </>
  )
}

export default Layout