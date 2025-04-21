
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface UserFormFieldsProps {
  form: any;
  userId?: string;
}

const UserFormFields: React.FC<UserFormFieldsProps> = ({ form, userId }) => (
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
);

export default UserFormFields;
