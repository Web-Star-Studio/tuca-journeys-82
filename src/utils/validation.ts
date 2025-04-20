
import { z } from "zod";

export const partnerFormSchema = z.object({
  business_name: z.string().min(2, "Nome do negócio deve ter pelo menos 2 caracteres"),
  business_type: z.enum([
    "accommodation",
    "tour",
    "vehicle",
    "event",
    "product",
    "restaurant",
    "service"
  ]),
  description: z.string().optional(),
  contact_email: z.string().email("Email inválido"),
  contact_phone: z.string().optional(),
  website: z.string().url("URL inválida").optional().or(z.literal("")),
  address: z.string().optional()
});

export type PartnerFormData = z.infer<typeof partnerFormSchema>;
