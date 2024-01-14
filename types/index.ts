export type CreateUserParams = {
  clerkId: string
  firstName: string
  lastName: string
  username: string
  email: string
  photo: string
}

export type UpdateUserParams = {
  firstName: string
  lastName: string
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