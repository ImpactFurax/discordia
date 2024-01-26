import UserInfo from '@/components/shared/admin/UserInfo'
import React from 'react'

const UserDetails = () => {

  return (
    <div className='relative w-full flex flex-col items-center justify-center py-4 gap-5 px-2'>
      <h1 className='font-bold text-3xl'>UserDetails</h1>
      <UserInfo />
    </div>
  )
}

export default UserDetails