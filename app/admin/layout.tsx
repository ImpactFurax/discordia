import AdminNavbar from '@/components/shared/admin/AdminNavbar'
import AdminTopbar from '@/components/shared/admin/AdminTopbar'
import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='min-h-screen py-20 sm:py-2 sm:pl-20 lg:pl-52'>
      <AdminTopbar />
      <div>
        {children}
        <AdminNavbar />
      </div>
    </main>

  )
}

export default Layout