import { getUserDataById } from '@/lib/actions/user.actions'
import Image from 'next/image';
import React from 'react'

const ProfileData = async ({ userId }: { userId: string }) => {
  const userData = await getUserDataById(userId);
  return (
    <div className='flex flex-col gap-10 items-center'>
      <h1 className='text-4xl font-bold text-center'>Infos</h1>
      <div className='bg-zinc-800 rounded-lg p-2 w-full xl:w-[1000px]'>
        <div className='border-2 border-zinc-500 rounded-lg w-full p-4 flex flex-col md:flex-row gap-5'>
          <div className='flex flex-col items-center gap-2'>
            {userData?.userInfo.photo ? (
              <Image src={userData.userInfo.photo} alt='Profile Photo' width={150} height={150} className='rounded-full' />
            ) : (
              <Image src="/assets/images/no-avatar.png" alt='Profile Photo' width={150} height={150} className='rounded-full' />
            )}
          </div>
          <div className='flex flex-col items-center md:items-start w-full justify-between text-lg gap-2 font-semibold'>
            <div>
              <p>Username : <span className='font-light'>{userData?.userInfo.username.charAt(0).toUpperCase() + userData?.userInfo.username.slice(1)}</span></p>
            </div>
            <div>
              <p>Email : <span className='font-light'>{userData?.userInfo.email}</span></p>
            </div>
            <div>
              <p>Nombre de threads :  <span className='font-light'>{userData?.threadUser}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ProfileData