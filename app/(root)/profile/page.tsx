import Collection from '@/components/shared/Collection'
import SearchBar from '@/components/shared/SearchBar';
import { getThreadsByUser } from '@/lib/actions/thread.actions';
import { SearchParamProps } from '@/types';
import { auth } from '@clerk/nextjs';
import React from 'react'

const Profile = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';

  const authorThreads = await getThreadsByUser({
    userId,
    page,
    limit: 6,
    query: searchText,
  });
  return (
    <section className='py-16'>
      <div className='flex-center flex-col gap-10 px-4'>
        <h1 className='font-bold text-5xl text-center'>Mes Threads</h1>
        <SearchBar />
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