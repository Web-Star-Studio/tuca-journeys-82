
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/product";
import { supabase } from "@/lib/supabase";
import ImageUpload from "@/components/ui/image-upload";
import GalleryUpload from "@/components/ui/gallery-upload";

// Form schema for validation
const productFormSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  description: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
  image_url: z.string().min(1, { message: "A imagem é obrigatória" }),
  price: z.coerce.number().positive({ message: "O preço deve ser um valor positivo" }),
  category: z.string().min(1, { message: "A categoria é obrigatória" }),
  stock: z.coerce.number().int().min(0, { message: "Estoque não pode ser negativo" }),
  status: z.enum(["active", "out_of_stock", "discontinued"]),
  weight: z.coerce.number().optional(),
  dimensions: z.string().optional(),
  gallery: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  productId?: number;
  onSuccess: () => void;
  onCancel: () => void;
}

interface ProductData {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  category: string;
  stock: number;
  status: string;
  weight?: number;
  dimensions?: string;
  gallery?: string[];
  featured?: boolean;
  created_at: string;
  updated_at: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({ 
  productId, 
  onSuccess, 
  onCancel 
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(productId ? true : false);

  // Initialize form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      image_url: "",
      price: 0,
      category: "",
      stock: 0,
      status: "active",
      weight: undefined,
      dimensions: "",
      gallery: [],
      featured: false,
    },
  });

  // Fetch product data when editing
  useEffect(() => {
    const loadProductData = async () => {
      if (productId) {
        try {
          setIsLoading(true);
          const { data: product, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();
            
          if (error) {
            throw error;
          }
          
          if (product) {
            const productData = product as ProductData;
            form.reset({
              name: productData.name,
              description: productData.description,
              image_url: productData.image_url || "",
              price: productData.price,
              category: productData.category,
              stock: productData.stock,
              status: productData.status as "active" | "out_of_stock" | "discontinued",
              weight: productData.weight,
              dimensions: productData.dimensions || "",
              gallery: productData.gallery || [],
              featured: productData.featured || false,
            });
          }
        } catch (error) {
          console.error("Error loading product:", error);
          toast({
            title: "Erro",
            description: "Não foi possível carregar os dados do produto.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadProductData();
  }, [productId, form, toast]);

  // Handle image upload
  const handleImageUploaded = (url: string) => {
    form.setValue("image_url", url);
  };

  // Handle gallery images changes
  const handleGalleryChange = (urls: string[]) => {
    form.setValue("gallery", urls);
  };

  // Form submission
  const onSubmit = async (data: ProductFormValues) => {
    try {
      // Ensure all required fields are present
      const productData = {
        name: data.name,
        description: data.description,
        image_url: data.image_url,
        price: data.price,
        category: data.category,
        stock: data.stock,
        status: data.status,
        weight: data.weight,
        dimensions: data.dimensions,
        gallery: data.gallery,
        featured: data.featured
      };
      
      if (productId) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', productId);
          
        if (error) throw error;
        
        toast({
          title: "Sucesso",
          description: "Produto atualizado com sucesso.",
        });
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert(productData);
          
        if (error) throw error;
        
        toast({
          title: "Sucesso",
          description: "Novo produto criado com sucesso.",
        });
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o produto. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Carregando dados do produto...</span>
      </div>
    );
  }

  const productCategories = [
    "Vestuário",
    "Acessórios",
    "Souvenirs",
    "Livros",
    "Praia",
    "Decoração",
    "Artesanato",
    "Alimentação",
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descrição detalhada do produto"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço (R$)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estoque</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {productCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="out_of_stock">Sem Estoque</SelectItem>
                        <SelectItem value="discontinued">Descontinuado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem Principal</FormLabel>
                  <FormControl>
                    <ImageUpload
                      onImageUploaded={handleImageUploaded}
                      currentImageUrl={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gallery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Galeria de Imagens</FormLabel>
                  <FormControl>
                    <GalleryUpload
                      onImagesChange={handleGalleryChange}
                      initialImages={field.value || []}
                      maxImages={5}
                    />
                  </FormControl>
                  <FormDescription>
                    Adicione até 5 imagens adicionais para a galeria
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peso (kg)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        min="0"
                        placeholder="Ex: 0.5" 
                        {...field} 
                        value={field.value === undefined ? '' : field.value}
                        onChange={(e) => {
                          const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dimensions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dimensões (AxLxP cm)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: 10x5x2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-1"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Produto em Destaque</FormLabel>
                    <FormDescription>
                      Marque esta opção para exibir o produto na seção de destaque na loja
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {productId ? "Atualizar Produto" : "Criar Produto"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
