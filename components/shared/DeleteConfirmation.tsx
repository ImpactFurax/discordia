'use client'

import { useTransition } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

import { deleteThread } from '@/lib/actions/thread.actions'

export const DeleteConfirmation = ({ threadId }: { threadId: string }) => {
  const pathname = usePathname()
  let [isPending, startTransition] = useTransition()

  return (
    <AlertDialog>
      <AlertDialogTrigger className='bg-zinc-800 transition-all duration-300 hover:scale-125 p-1 rounded-lg z-30'>
        <Image src="/assets/icons/trash-2.svg" alt="delete" width={30} height={30} />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl text-black">Attention</AlertDialogTitle>
          <AlertDialogDescription className="text-lg text-black">
            Etes-vous sûr que vous voulez supprimer?
          </AlertDialogDescription>
          <AlertDialogDescription className="text-lg text-black">
            Cela supprimera définitivement ce thread
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteThread({ threadId, path: pathname })
              })
            } className='hover:bg-red-500 hover:text-white text-md font-semibold duration-300'>
            {isPending ? 'Suppression en cours...' : 'Supprimer'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}