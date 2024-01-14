import Collection from '@/components/shared/Collection'
import { getAllThreads } from '@/lib/actions/thread.actions';
import React from 'react'

const Profile = async () => {
  const threads = await getAllThreads({
    query: '',
    page: 1,
    limit: 6
  });
  return (
    <section className='py-16'>
      <div className='flex-center flex-col gap-10 px-4'>
        <h1 className='font-bold text-5xl text-center'>Mes Threads</h1>
        <Collection
          data={threads?.data}
          emptyTitle="Aucun Threads trouvé"
          emptyStateSubtext="Revenez plus tard!"
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