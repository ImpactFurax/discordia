import Collection from '@/components/shared/Collection'
import ProfileData from '@/components/shared/ProfileData';
import SearchBar from '@/components/shared/SearchBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  await new Promise(resolve => setTimeout(resolve, 1000))
  return (
    <section className='py-16 flex-center flex-col gap-16 px-4 lg:px-28'>
      <Tabs defaultValue="threads" className="w-full flex flex-col gap-10">
        <TabsList className='h-fit px-2 flex flex-col sm:flex-row bg-zinc-800 py-2'>
          <TabsTrigger value="threads" className='text-lg w-full font-semibold'>Mes Threads</TabsTrigger>
          <TabsTrigger value="data" className='text-lg w-full font-semibold'>Infos</TabsTrigger>
        </TabsList>
        <TabsContent value="threads" className='flex flex-col gap-10'>
          <div className='flex items-center flex-col gap-16 md:px-8 md:flex-row md:justify-between w-full'>
            <h1 className='text-4xl font-bold text-center min-w-[280px]'>Mes Threads</h1>
            <div className='flex w-full md:justify-end flex-col md:flex-row'>
              <SearchBar />
            </div>
          </div>
          <Collection
            data={authorThreads?.data}
            emptyTitle="Aucun Thread"
            emptyStateSubtext=""
            collectionType="All_Threads"
            delOrUpd={true}
            limit={6}
            page={1}
            totalPages={2}
          />
        </TabsContent>
        <TabsContent value="data">
          <ProfileData userId={userId} />
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default Profile