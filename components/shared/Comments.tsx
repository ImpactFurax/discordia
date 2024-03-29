import { getCommentsByThreadId } from '@/lib/actions/comment.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import { Separator } from '../ui/separator';

const Comments = async ({ threadId }: { threadId: string }) => {
  const threadComments = await getCommentsByThreadId(threadId);
  return (
    <>
      {threadComments.data.length > 0 ? (
        <div className='flex flex-col gap-5 w-full xl:w-[1000px]'>
          <h2 className='text-2xl font-bold'>{threadComments.nb} commentaires</h2>
          <ul className='w-full flex flex-col items-center gap-8'>
            {threadComments.data.map((threadComment: any) => (
              <li key={threadComment._id} className='bg-zinc-800 text-white rounded-lg p-4 flex flex-col gap-3 w-full'>
                <div className='flex items-center gap-4'>
                  <Image src={threadComment.author.photo} alt='photo' width={40} height={40} className='rounded-full' />
                  <h4 className='font-semibold text-lg'>{threadComment.author.username.charAt(0).toUpperCase() + threadComment.author.username.slice(1)}</h4>
                </div>
                <Separator className='bg-gray-500 opacity-50' />
                <p>{threadComment.comment}</p>
                <Separator className='bg-gray-500 opacity-50' />
                <p className='text-right'>Le {formatDateTime(threadComment.createdAt).dateTime}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className='bg-zinc-800 w-full py-4 rounded-lg flex items-center justify-center xl:w-[1000px] p-4'>
          <h3 className='text-xl font-bold'>Pas de commentaire pour le moment</h3>
        </div>
      )}
    </>
  )
}

export default Comments