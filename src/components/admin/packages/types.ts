
import { z } from "zod";

// Define the form schema with zod
export const packageFormSchema = z.object({
  title: z.string().min(5, { message: "O título deve ter pelo menos 5 caracteres" }),
  description: z.string().min(20, { message: "A descrição deve ter pelo menos 20 caracteres" }),
  image: z.string().url({ message: "Informe uma URL de imagem válida" }),
  price: z.coerce.number().positive({ message: "O preço deve ser um valor positivo" }),
  days: z.coerce.number().int().positive({ message: "A duração deve ser um número inteiro positivo" }),
  persons: z.coerce.number().int().positive({ message: "O número de pessoas deve ser um número inteiro positivo" }),
  rating: z.coerce.number().min(0).max(5, { message: "A avaliação deve estar entre 0 e 5" }),
  category: z.string(),
  highlights: z.array(z.string()).optional(),
  includes: z.array(z.string()).optional(),
  excludes: z.array(z.string()).optional(),
  itinerary: z
    .array(
      z.object({
        day: z.coerce.number().int().positive(),
        title: z.string().min(3),
        description: z.string().min(10),
      })
    )
    .optional(),
  dates: z.array(z.string()).optional(),
});

export type PackageFormValues = z.infer<typeof packageFormSchema>;
