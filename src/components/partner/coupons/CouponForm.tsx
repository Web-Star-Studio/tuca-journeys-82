
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

interface CouponFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
  initialData?: z.infer<typeof formSchema>;
  isSubmitting: boolean;
}

const formSchema = z.object({
  code: z
    .string()
    .min(3, { message: "O código deve ter pelo menos 3 caracteres" })
    .max(20, { message: "O código não deve ultrapassar 20 caracteres" }),
  discount_percentage: z
    .number()
    .min(1, { message: "O desconto deve ser pelo menos 1%" })
    .max(100, { message: "O desconto não pode ser maior que 100%" }),
  valid_from: z.date({
    required_error: "A data de início é obrigatória",
  }),
  valid_until: z.date({
    required_error: "A data de término é obrigatória",
  }),
  min_purchase_amount: z
    .number()
    .min(0, { message: "O valor mínimo não pode ser negativo" })
    .nullable()
    .optional(),
  max_uses: z
    .number()
    .min(0, { message: "O número máximo de usos não pode ser negativo" })
    .nullable()
    .optional(),
  description: z
    .string()
    .max(500, { message: "A descrição não pode ultrapassar 500 caracteres" })
    .nullable()
    .optional(),
  applicable_to: z.array(z.string()).optional(),
});

const CouponForm = ({
  onSubmit,
  initialData,
  isSubmitting,
}: CouponFormProps) => {
  const defaultValues = initialData
    ? initialData
    : {
        code: "",
        discount_percentage: 10,
        valid_from: new Date(),
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        min_purchase_amount: null,
        max_uses: null,
        description: "",
        applicable_to: [],
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(values);
      if (!initialData) {
        form.reset();
      }
    } catch (error) {
      console.error("Erro ao submeter cupom:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código do Cupom*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: VERAO2025"
                    {...field}
                    className="uppercase"
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                  />
                </FormControl>
                <FormDescription>
                  Código que o cliente usará para aplicar o desconto
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="discount_percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Porcentagem de Desconto*</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="10"
                      min={1}
                      max={100}
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value))
                      }
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      %
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Valor percentual do desconto (1-100)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="valid_from"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Válido a partir de*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="valid_until"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Válido até*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() ||
                        (form.getValues("valid_from") &&
                          date < form.getValues("valid_from"))
                      }
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="min_purchase_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor Mínimo de Compra</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      R$
                    </span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      min={0}
                      step="0.01"
                      className="pl-9"
                      value={field.value === null ? "" : field.value}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? null
                            : Number(e.target.value)
                        )
                      }
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Valor mínimo da compra para aplicar o cupom (opcional)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="max_uses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número Máximo de Usos</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ilimitado"
                    min={0}
                    value={field.value === null ? "" : field.value}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? null
                          : Number(e.target.value)
                      )
                    }
                  />
                </FormControl>
                <FormDescription>
                  Limite de usos do cupom (opcional)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva detalhes sobre o cupom e suas restrições"
                  {...field}
                  value={field.value || ""}
                  className="h-24"
                />
              </FormControl>
              <FormDescription>
                Informações adicionais sobre o cupom (opcional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={() => form.reset()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : initialData ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CouponForm;
