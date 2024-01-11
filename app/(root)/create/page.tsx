import FormCreate from "@/components/shared/FormCreate"

const CreateThread = () => {
  return (
    <section className='flex flex-col items-center gap-5 py-12 px-4'>
      <h1 className='text-5xl w-full font-bold text-center'>Créer un thread</h1>
      <FormCreate />
    </section>
  )
}

export default CreateThread