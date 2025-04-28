
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { User, UserRole, UserStatus } from "@/components/admin/users/types";

// Form schema for validation
const userFormSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  role: z.enum(["admin", "customer", "partner", "master"]),
  status: z.enum(["active", "inactive"]),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .or(z.literal("")),
  avatar: z.string().url({ message: "Forneça uma URL válida para o avatar" }).or(z.literal("")),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  userId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ 
  userId, 
  onSuccess, 
  onCancel 
}) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(userId ? true : false);

  // Initialize form
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "customer",
      status: "active",
      password: "",
      avatar: "",
    },
  });

  // Mock function to get user
  const getUser = async (id: string): Promise<User | null> => {
    // In a real app, this would be a database call
    const users = [
      {
        id: "1",
        name: "Maria Silva",
        email: "maria@example.com",
        role: "customer",
        status: "active",
        created_at: "2023-06-15",
        avatar: null,
      },
      {
        id: "2",
        name: "João Oliveira",
        email: "joao@example.com",
        role: "customer",
        status: "active",
        created_at: "2023-07-22",
        avatar: null,
      },
      {
        id: "3",
        name: "Ana Souza",
        email: "ana@example.com",
        role: "admin",
        status: "active",
        created_at: "2023-05-10",
        avatar: null,
      }
    ];

    const user = users.find(u => u.id === id);
    return user || null;
  };

  // Mock function to create user
  const createUser = async (user: Omit<User, "id" | "created_at">) => {
    // In a real app, this would be a database call
    console.log("Creating user:", user);
    return { 
      ...user, 
      id: Math.floor(Math.random() * 1000).toString(), 
      created_at: new Date().toISOString() 
    };
  };

  // Mock function to update user
  const updateUser = async (user: Partial<User> & { id: string }) => {
    // In a real app, this would be a database call
    console.log("Updating user:", user);
    return user;
  };

  // Fetch user data when editing
  useEffect(() => {
    const loadUserData = async () => {
      if (userId) {
        try {
          const user = await getUser(userId);
          if (user) {
            form.reset({
              name: user.name,
              email: user.email,
              role: user.role as UserRole,
              status: user.status as UserStatus,
              password: "", // Don't show password
              avatar: user.avatar || "",
            });
            if (user.avatar) {
              setPreviewUrl(user.avatar);
            }
          }
        } catch (error) {
          console.error("Error loading user:", error);
          toast({
            title: "Erro",
            description: "Não foi possível carregar os dados do usuário.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadUserData();
  }, [userId, form, toast]);

  // Update avatar preview
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.avatar) {
        setPreviewUrl(value.avatar);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Form submission
  const onSubmit = async (data: UserFormValues) => {
    try {
      if (userId) {
        // Update existing user
        const updateData: Partial<User> & { id: string } = {
          id: userId,
          name: data.name,
          email: data.email,
          role: data.role,
          status: data.status,
          avatar: data.avatar || null,
        };
        
        // Only include password if it was provided
        if (data.password) {
          console.log("Password will be updated");
        }
        
        await updateUser(updateData);
        toast({
          title: "Sucesso",
          description: "Usuário atualizado com sucesso.",
        });
      } else {
        // Create new user
        if (!data.password) {
          form.setError("password", { 
            type: "required", 
            message: "Senha é obrigatória para novos usuários" 
          });
          return;
        }
        
        const newUser = {
          name: data.name,
          email: data.email,
          role: data.role,
          status: data.status,
          avatar: data.avatar || null,
        };
        
        await createUser(newUser);
        toast({
          title: "Sucesso",
          description: "Novo usuário criado com sucesso.",
        });
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving user:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o usuário. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Carregando dados do usuário...</span>
      </div>
    );
  }

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
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@exemplo.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{userId ? "Nova Senha (opcional)" : "Senha"}</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={userId ? "Deixe em branco para manter a senha atual" : "Senha"} 
                      type="password" 
                      {...field} 
                    />
                  </FormControl>
                  {userId && (
                    <FormDescription>
                      Preencha apenas se desejar alterar a senha existente
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL do Avatar (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="URL do avatar" {...field} />
                  </FormControl>
                  <FormDescription>
                    Deixe em branco para usar avatar padrão do sistema
                  </FormDescription>
                  <FormMessage />
                  {previewUrl && (
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground mb-1">Preview:</p>
                      <img
                        src={previewUrl}
                        alt="Avatar preview"
                        className="rounded-full h-20 w-20 object-cover"
                        onError={() => setPreviewUrl("")}
                      />
                    </div>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Função</FormLabel>
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
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="customer">Cliente</SelectItem>
                      <SelectItem value="partner">Parceiro</SelectItem>
                      <SelectItem value="master">Master</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Administradores têm acesso ao painel de controle
                  </FormDescription>
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
                      <SelectItem value="inactive">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Usuários inativos não podem fazer login
                  </FormDescription>
                  <FormMessage />
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
            {userId ? "Atualizar Usuário" : "Criar Usuário"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
