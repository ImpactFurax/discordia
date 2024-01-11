import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      {children}
    </div>
  )
}

export default Layout