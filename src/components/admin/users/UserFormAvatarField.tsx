
import React, { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload, ImagePlus, Link } from "lucide-react";
import { FileStorageService } from "@/services/file-storage-service";
import { useToast } from "@/hooks/use-toast";

interface UserFormAvatarFieldProps {
  form: any;
  previewUrl: string;
  setPreviewUrl: (url: string) => void;
  userId?: string;
}

const UserFormAvatarField: React.FC<UserFormAvatarFieldProps> = ({ 
  form, 
  previewUrl, 
  setPreviewUrl,
  userId 
}) => {
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Tipo de arquivo inválido",
        description: "Por favor, selecione uma imagem",
        variant: "destructive"
      });
      return;
    }

    // Validar tamanho (2MB máximo)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 2MB",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);
      // Fazer upload usando FileStorageService
      const result = await FileStorageService.uploadFile(file, 'avatars', userId);
      
      if (result) {
        // Atualizar campo de formulário e preview
        form.setValue('avatar', result.url);
        setPreviewUrl(result.url);
        toast({
          title: "Upload concluído",
          description: "Imagem carregada com sucesso",
        });
      } else {
        toast({
          title: "Erro no upload",
          description: "Não foi possível carregar a imagem",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      toast({
        title: "Erro no upload",
        description: "Ocorreu um erro ao enviar o arquivo",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <FormField
      control={form.control}
      name="avatar"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Avatar (opcional)</FormLabel>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Button 
                type="button" 
                variant={uploadMode === 'url' ? "default" : "outline"} 
                size="sm"
                onClick={() => setUploadMode('url')}
              >
                <Link className="w-4 h-4 mr-2" />
                URL
              </Button>
              <Button 
                type="button" 
                variant={uploadMode === 'file' ? "default" : "outline"} 
                size="sm"
                onClick={() => setUploadMode('file')}
              >
                <ImagePlus className="w-4 h-4 mr-2" />
                Arquivo
              </Button>
            </div>

            {uploadMode === 'url' ? (
              <FormControl>
                <Input
                  placeholder="URL do avatar"
                  {...field}
                  onBlur={(e) => setPreviewUrl(e.target.value)}
                  onChange={e => {
                    field.onChange(e);
                    setPreviewUrl(e.target.value);
                  }}
                />
              </FormControl>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isUploading}
                  className="w-full"
                  asChild
                >
                  <label className="cursor-pointer flex items-center justify-center">
                    {isUploading ? (
                      <>Enviando...</>
                    ) : (
                      <>
                        <FileUpload className="w-4 h-4 mr-2" />
                        Escolher arquivo
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={isUploading}
                    />
                  </label>
                </Button>
              </div>
            )}
            
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
          </div>
        </FormItem>
      )}
    />
  );
};

export default UserFormAvatarField;
