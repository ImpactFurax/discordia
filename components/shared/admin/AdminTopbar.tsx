'use client'
import { SignOutButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

const AdminTopbar = () => {
  const router = useRouter();
  return (
    <div className='fixed top-0 w-full bg-zinc-800 p-4 flex items-center justify-end sm:hidden'>
      <div className='flex sm:hidden'>
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/')}>
            <div className='flex items-center gap-2 cursor-pointer'>
              <Image src="/assets/icons/log-out.svg" alt='logout' width={30} height={30} />
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  )
}

export default AdminTopbar