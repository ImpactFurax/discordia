import UsersCollection from '@/components/shared/admin/UsersCollection'
import React from 'react'

const Users = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center py-4 gap-5 px-2'>
      <h1 className='font-bold text-3xl'>Users</h1>
      <UsersCollection />
    </div>
  )
}

export default Users