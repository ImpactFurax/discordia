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
    <section className='py-16 flex-center flex-col gap-16 px-4 2xl:px-30'>
      <div className='flex items-center flex-col gap-16 md:px-8 md:flex-row md:justify-between w-full'>
        <h1 className='text-5xl font-bold text-center min-w-[280px]'>Mes Threads</h1>
        <div className='flex w-full md:justify-end flex-col md:flex-row'>
          <SearchBar />
        </div>
      </div>
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
    </section>
  )
}

export default Profile