import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { User, UserRole, UserStatus } from "@/components/admin/users/types";
import UserFormFields from "./UserFormFields";
import UserFormAvatarField from "./UserFormAvatarField";
import UserFormRoleSelect from "./UserFormRoleSelect";
import UserFormPartnerTypeField from "./UserFormPartnerTypeField";
import UserFormStatusField from "./UserFormStatusField";
import { supabase } from "@/lib/supabase";
import { useSignUp } from "@/hooks/auth/use-sign-up";

// Schema remains the same
const userFormSchema = z.object({
  name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  role: z.enum(["admin", "customer", "partner"]),
  status: z.enum(["active", "inactive"]),
  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .or(z.literal("")),
  avatar: z.string().url({ message: "Forneça uma URL válida para o avatar" }).or(z.literal("")),
  partnerBusinessType: z
    .enum(["accommodation", "tour", "event", "vehicle", "product", "restaurant", "service"])
    .optional()
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
  const { signUp } = useSignUp();

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
      partnerBusinessType: undefined,
    },
  });

  // Fetch user data when editing (still mock for update)
  useEffect(() => {
    const loadUserData = async () => {
      if (userId) {
        try {
          // Real case should fetch from DB, kept mock for edit
          const users = [
            {
              id: "1",
              name: "Maria Silva",
              email: "maria@example.com",
              role: "customer" as UserRole,
              status: "active" as UserStatus,
              created_at: "2023-06-15",
              avatar: null,
            },
            {
              id: "2",
              name: "João Oliveira",
              email: "joao@example.com",
              role: "customer" as UserRole,
              status: "active" as UserStatus,
              created_at: "2023-07-22",
              avatar: null,
            },
            {
              id: "3",
              name: "Ana Souza",
              email: "ana@example.com",
              role: "admin" as UserRole,
              status: "active" as UserStatus,
              created_at: "2023-05-10",
              avatar: null,
            }
          ];
          const user = users.find(u => u.id === userId);
          if (user) {
            form.reset({
              name: user.name,
              email: user.email,
              role: user.role as UserRole,
              status: user.status as UserStatus,
              password: "",
              avatar: user.avatar || "",
              partnerBusinessType: undefined,
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

  // Handler to reset partner type when changing role
  const handleRoleChange = () => {
    if (form.getValues("role") !== "partner") {
      form.setValue("partnerBusinessType", undefined);
    }
  };

  // Submit: handle CREATE/UPDATE user
  const onSubmit = async (data: UserFormValues) => {
    setIsLoading(true);
    try {
      if (userId) {
        // Keep as mock update for now
        await new Promise(r => setTimeout(r, 800));
        toast({
          title: "Sucesso",
          description: "Usuário atualizado com sucesso.",
        });
      } else {
        if (!data.password) {
          form.setError("password", {
            type: "required",
            message: "Senha é obrigatória para novos usuários"
          });
          setIsLoading(false);
          return;
        }
        // Create user in Supabase Auth
        const { data: signUpData, error } = await signUp({
          email: data.email,
          password: data.password,
          name: data.name,
          role: data.role as UserRole
        });
        if (error) {
          toast({
            title: "Erro",
            description: error.message || "Erro ao criar usuário.",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        // Insert extra profile data: status, avatar (optional)
        if (signUpData?.user) {
          // Update profile
          await supabase.from('user_profiles').update({
            name: data.name,
            email: data.email,
            avatar_url: data.avatar || null,
            is_admin: data.role === "admin",
            is_partner: data.role === "partner",
            updated_at: new Date().toISOString()
          }).eq("id", signUpData.user.id);

          // Update user_roles with partnerType, if any
          if (data.role === "partner" && data.partnerBusinessType) {
            await supabase.from('user_roles')
              .update({ partner_type: data.partnerBusinessType })
              .eq("user_id", signUpData.user.id)
              .eq("role", "partner");
            // Also insert row in partners table
            await supabase.from('partners').insert({
              user_id: signUpData.user.id,
              business_name: data.name,
              business_type: data.partnerBusinessType,
              is_verified: false,
              is_active: true
            });
          }
        }
        toast({
          title: "Sucesso",
          description: "Novo usuário criado com sucesso.",
        });
      }
      onSuccess();
    } catch (error: any) {
      console.error("Error saving user:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o usuário. Tente novamente.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
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
          <UserFormFields form={form} userId={userId} />
          <div className="space-y-6">
            <UserFormAvatarField
              form={form}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
            />
            <UserFormRoleSelect
              form={form}
              fieldValue={form.watch('role')}
              setPartnerType={handleRoleChange}
            />
            {form.watch('role') === 'partner' && (
              <UserFormPartnerTypeField form={form} />
            )}
            <UserFormStatusField form={form} />
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
