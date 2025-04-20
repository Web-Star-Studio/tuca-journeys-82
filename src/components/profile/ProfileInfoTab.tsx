
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useProfile } from "@/hooks/use-profile";
import { Loader2 } from "lucide-react";

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  bio: string;
}

const ProfileInfoTab = () => {
  const { profile, updateProfile } = useProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      address: profile?.address || "",
      city: profile?.city || "",
      state: profile?.state || "",
      zipCode: profile?.zip_code || "",
      country: profile?.country || "Brasil",
      bio: profile?.bio || "",
    },
  });
  
  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    
    try {
      await updateProfile({
        ...profile,
        name: data.name,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        zip_code: data.zipCode,
        country: data.country,
        bio: data.bio,
      });
      
      toast.success("Perfil atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Não foi possível atualizar seu perfil");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  {...register("name", {
                    required: "Nome é obrigatório",
                  })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  disabled
                  {...register("email")}
                />
                <p className="text-xs text-gray-500">
                  O email não pode ser alterado
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                {...register("phone", {
                  pattern: {
                    value: /^(\+\d{1,3})?\s?\(?\d{2,3}\)?[\s.-]?\d{4,5}[\s.-]?\d{4}$/,
                    message: "Formato de telefone inválido",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Endereço</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                {...register("address")}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  {...register("city")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  {...register("state")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="zipCode">CEP</Label>
                <Input
                  id="zipCode"
                  {...register("zipCode", {
                    pattern: {
                      value: /^\d{5}-?\d{3}$/,
                      message: "Formato de CEP inválido",
                    },
                  })}
                />
                {errors.zipCode && (
                  <p className="text-sm text-red-500">{errors.zipCode.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">País</Label>
              <Input
                id="country"
                {...register("country")}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Sobre você</h3>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Biografia</Label>
            <Textarea
              id="bio"
              placeholder="Conte um pouco sobre você..."
              className="min-h-[120px]"
              {...register("bio")}
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            "Salvar Alterações"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProfileInfoTab;
