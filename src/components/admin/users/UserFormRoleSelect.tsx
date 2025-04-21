
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface UserFormRoleSelectProps {
  form: any;
  fieldValue: string;
  setPartnerType: () => void;
}

const UserFormRoleSelect: React.FC<UserFormRoleSelectProps> = ({ form, fieldValue, setPartnerType }) => (
  <FormField
    control={form.control}
    name="role"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Função</FormLabel>
        <Select
          onValueChange={value => {
            field.onChange(value);
            setPartnerType();
          }}
          value={fieldValue}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="admin">Administrador</SelectItem>
            <SelectItem value="partner">Parceiro</SelectItem>
            <SelectItem value="customer">Cliente</SelectItem>
          </SelectContent>
        </Select>
        <FormDescription>
          Administradores têm acesso ao painel de controle<br />
          Parceiros acessam o painel de parceiros
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default UserFormRoleSelect;
