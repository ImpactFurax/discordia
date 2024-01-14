import { IThread } from "@/lib/database/models/thread.model"
import Card from "./Card"

type CollectionProps = {
  data: IThread[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string,
  collectionType?: 'Threads_Organized' | 'All_Threads',
  delOrUpd: boolean
}

const Collection = ({ data, emptyTitle, emptyStateSubtext, page, totalPages = 0, collectionType, urlParamName, delOrUpd }: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <ul className="flex w-full flex-col gap-10 md:items-center xl:flex-row xl:flex-wrap xl:justify-center">
          {data.map((thread) => {
            return (
              <li key={thread._id}>
                <Card thread={thread} delOrUpd={delOrUpd} />
              </li>
            )
          })}
        </ul>
      ) : (
        <div className="bg-zinc-800 w-full flex-center flex-col gap-2 py-5 rounded-lg text-white">
          <h3 className="text-3xl font-bold">{emptyTitle}</h3>
          <p className="text-xl opacity-75">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  )
}

export default Collection