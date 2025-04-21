
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface UserFormStatusFieldProps {
  form: any;
}

const UserFormStatusField: React.FC<UserFormStatusFieldProps> = ({ form }) => (
  <FormField
    control={form.control}
    name="status"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Status</FormLabel>
        <Select
          onValueChange={field.onChange}
          value={field.value}
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
);

export default UserFormStatusField;
