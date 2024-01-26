import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { auth } from '@clerk/nextjs';
import { userRole } from '@/lib/actions/user.actions';
import Image from 'next/image';

const AdminLink = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  let user = null;
  if (userId) {
    user = await userRole(userId);
  }
  return (
    <>
      {user?.role === 'Admin' && (
        <Button className='bg-blue-700 font-bold text-white hover:bg-blue-800'>
          <Link href="/admin/dashboard" className='font-bold text-xl flex items-center gap-2' >
            <Image src="/assets/icons/admin.png" alt='admin' width={25} height={25} />
            Admin
          </Link>
        </Button>
      )}
    </>
  )
}

export default AdminLink