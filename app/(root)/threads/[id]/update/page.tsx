import ThreadForm from "@/components/shared/ThreadForm";
import { auth } from "@clerk/nextjs"

const UpdateThread = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;


  return (
    <section className='flex flex-col items-center gap-5 py-12 px-4'>
      <h1 className='text-5xl w-full font-bold text-center lg:text-left lg:pl-20'>Modifier un thread</h1>
      <ThreadForm userId={userId} type="Modifier" />
    </section>
  )
}

export default UpdateThread