
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ActivityFormValues } from "./ActivityForm";
import { Slider } from "@/components/ui/slider";

interface ActivityDetailsFormProps {
  form: UseFormReturn<ActivityFormValues>;
}

const ActivityDetailsForm: React.FC<ActivityDetailsFormProps> = ({
  form,
}) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="rating"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Avaliação ({field.value})</FormLabel>
            <FormControl>
              <div className="flex items-center gap-4">
                <Slider
                  defaultValue={[field.value]}
                  max={5}
                  step={0.1}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="flex-1"
                />
                <Input 
                  type="number"
                  {...field}
                  className="w-16"
                  min={0}
                  max={5}
                  step={0.1}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    field.onChange(isNaN(value) ? 0 : Math.min(5, Math.max(0, value)));
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ActivityDetailsForm;
