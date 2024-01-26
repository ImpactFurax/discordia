import { SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AdminLink from './AdminLink'

const Topbar = () => {
  return (
    <div className='z-50 flex-between bg-zinc-800 p-2 fixed top-0 w-full'>
      <Link href="/" className='flex-center'>
        <Image src="/assets/images/hand-logo.png" alt='hand-logo' width={55} height={60} />
        <Image src="/assets/images/logo.png" alt='logo' width={165} height={65} className='hidden sm:flex' />
      </Link>
      <AdminLink />
      <div className='flex items-center gap-2'>
        <div>
          <UserButton afterSignOutUrl='/' />
        </div>
        <SignedOut>
          <Link href="/sign-in" className='flex-center gap-1'>
            <p className='text-white font-semibold text-xl hidden sm:flex'>Se connecter</p>
            <Image src="/assets/icons/login.svg" alt='login' width={35} height={35} />
          </Link>
        </SignedOut>
      </div>
    </div >
  )
}

export default Topbar