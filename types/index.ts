export type CreateUserParams = {
  clerkId: string
  username: string
  email: string
  photo: string
}

export type UpdateUserParams = {
  username: string
  photo: string
}

export type CreateThreadParams = {
  userId: string
  thread: {
    title: string
    description: string
    summary: string
    imageUrl: string
  }
  path: string
}
export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export type GetAllThreadsParams = {
  query: string
  limit: number
  page: number
}

export type DeleteThreadParams = {
  threadId: string
  path: string
}

export type UpdateThreadParams = {
  userId: string
  thread: {
    _id: string
    title: string
    imageUrl: string
    description: string
    summary: string
  }
  path: string
}

export type GetThreadsByUserParams = {
  userId: string
  limit?: number
  page: number
  query: string
}

export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

export type CreateCommentParams = {
  userId: string
  threadId: string
  comment: string
  path: string
}

export type LikeParams = {
  threadId: string
  userId: string
  isLiked?: boolean
}
