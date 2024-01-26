"use client"

import { Button } from '@/components/ui/button'
import { AdminNavLinks } from '@/constants'
import { SignOutButton, SignedIn } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const AdminNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <nav className='fixed bottom-0 w-full sm:left-0 sm:w-fit sm:h-screen p-2 sm:py-4 bg-zinc-800 flex flex-col justify-between sm:items-center'>
      <ul className='flex justify-around sm:flex-col gap-5'>
        {AdminNavLinks.map((link) => {
          const isActive = pathname === link.url || pathname.startsWith(link.url) && link.url !== '/';
          return (
            <Link href={link.url} key={link.label} className={`flex gap-4 rounded-md p-3 lg:py-6 md:w-full ${isActive && 'bg-blue-700'}`}>
              <Image src={link.image} alt={link.label} width={30} height={30} />
              <p className='text-xl text-white font-semibold hidden lg:flex'>{link.label}</p>
            </Link>
          )
        })}
      </ul>
      <div className='hidden sm:flex flex-col items-center gap-5'>
        <Button className='font-bold text-lg text-white bg-red-700 hover:bg-red-800'>
          <Link href="/" className='flex items-center gap-3'>
            <Image src="/assets/icons/home.svg" alt='Home' width={25} height={25} />
            <p className='hidden lg:flex'>WebSite</p>
          </Link>
        </Button>
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/')}>
            <div className='flex items-center gap-2 cursor-pointer'>
              <Image src="/assets/icons/log-out.svg" alt='logout' width={30} height={30} />
              <p className='hidden text-lg font-bold lg:flex'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </nav>
  )
}

export default AdminNavbar