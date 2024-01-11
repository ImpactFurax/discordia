import Image from "next/image";

export default function Home() {
  return (
    <section className="flex-center flex-col gap-16 p-4 my-10">
      <div className="flex-center flex-col w-full gap-5 lg:gap-20 xl:flex-row">
        <p className="text-xl lg:text-2xl w-full xl:w-2/5">Bienvenue sur <strong className="font-bold">Discordia</strong>, la plateforme immersive dédiée à la création de threads d'horreur uniques !<br /> Plongez dans l'obscurité en déposant une image qui servira de toile de fond à une histoire terrifiante.
        </p>
        <div className="relative hidden md:flex w-[550px] h-[300px]">
          <Image src="/assets/images/image5.jpg" alt="image1" fill className="object-cover rounded-xl" />
        </div>
      </div>
      <div className="flex-center flex-col gap-10">
        <h1 className="font-bold text-3xl lg:text-4xl">Comment ça fonctionne :</h1>
        <div className="flex-center flex-col w-full gap-5 lg:gap-20 xl:flex-row-reverse">
          <p className="text-xl lg:text-2xl w-full xl:w-2/5"><strong className="font-bold">1. Déposez votre image : </strong>Soumettez une image énigmatique ou inquiétante vous inspirera à créer une histoire sombre.
          </p>
          <div className="relative hidden md:flex w-[550px] h-[250px]">
            <Image src="/assets/images/image6.jpg" alt="image1" fill className="object-cover rounded-xl" />
          </div>
        </div>
        <div className="flex-center flex-col w-full gap-5 lg:gap-20 xl:flex-row">
          <p className="text-xl lg:text-2xl w-full xl:w-2/5"><strong className="font-bold">2. Laissez la magie opérer : </strong>Exprimez votre créativité en racontant une histoire basée sur l'image que vous utilisez.
          </p>
          <div className="relative hidden md:flex w-[550px] h-[250px]">
            <Image src="/assets/images/image7.jpg" alt="image1" fill className="object-cover rounded-xl" />
          </div>
        </div>
        <div className="flex-center flex-col w-full gap-3 lg:gap-14 xl:flex-row-reverse">
          <p className="text-xl lg:text-2xl w-full xl:w-2/5"><strong className="font-bold">3. Participez ou observez : </strong>Une fois votre thread d'horreur créé, vous pouvez suivre les différents commentaires de votre histoire fraîchement créée.
          </p>
          <div className="relative hidden md:flex w-[550px] h-[250px]">
            <Image src="/assets/images/image8.jpg" alt="image1" fill className="object-cover rounded-xl" />
          </div>
        </div>
        <p className="text-xl lg:text-2xl w-full xl:w-[85%]"><strong className="font-bold">Discordia</strong>, c'est l'endroit où l'angoisse et la créativité se rencontrent. Préparez-vous à vivre des expériences uniques et à explorer l'horreur à travers l'objectif captivant de chaque image déposée. Rejoignez-nous pour plonger dans le mystère et donner vie à l'obscurité.</p>
      </div>
    </section>
  )
}
