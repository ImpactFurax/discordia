import { getThreadById } from '@/lib/actions/thread.actions'
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import React from 'react'
import { formatDateTime } from '@/lib/utils';
import Comments from '@/components/shared/Comments';
import CommentForm from '@/components/shared/CommentForm';
import { auth } from '@clerk/nextjs';
import LikedThread from '@/components/shared/LikedThread';
import { numberOfLikeByThreadId } from '@/lib/actions/like.actions';

const ThreadDetails = async ({ params: { id } }: SearchParamProps) => {
  const thread = await getThreadById(id);
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <section className='flex-center flex-col py-12 px-3 gap-8 '>
      <h1 className='text-center font-bold text-3xl sm:text-5xl'>{thread.title}</h1>
      <div>
        <Image src={thread.imageUrl} alt='ThreadImage' width={1000} height={1000} className='object-cover object-center rounded-xl' />
      </div>
      <h2 className='text-center font-bold text-3xl sm:text-5xl'>Histoire</h2>
      <div className='flex w-full xl:w-[800px]'>
        <p className='text-lg whitespace-pre-wrap'>{thread.description}</p>
      </div>
      <div className='flex justify-between items-center gap-3 w-full text-lg xl:w-[1000px]'>
        <div className='text-base sm:text-lg'>
          <p>Créer le : <strong className='font-semibold'>{formatDateTime(thread.createdAt).dateTime}</strong></p>
          <p>Par : <strong className='font-semibold'>{thread.author.username.charAt(0).toUpperCase() + thread.author.username.slice(1)}</strong></p>
        </div>
        <LikedThread threadId={thread._id} userId={userId} />
      </div>
      <Comments threadId={thread._id} />
      <CommentForm userId={userId} />
    </section>
  )
}

export default ThreadDetails