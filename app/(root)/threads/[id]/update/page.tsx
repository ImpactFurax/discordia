import ThreadForm from "@/components/shared/ThreadForm";
import { getThreadById } from "@/lib/actions/thread.actions";
import { auth } from "@clerk/nextjs";

type UpdateThreadProps = {
  params: {
    id: string
  }
}

const UpdateThread = async ({ params: { id } }: UpdateThreadProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const thread = await getThreadById(id)

  return (
    <section className='flex flex-col items-center gap-5 py-12 px-4 2xl:px-28'>
      <h1 className='text-5xl w-full font-bold text-center lg:text-left lg:pl-20'>Modifier un thread</h1>
      <ThreadForm
        type="Modifier"
        thread={thread}
        threadId={thread._id}
        userId={userId}
      />
    </section>
  )
}

export default UpdateThread