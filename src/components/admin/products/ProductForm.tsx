
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

// Product type (simplified)
interface Product {
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
}

// Form schema for validation
const productFormSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  description: z.string().min(10, { message: "A descrição deve ter pelo menos 10 caracteres" }),
  image_url: z.string().url({ message: "Forneça uma URL válida para a imagem" }),
  price: z.coerce.number().positive({ message: "O preço deve ser um valor positivo" }),
  category: z.string().min(1, { message: "A categoria é obrigatória" }),
  stock: z.coerce.number().int().min(0, { message: "Estoque não pode ser negativo" }),
  status: z.enum(["active", "out_of_stock", "discontinued"]),
  weight: z.coerce.number().optional(),
  dimensions: z.string().optional(),
  gallery: z.string().optional(),
  featured: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  productId?: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ 
  productId, 
  onSuccess, 
  onCancel 
}) => {
  const [previewUrl, setPreviewUrl] = useState("");
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
      gallery: "",
      featured: false,
    },
  });

  // Mock function to get product
  const getProduct = async (id: number) => {
    // In a real app, this would be a database call
    const products = [
      {
        id: 1,
        name: "Camiseta Noronha",
        image_url: "/product-tshirt.jpg",
        description: "Camiseta 100% algodão com estampa de Fernando de Noronha",
        category: "Vestuário",
        price: 89.90,
        stock: 45,
        status: "active",
        weight: 0.3,
        dimensions: "30x20x5",
        gallery: ["/product-tshirt-back.jpg", "/product-tshirt-detail.jpg"],
        featured: true
      }
    ];
    
    return products.find(p => p.id === id);
  };
  
  // Mock function to create product
  const createProduct = async (product: Omit<Product, "id">) => {
    // In a real app, this would be a database call
    console.log("Creating product:", product);
    return { ...product, id: Math.floor(Math.random() * 1000) };
  };
  
  // Mock function to update product
  const updateProduct = async (product: Product) => {
    // In a real app, this would be a database call
    console.log("Updating product:", product);
    return product;
  };

  // Fetch product data when editing
  useEffect(() => {
    const loadProductData = async () => {
      if (productId) {
        try {
          const product = await getProduct(productId);
          if (product) {
            form.reset({
              name: product.name,
              description: product.description,
              image_url: product.image_url,
              price: product.price,
              category: product.category,
              stock: product.stock,
              status: product.status as "active" | "out_of_stock" | "discontinued",
              weight: product.weight,
              dimensions: product.dimensions,
              gallery: product.gallery?.join("\n") || "",
              featured: product.featured,
            });
            setPreviewUrl(product.image_url);
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

  // Update image preview
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.image_url) {
        setPreviewUrl(value.image_url);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Form submission
  const onSubmit = async (data: ProductFormValues) => {
    // Convert string lists to arrays
    const formattedData = {
      ...data,
      gallery: data.gallery ? data.gallery.split("\n").map(item => item.trim()).filter(Boolean) : [],
    };

    try {
      if (productId) {
        // Update existing product
        await updateProduct({ ...formattedData, id: productId });
        toast({
          title: "Sucesso",
          description: "Produto atualizado com sucesso.",
        });
      } else {
        // Create new product
        await createProduct(formattedData);
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
                  <FormLabel>URL da Imagem Principal</FormLabel>
                  <FormControl>
                    <Input placeholder="URL da imagem principal" {...field} />
                  </FormControl>
                  <FormMessage />
                  {previewUrl && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-1">Preview:</p>
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="rounded-md h-40 object-cover"
                        onError={() => setPreviewUrl("")}
                      />
                    </div>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gallery"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Galeria de Imagens (uma URL por linha)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="https://exemplo.com/imagem1.jpg&#10;https://exemplo.com/imagem2.jpg&#10;..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Adicione URLs de imagens adicionais para a galeria, uma por linha
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
