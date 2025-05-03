
import { z } from "zod";

// Define the field item schema for string-based arrays
const fieldItemSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().optional(),
  day: z.number().optional(),
});

// Define the itinerary item schema
const itineraryItemSchema = z.object({
  day: z.number(),
  title: z.string().min(1, "O título do dia é obrigatório"),
  description: z.string().min(1, "A descrição do dia é obrigatória"),
});

// Define the package schema
export const packageSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  image: z.string().min(1, "A imagem é obrigatória"),
  price: z.number().min(1, "O preço é obrigatório"),
  days: z.number().min(1, "A duração é obrigatória"),
  persons: z.number().min(1, "O número de pessoas é obrigatório"),
  rating: z.number().min(0).max(5).optional(),
  category: z.string().min(1, "A categoria é obrigatória"),
  includes: z.array(fieldItemSchema).min(1, "Inclua pelo menos um item"),
  excludes: z.array(fieldItemSchema).min(1, "Inclua pelo menos um item não incluído"),
  highlights: z.array(fieldItemSchema).min(1, "Inclua pelo menos um destaque"),
  itinerary: z.array(itineraryItemSchema).min(1, "Inclua pelo menos um dia no itinerário"),
  dates: z.array(fieldItemSchema).min(1, "Inclua pelo menos uma data disponível"),
});
