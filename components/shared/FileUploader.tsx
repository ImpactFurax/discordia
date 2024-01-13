'use client'

import { useCallback, Dispatch, SetStateAction } from 'react'
import type { FileWithPath } from '@uploadthing/react'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'

import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'

type FileUploaderProps = {
  onFieldChange: (url: string) => void
  imageUrl: string
  setFiles: Dispatch<SetStateAction<File[]>>
}

export function FileUploader({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles)
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  })

  return (
    <div
      {...getRootProps()}
      className="flex-center flex cursor-pointer flex-col overflow-hidden rounded-xl w-4/5">
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex max-h-[800px] w-full flex-1 justify-center">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex-center flex-col py-5 px-2 gap-3 bg-zinc-800 w-full rounded-md h-96">
          <img src="/assets/icons/dwl-img.svg" width={77} height={77} alt="file upload" />
          <h3 className="mb-2 mt-2 text-lg md:text-2xl">Faite glisser la photo ici</h3>
          <Button type="button" className="rounded-full bg-indigo-800 text-white text-xl px-8 text-wrap h-auto hover:bg-indigo-700 md:text-2xl">
            Sélectionner depuis l'ordinateur
          </Button>
        </div>
      )}
    </div>
  )
}