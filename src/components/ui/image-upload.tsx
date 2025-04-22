
import React, { useState, useRef } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileStorageService } from "@/services/file-storage-service";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImageUrl?: string;
  width?: string;
  height?: string;
  className?: string;
  maxSizeMB?: number; 
  bucket?: string;
  allowedFileTypes?: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUploaded,
  currentImageUrl,
  width = "100%",
  height = "240px",
  className = "",
  maxSizeMB = 5,
  bucket = "product-images",
  allowedFileTypes = ["image/jpeg", "image/png", "image/gif"]
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
    // Reset error state
    setError(null);
    setUploading(true);
    
    try {
      // Use the improved FileStorageService
      const result = await FileStorageService.uploadFile(file, bucket, {
        validateType: true,
        allowedTypes: allowedFileTypes,
        maxSize: maxSizeMB * 1024 * 1024,
        customName: `upload-${uuidv4().substring(0, 8)}`
      });
      
      if (!result) {
        throw new Error("Upload falhou");
      }
      
      // Update preview and notify parent
      setPreviewUrl(result.url);
      onImageUploaded(result.url);

      toast({
        title: "Upload concluído",
        description: "A imagem foi carregada com sucesso",
      });
    } catch (error: any) {
      console.error("Error uploading image:", error);
      setError(error.message || 'Erro ao fazer upload da imagem');
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
              {allowedFileTypes.map(type => type.replace('image/', '').toUpperCase()).join(', ')} (máximo {maxSizeMB}MB)
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
        accept={allowedFileTypes.join(',')}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
