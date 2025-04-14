
import React, { useState, useRef } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImageUrl?: string;
  width?: string;
  height?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUploaded,
  currentImageUrl,
  width = "100%",
  height = "240px",
  className = "",
}) => {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  const uploadImage = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('O arquivo deve ser uma imagem');
      toast({
        title: "Erro de upload",
        description: "O arquivo selecionado não é uma imagem",
        variant: "destructive",
      });
      return;
    }

    // Limit file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter menos de 5MB');
      toast({
        title: "Erro de upload",
        description: "A imagem é muito grande (limite de 5MB)",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Create a unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      // Update preview and notify parent
      setPreviewUrl(urlData.publicUrl);
      onImageUploaded(urlData.publicUrl);

      toast({
        title: "Upload concluído",
        description: "A imagem foi carregada com sucesso",
      });
    } catch (error: any) {
      console.error("Error uploading image:", error);
      setError('Erro ao fazer upload da imagem');
      toast({
        title: "Erro de upload",
        description: error.message || "Falha ao carregar a imagem",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageUploaded("");
  };

  const clickToUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`
          relative 
          border-2 
          border-dashed 
          rounded-lg 
          ${dragging ? 'border-primary bg-primary/10' : 'border-gray-300 bg-gray-50'} 
          ${previewUrl ? 'p-0' : 'p-4'} 
          transition-colors 
          duration-200
        `}
        style={{ width, height, overflow: 'hidden' }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={!previewUrl ? clickToUpload : undefined}
      >
        {uploading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-10">
            <Loader2 className="h-10 w-10 text-white animate-spin mb-2" />
            <p className="text-white">Enviando imagem...</p>
          </div>
        )}
        
        {previewUrl ? (
          <div className="relative h-full">
            <img 
              src={previewUrl} 
              alt="Imagem carregada" 
              className="w-full h-full object-cover" 
            />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-2 cursor-pointer">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">
              Arraste uma imagem ou clique para selecionar
            </p>
            <p className="text-xs text-gray-400">
              PNG, JPG ou GIF (máximo 5MB)
            </p>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            <Button 
              type="button" 
              variant="outline" 
              className="mt-2" 
              disabled={uploading}
            >
              Escolher arquivo
            </Button>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
