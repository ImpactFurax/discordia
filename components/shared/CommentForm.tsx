'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Textarea } from "../ui/textarea"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { commentFormSchema } from "@/lib/validator"
import { Button } from "../ui/button"
import { createComment } from "@/lib/actions/comment.actions"
import { usePathname } from "next/navigation"
import { useSession } from "@clerk/nextjs"

const CommentForm = ({ userId }: { userId: string }) => {
  const { isSignedIn } = useSession();
  const threadId = usePathname().split('/')[2];
  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      comment: "",
    }
  });
  async function onSubmit(values: z.infer<typeof commentFormSchema>) {
    try {
      const newComment = await createComment({
        comment: values.comment,
        userId,
        threadId,
        path: '/profile'
      })
      if (newComment) {
        form.reset();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {isSignedIn &&
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full lg:max-w-[800px]">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="flex-center flex-col">
                  <FormControl>
                    <Textarea placeholder="Ecrit un commentaire ... (max 500 caractères, espaces compris)" className="focus-visible:ring-0 bg-zinc-800 text-white rounded-lg text-md min-h-[200px]" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button className=" bg-indigo-800 text-white font-bold text-xl py-5 hover:bg-indigo-700 my-4 sm:mb-0 w-full md:w-52" type="submit" disabled={form.formState.isSubmitting}>Valider</Button>
            </div>
          </form>
        </Form>
      }
    </>
  )
}

export default CommentForm