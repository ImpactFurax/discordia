"use client"

import { AdminNavLinks } from '@/constants'
import { SignOutButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
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
          const isActive = pathname === link.url;
          return (
            <Link href={link.url} key={link.label} className={`flex gap-4 rounded-md p-3 lg:py-6 md:w-full ${isActive && 'bg-red-900'}`}>
              <Image src={link.image} alt={link.label} width={30} height={30} />
              <p className='text-xl text-white font-semibold hidden lg:flex'>{link.label}</p>
            </Link>
          )
        })}
      </ul>
      <div className='hidden sm:flex'>
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/')}>
            <div className='flex items-center gap-2 cursor-pointer'>
              <Image src="/assets/icons/log-out.svg" alt='logout' width={30} height={30} />
              <p className='hidden text-lg lg:flex'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </nav>
  )
}

export default AdminNavbar