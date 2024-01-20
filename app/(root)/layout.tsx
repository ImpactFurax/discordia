import Navbar from '@/components/shared/Navbar'
import Topbar from '@/components/shared/Topbar'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='min-h-srceen'>
      <Topbar />
      <main className='flex flex-col-reverse sm:flex-row'>
        <Navbar />
        <section className='min-h-screen w-full pb-7 pt-[70px] sm:ml-[70px] lg:ml-[240px]'>
          {children}
        </section>
      </main>
    </div>
  )
}

export default Layout