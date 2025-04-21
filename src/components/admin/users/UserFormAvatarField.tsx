
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface UserFormAvatarFieldProps {
  form: any;
  previewUrl: string;
  setPreviewUrl: (url: string) => void;
}

const UserFormAvatarField: React.FC<UserFormAvatarFieldProps> = ({ form, previewUrl, setPreviewUrl }) => (
  <FormField
    control={form.control}
    name="avatar"
    render={({ field }) => (
      <FormItem>
        <FormLabel>URL do Avatar (opcional)</FormLabel>
        <FormControl>
          <Input placeholder="URL do avatar" {...field} />
        </FormControl>
        <FormDescription>
          Deixe em branco para usar avatar padrão do sistema
        </FormDescription>
        <FormMessage />
        {previewUrl && (
          <div className="mt-2">
            <p className="text-sm text-muted-foreground mb-1">Preview:</p>
            <img
              src={previewUrl}
              alt="Avatar preview"
              className="rounded-full h-20 w-20 object-cover"
              onError={() => setPreviewUrl("")}
            />
          </div>
        )}
      </FormItem>
    )}
  />
);

export default UserFormAvatarField;
