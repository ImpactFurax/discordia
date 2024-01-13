import { IThread } from '@/lib/database/models/thread.model'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Card = ({ thread }: { thread: IThread }) => {
  return (
    <div className='relative flex min-h-[330px] w-full md:w-[500px] lg:w-[550px] overflow-hidden rounded-xl md:h-[330px] transition-all group'>
      <Link href={`/threads/${thread._id}`} className='absolute h-full w-full'>
        <Image src={thread.imageUrl} alt='ImageThread' fill className='object-cover group-hover:opacity-50 duration-500' />
        <div className='flex flex-col justify-between h-full p-4 absolute z-10 opacity-0 group-hover:opacity-100 transition-opacity'>
          <h2 className='text-4xl font-bold'>{thread.title}</h2>
          <p className='text-md md:text-xl'>{thread.summary}</p>
          <div className='flex items-center justify-between'>
            <p className='text-lg'>
              De :{' '}
              <strong className='font-semibold'>
                {thread.author.username.charAt(0).toUpperCase() + thread.author.username.slice(1)}
              </strong>
            </p>
            <Image src="/assets/icons/view.svg" alt='voir' width={40} height={40} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;