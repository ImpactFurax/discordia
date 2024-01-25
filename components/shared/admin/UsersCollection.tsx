'use client'
import { getAllUsers } from '@/lib/actions/user.actions'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type UserProps = {
  _id: string
  username: string
  email: string
  photo: string
  role: string
}

const UsersCollection = () => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const router = useRouter();


  useEffect(() => {
    const fetchData = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData);
    };

    fetchData();
  }, []);

  return (
    <table className='border-collapse min-w-full'>
      <thead className='bg-zinc-800 text-lg'>
        <tr className='text-left'>
          <th className='py-4 px-4'>Photo</th>
          <th className='py-4 px-4 hidden sm:flex'>ID</th>
          <th className='py-4 px-4'>Username</th>
          <th className='py-4 px-4 hidden lg:flex'>Email</th>
          <th className='py-4 px-4'>Status</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: UserProps) => (
          <tr className='cursor-pointer hover:bg-zinc-900' onClick={() => router.push(`/admin/users/${user._id}`)} key={user._id}>
            <td className='py-4 px-4'><Image src={user.photo} alt='photo' width={40} height={40} className='rounded-full' /></td>
            <td className='py-4 px-4 hidden sm:flex h-[72px] items-center'>{user._id}</td>
            <td className='py-4 px-4'>{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</td>
            <td className='py-4 px-4 hidden lg:flex h-[72px] items-center'>{user.email}</td>
            <td className='py-4 px-4'>{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default UsersCollection