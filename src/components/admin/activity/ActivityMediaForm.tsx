
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ActivityFormValues } from "../../../components/admin/activity/ActivityForm";

interface ActivityMediaFormProps {
  form: UseFormReturn<ActivityFormValues>;
  previewUrl: string;
  setPreviewUrl: (url: string) => void;
}

const ActivityMediaForm: React.FC<ActivityMediaFormProps> = ({
  form,
  previewUrl,
  setPreviewUrl,
}) => {
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setValue("image_url", value);
    setPreviewUrl(value);
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="image_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL da Imagem Principal</FormLabel>
            <FormControl>
              <Input
                placeholder="URL da imagem principal"
                {...field}
                onChange={handleMainImageChange}
              />
            </FormControl>
            <FormMessage />
            {previewUrl && (
              <div className="mt-2 rounded-md overflow-hidden border">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gallery_images"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URLs das Imagens da Galeria</FormLabel>
            <FormControl>
              <Input
                placeholder="URLs separadas por vírgula"
                {...field}
              />
            </FormControl>
            <FormMessage />
            <p className="text-xs text-muted-foreground mt-1">
              Insira URLs separadas por vírgula. Ex: url1,url2,url3
            </p>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ActivityMediaForm;
