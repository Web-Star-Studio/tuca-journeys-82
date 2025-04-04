
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/api";
import { PackageFormValues } from "@/components/admin/packages/types";

// Schema para validação do formulário de pacotes
const packageSchema = z.object({
  title: z.string().min(3, { message: "Título deve ter no mínimo 3 caracteres" }),
  description: z.string().min(10, { message: "Descrição deve ter no mínimo 10 caracteres" }),
  image: z.string().optional(),
  price: z.coerce.number().min(1, { message: "Preço deve ser maior que 0" }),
  days: z.coerce.number().min(1, { message: "Duração deve ser pelo menos 1 dia" }),
  persons: z.coerce.number().min(1, { message: "Capacidade deve ser pelo menos 1 pessoa" }),
  rating: z.coerce.number().min(1).max(5).optional(),
  category: z.string(),
  includes: z.array(z.string()).min(1, { message: "Adicione pelo menos um item incluído" }),
  highlights: z.array(z.string()).min(1, { message: "Adicione pelo menos um destaque" }),
  excludes: z.array(z.string()).min(1, { message: "Adicione pelo menos um item não incluído" }),
  itinerary: z.array(
    z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      day: z.number().optional(),
    })
  ).optional(),
  dates: z.array(z.string()).min(1, { message: "Adicione pelo menos uma data" }),
});

export const usePackageForm = (packageId: number | null) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  
  // Inicializa o formulário com valores padrão
  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      price: 0,
      days: 1,
      persons: 1,
      rating: 5,
      category: "aventura",
      includes: [""],
      highlights: [""],
      excludes: [""],
      itinerary: [{ title: "", description: "", day: 1 }],
      dates: [""],
    },
  });

  // Configura arrays para campos múltiplos
  const highlightsArray = useFieldArray({
    control: form.control,
    name: "highlights",
  });

  const includesArray = useFieldArray({
    control: form.control,
    name: "includes",
  });

  const excludesArray = useFieldArray({
    control: form.control,
    name: "excludes",
  });

  const itineraryArray = useFieldArray({
    control: form.control,
    name: "itinerary",
  });

  const datesArray = useFieldArray({
    control: form.control,
    name: "dates",
  });

  // Obtém os dados do pacote se estiver editando
  const { data: packageData, isLoading: isLoadingPackage } = useQuery({
    queryKey: ["package", packageId],
    queryFn: () => API.getPackageById(packageId!),
    enabled: !!packageId,
  });

  // Preenche o formulário com os dados do pacote quando carregados
  useEffect(() => {
    if (packageData) {
      form.reset(packageData);
      if (packageData.image) {
        setPreviewUrl(packageData.image);
      }
    }
  }, [packageData, form]);

  return {
    form,
    previewUrl,
    setPreviewUrl,
    isLoadingPackage,
    highlightsArray,
    includesArray,
    excludesArray,
    itineraryArray,
    datesArray
  };
};
