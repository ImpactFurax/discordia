import { IThread } from "@/lib/database/models/thread.model"
import Card from "./Card"
import Link from "next/link"
import Image from "next/image"

type CollectionProps = {
  data: IThread[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string,
  collectionType?: 'Threads_Organized' | 'All_Threads'
}

const Collection = ({ data, emptyTitle, emptyStateSubtext, page, totalPages = 0, collectionType, urlParamName }: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="w-full">
          <ul className="flex flex-col xl:items-center xl:justify-center gap-16 lg:flex-wrap xl:flex-row">
            {data.map((thread) => {
              return (
                <li key={thread._id} className="flex-center flex-col">
                  <Card thread={thread} />
                </li>
              )
            })}
          </ul>
        </div>
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