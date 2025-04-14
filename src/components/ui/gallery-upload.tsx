
import React, { useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';
import ImageUpload from "./image-upload";

interface GalleryUploadProps {
  onImagesChange: (urls: string[]) => void;
  initialImages?: string[];
  maxImages?: number;
}

const GalleryUpload: React.FC<GalleryUploadProps> = ({
  onImagesChange,
  initialImages = [],
  maxImages = 5,
}) => {
  const [images, setImages] = useState<string[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleImageUploaded = (url: string, index: number) => {
    if (url) {
      const newImages = [...images];
      newImages[index] = url;
      setImages(newImages);
      onImagesChange(newImages.filter(Boolean));
    } else {
      // Remove image if URL is empty (image removed)
      handleRemoveImage(index);
    }
  };

  const handleAddImage = () => {
    if (images.length < maxImages) {
      setImages([...images, ""]);
    } else {
      toast({
        title: "Limite atingido",
        description: `Máximo de ${maxImages} imagens permitidas`,
        variant: "destructive",
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages.filter(Boolean));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <ImageUpload
              currentImageUrl={image}
              onImageUploaded={(url) => handleImageUploaded(url, index)}
              width="100%"
              height="160px"
            />
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2"
              onClick={() => handleRemoveImage(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        {images.length < maxImages && (
          <Button
            type="button"
            variant="outline"
            className="h-[160px] w-full flex flex-col items-center justify-center border-2 border-dashed"
            onClick={handleAddImage}
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>
                <Plus className="h-6 w-6 mb-2" />
                <span>Adicionar imagem</span>
              </>
            )}
          </Button>
        )}
      </div>
      
      {maxImages > 0 && (
        <p className="text-sm text-muted-foreground">
          {images.filter(Boolean).length} de {maxImages} imagens
        </p>
      )}
    </div>
  );
};

export default GalleryUpload;
