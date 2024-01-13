'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { threadFormSchema } from "@/lib/validator"
import { threadDefaultValues } from "@/constants"
import { Textarea } from "../ui/textarea"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import { useUploadThing } from '@/lib/uploadthing';
import { useRouter } from "next/navigation"
import { createThread } from "@/lib/actions/thread.actions"


type ThreadFormProps = {
  userId: string
  type: "Créer" | "Modifier"
}

const ThreadForm = ({ userId, type }: ThreadFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  const initialValues = threadDefaultValues;
  const router = useRouter();

  const { startUpload } = useUploadThing('imageUploader');

  // Définit le formulaire
  const form = useForm<z.infer<typeof threadFormSchema>>({
    resolver: zodResolver(threadFormSchema),
    defaultValues: initialValues
  })

  // Validation du formulaire
  async function onSubmit(values: z.infer<typeof threadFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }
      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === 'Créer') {
      try {
        const newThread = await createThread({
          thread: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: '/profile'
        })
        if (newThread) {
          form.reset();
          router.push(`/threads/${newThread._id}`)
        }
      } catch (error) {
        console.log(error);

      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-5">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="flex-center">
              <FormControl>
                <FileUploader
                  onFieldChange={field.onChange}
                  imageUrl={field.value}
                  setFiles={setFiles}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Titre du thread" className="bg-zinc-800 text-md focus-visible:ring-0" {...field} />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Raconte l'histoire de ton thread ... (max 4000 caractères)" className="bg-zinc-800 text-md resize-none h-96 focus-visible:ring-0" {...field} />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Résume l'histoire de ton thread (max 260 caractères)" className="bg-zinc-800 text-md resize-none h-48 focus-visible:ring-0" {...field} />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
        <Button className=" bg-indigo-800 text-white font-bold text-xl py-5 hover:bg-indigo-700 my-4 sm:mb-0" type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? ('Submitting...') : (`${type} un thread`)}</Button>
      </form>
    </Form>
  )
}

export default ThreadForm