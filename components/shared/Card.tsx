import { IThread } from '@/lib/database/models/thread.model'
import { auth } from '@clerk/nextjs';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation';
import { numberOfLikeByThreadId } from '@/lib/actions/like.actions';

type CardProps = {
  thread: IThread,
  delOrUpd: boolean
}

const Card = async ({ thread, delOrUpd }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isThreadCreator = userId === thread.author._id.toString() && delOrUpd === true;
  const countLikes = await numberOfLikeByThreadId(thread._id);


  return (
    <div className='relative flex min-h-[330px] w-full md:w-[450px] overflow-hidden rounded-xl transition-all group'>
      <Link href={`/threads/${thread._id}`} className='absolute h-full w-full'>
        <Image src={thread.imageUrl} alt='ImageThread' fill className='object-cover group-hover:opacity-50 duration-500' />
        <div className='flex flex-col justify-between h-full p-4 absolute z-10 opacity-0 group-hover:opacity-100 transition-opacity w-full'>
          <h2 className='text-2xl sm:text-4xl font-bold pr-8'>{thread.title}</h2>
          <p className='text-sm sm:text-base md:text-lg'>{thread.summary}</p>
          <div className='flex items-center justify-between gap-2'>
            <p className='text-lg'>
              De :{' '}
              <strong className='font-semibold'>
                {thread.author.username.charAt(0).toUpperCase() + thread.author.username.slice(1)}
              </strong>
            </p>
            <div className='flex items-center gap-1'>
              <p>{countLikes}</p>
              {countLikes > 0 ? (
                <Image src="/assets/icons/like-yes.png" alt='like' width={20} height={20} />
              ) : (
                <Image src="/assets/icons/like-none.png" alt='like' width={20} height={20} />
              )}
            </div>
            <Image src="/assets/icons/view.svg" alt='voir' width={40} height={40} />
          </div>
        </div>
      </Link>
      {isThreadCreator && (
        <div className='absolute right-1 top-1 flex flex-col items-center gap-2'>
          <div className='bg-zinc-800 transition-all duration-300 hover:scale-125 p-1 rounded-lg z-30'>
            <Link href={`/threads/${thread._id}/update`}>
              <Image src="/assets/icons/edit.svg" alt='edit' width={30} height={30} />
            </Link>
          </div>
          <DeleteConfirmation threadId={thread._id} />
        </div>
      )}
    </div>
  );
};

export default Card;