import Collection from '@/components/shared/Collection'
import FilterBar from '@/components/shared/FilterBar'
import SearchBar from '@/components/shared/SearchBar'
import { getAllThreads } from '@/lib/actions/thread.actions'

const Threads = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  const threads = await getAllThreads({
    query: '',
    page: 1,
    limit: 6
  });

  return (
    <section className='py-16 flex-center flex-col gap-16 px-2 md:px-20 2xl:px-30'>
      <div className='flex-center flex-col gap-16 md:flex-row md:justify-between w-full'>
        <h1 className='text-5xl font-bold text-center'>Threads</h1>
        <div className='flex-center flex-col md:flex-row'>
          <SearchBar />
          <FilterBar />
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