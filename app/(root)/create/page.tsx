import ThreadForm from "@/components/shared/ThreadForm";
import { auth } from "@clerk/nextjs"

const CreateThread = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <section className='flex flex-col items-center gap-10 py-12 px-4'>
      <h1 className='text-5xl w-full font-bold text-center lg:text-left lg:pl-20'>Créer un thread</h1>
      <ThreadForm userId={userId} type="Créer" />
    </section>
  )
}

export default CreateThread