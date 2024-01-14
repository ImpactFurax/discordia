import Collection from '@/components/shared/Collection'
import SearchBar from '@/components/shared/SearchBar'
import { getAllThreads } from '@/lib/actions/thread.actions'
import { SearchParamProps } from '@/types'

const Threads = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const threads = await getAllThreads({
    query: searchText,
    page,
    limit: 6
  });
  await new Promise(resolve => setTimeout(resolve, 1000))

  return (
    <section className='py-16 flex-center flex-col gap-16 px-4 md:px-20 2xl:px-30'>
      <div className='flex-center flex-col gap-16 md:flex-row md:justify-between w-full'>
        <h1 className='text-5xl font-bold text-center'>Threads</h1>
        <div className='flex w-full flex-col md:flex-row'>
          <SearchBar />
        </div>
      </div>
      <Collection
        data={threads?.data}
        emptyTitle="Aucun Threads trouvé"
        emptyStateSubtext="Revenez plus tard!"
        collectionType="All_Threads"
        delOrUpd={false}
        limit={6}
        page={1}
        totalPages={2}
      />
    </section>
  )
}

export default Threads