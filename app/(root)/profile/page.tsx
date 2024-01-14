import Collection from '@/components/shared/Collection'
import { getThreadsByUser } from '@/lib/actions/thread.actions';
import { auth } from '@clerk/nextjs';
import React from 'react'

const Profile = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const authorThreads = await getThreadsByUser({
    userId,
    page: 1,
    limit: 6
  });
  return (
    <section className='py-16'>
      <div className='flex-center flex-col gap-10 px-4'>
        <h1 className='font-bold text-5xl text-center'>Mes Threads</h1>
        <Collection
          data={authorThreads?.data}
          emptyTitle="Tu n'as pas encore crée de thread"
          emptyStateSubtext="Va vite en créer"
          collectionType="All_Threads"
          delOrUpd={true}
          limit={6}
          page={1}
          totalPages={2}
        />
      </div>
    </section>
  )
}

export default Profile