import * as z from "zod"

export const threadFormSchema = z.object({
  title: z.string().min(3, 'Le titre doit comporter au moins 3 caractères'),
  description: z.string().min(3, 'La description doit comporter au moins 3 caractères').max(4000,'La description doit comporter moins de 4 000 caractères'),
  summary: z.string().min(3, 'Le résumé doit comporter au moins 3 caractères').max(300,'Le résumé doit comporter moins de 300 caractères'),
  imageUrl: z.string(),
})