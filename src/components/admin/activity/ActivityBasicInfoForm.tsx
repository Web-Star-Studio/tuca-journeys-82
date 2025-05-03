
import React from "react";
import { ActivityFormValues } from "../../../components/admin/activity/ActivityForm";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ACTIVITY_CATEGORIES, ACTIVITY_DIFFICULTY_LEVELS } from "@/types/activity";

interface ActivityBasicInfoFormProps {
  form: UseFormReturn<ActivityFormValues>;
}

const ActivityBasicInfoForm: React.FC<ActivityBasicInfoFormProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Passeio de Barco na Ilha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ACTIVITY_CATEGORIES.filter(cat => cat !== "Todos").map((category) => (
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
      </div>

      <FormField
        control={form.control}
        name="short_description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição Curta</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Breve descrição da atividade (exibida nos cartões)"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Máximo 150 caracteres. Será exibida nos cartões e listagens.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição Completa</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Descrição detalhada da atividade"
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço (R$)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duração</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 2 horas" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nível de Dificuldade</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ACTIVITY_DIFFICULTY_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="meeting_point"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ponto de Encontro</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Porto de Santo Antônio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="min_participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Participantes Mínimo</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  placeholder="1"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="max_participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Participantes Máximo</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  placeholder="10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="rating"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Avaliação (0 a 5)</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="5"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ActivityBasicInfoForm;
