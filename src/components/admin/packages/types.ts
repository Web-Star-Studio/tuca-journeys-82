
import { z } from "zod";

// Define the field item schema for string-based arrays
const fieldItemSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().optional(),
  day: z.number().optional(),
});

// Define the itinerary item schema
const itineraryItemSchema = z.object({
  day: z.number().int().positive(),
  title: z.string().min(1, "O título do dia é obrigatório"),
  description: z.string().min(1, "A descrição do dia é obrigatória"),
});

// Define the package form schema
export const packageFormSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  image: z.string().url("URL da imagem inválida"),
  price: z.coerce.number().positive("O preço deve ser positivo"),
  days: z.coerce.number().int().positive("O número de dias deve ser positivo"),
  persons: z.coerce.number().int().positive("O número de pessoas deve ser positivo"),
  rating: z.coerce.number().min(0).max(5, "A avaliação deve estar entre 0 e 5"),
  category: z.string().min(1, "A categoria é obrigatória"),
  highlights: z.array(fieldItemSchema).min(1, "Adicione pelo menos um destaque"),
  includes: z.array(fieldItemSchema).min(1, "Adicione pelo menos um item incluído"),
  excludes: z.array(fieldItemSchema).min(1, "Adicione pelo menos um item não incluído"),
  itinerary: z.array(itineraryItemSchema).min(1, "Adicione pelo menos um dia no itinerário"),
  dates: z.array(fieldItemSchema).min(1, "Adicione pelo menos uma data disponível"),
});

// Infer types from the schema
export type PackageFormValues = z.infer<typeof packageFormSchema>;

// Itinerary item type
export type ItineraryItem = {
  day: number;
  title: string;
  description: string;
};

// Field item type
export type FieldItem = {
  title: string;
  description?: string;
  day?: number;
};
