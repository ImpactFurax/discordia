'use client'
import { Button } from '@/components/ui/button';
import { SignOutButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

const AdminTopbar = () => {
  const router = useRouter();
  return (
    <div className='fixed top-0 w-full bg-zinc-800 p-4 flex items-center justify-end sm:hidden'>
      <div className='flex sm:hidden justify-between w-full'>
        <Button variant="destructive" className='font-bold text-lg'>
          <Link href="/" className='flex items-center gap-3'>
            <Image src="/assets/icons/home.svg" alt='Home' width={25} height={25} />
            <p>WebSite</p>
          </Link>
        </Button>
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