
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface UserFormPartnerTypeFieldProps {
  form: any;
}

const UserFormPartnerTypeField: React.FC<UserFormPartnerTypeFieldProps> = ({ form }) => (
  <FormField
    control={form.control}
    name="partnerBusinessType"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Categoria do Parceiro</FormLabel>
        <Select onValueChange={field.onChange} value={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="accommodation">Hospedagem</SelectItem>
            <SelectItem value="tour">Passeio</SelectItem>
            <SelectItem value="event">Evento</SelectItem>
            <SelectItem value="vehicle">Aluguel de Veículo</SelectItem>
            <SelectItem value="restaurant">Restaurante</SelectItem>
            <SelectItem value="product">Produto</SelectItem>
            <SelectItem value="service">Outro Serviço</SelectItem>
          </SelectContent>
        </Select>
        <FormDescription>
          Selecione o tipo de serviço do parceiro
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default UserFormPartnerTypeField;
