'use client'
import { NavLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className='bg-zinc-800 w-full sm:w-fit p-2 fixed z-30 bottom-0 sm:left-0 sm:pt-28 sm:min-h-screen'>
      <div className='flex-between sm:flex-col gap-2 sm:gap-6'>
        {NavLinks.map((link) => {
          const isActive = pathname === link.url || pathname.startsWith(link.url) && link.url !== '/';
          return (
            <Link href={link.url} key={link.label} className={`flex gap-4 rounded-md p-3 lg:py-6 md:w-full ${isActive && 'bg-red-900'}`}>
              <Image src={link.image} alt={link.label} width={30} height={30} />
              <p className='text-xl text-white font-semibold hidden lg:flex'>{link.label}</p>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Navbar