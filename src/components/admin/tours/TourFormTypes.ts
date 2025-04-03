
import { z } from "zod";

// Form schema for validation
export const tourFormSchema = z.object({
  title: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
  description: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
  short_description: z.string().min(10, { message: "A descrição curta deve ter pelo menos 10 caracteres" }),
  image_url: z.string().url({ message: "Forneça uma URL válida para a imagem" }),
  price: z.coerce.number().positive({ message: "O preço deve ser um valor positivo" }),
  duration: z.string().min(1, { message: "A duração é obrigatória" }),
  category: z.string().min(1, { message: "A categoria é obrigatória" }),
  max_participants: z.coerce.number().min(1, { message: "Número máximo de participantes é obrigatório"}),
  min_participants: z.coerce.number().min(1, { message: "Número mínimo de participantes é obrigatório"}),
  difficulty: z.string().optional(),
  rating: z.coerce.number().min(0).max(5, { message: "A avaliação deve estar entre 0 e 5" }),
  meeting_point: z.string().optional(),
  schedule: z.string().optional(),
  includes: z.string().optional(),
  excludes: z.string().optional(),
  notes: z.string().optional(),
  gallery_images: z.string().optional(),
});

export type TourFormValues = z.infer<typeof tourFormSchema>;

export const tourCategories = [
  "barco",
  "mergulho",
  "trilha",
  "histórico",
  "natureza",
  "aventura",
  "contemplação",
  "terrestre",
];

export const difficultyLevels = [
  "fácil",
  "moderado",
  "difícil",
  "extremo"
];
