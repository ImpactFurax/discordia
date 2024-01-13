import { getThreadById } from '@/lib/actions/thread.actions'
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import React from 'react'
import { formatDateTime } from '@/lib/utils';

const ThreadDetails = async ({ params: { id } }: SearchParamProps) => {
  const thread = await getThreadById(id);

  return (
    <section className='flex-center flex-col py-12 px-3 gap-8'>
      <h1 className='text-center font-bold text-5xl'>{thread.title}</h1>
      <div className=''>
        <Image src={thread.imageUrl} alt='ThreadImage' width={1000} height={1000} className='object-cover object-center rounded-xl' />
      </div>
      <h2 className='text-center font-bold text-4xl'>Histoire</h2>
      <div className='flex w-full xl:w-[800px]'>
        <p className='text-lg whitespace-pre-wrap'>{thread.description}</p>
      </div>
      <div className='text-left w-full text-lg sm:text-right xl:w-[1000px]'>
        <p>Créer le : <strong className='font-semibold'>{formatDateTime(thread.createdAt).dateTime}</strong></p>
        <p>Par : <strong className='font-semibold'>{thread.author.username.charAt(0).toUpperCase() + thread.author.username.slice(1)}</strong></p>
      </div>
    </section>
  )
}

export default ThreadDetails