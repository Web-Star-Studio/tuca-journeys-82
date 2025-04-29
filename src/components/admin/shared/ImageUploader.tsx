
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Image, X, Upload, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface ImageUploaderProps {
  currentImage?: string;
  currentImages?: string[];
  onImageUploaded: (url: string) => void;
  onImagesUploaded?: (urls: string[]) => void;
  folder?: string;
  multiple?: boolean;
  maxImages?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImage = "",
  currentImages = [],
  onImageUploaded,
  onImagesUploaded,
  folder = "uploads",
  multiple = false,
  maxImages = 10
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>(
    multiple ? currentImages : currentImage ? [currentImage] : []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Check if we're exceeding the maximum number of images (for multiple mode)
    if (multiple && previewUrls.length + files.length > maxImages) {
      toast.error(`Você pode enviar no máximo ${maxImages} imagens.`);
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Generate a unique filename to avoid overwriting
        const fileExt = file.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        // Upload the file to Supabase Storage
        const { data, error } = await supabase.storage
          .from("public")
          .upload(filePath, file);

        if (error) {
          console.error("Error uploading file:", error);
          throw error;
        }

        // Get the public URL of the uploaded file
        const { data: urlData } = supabase.storage
          .from("public")
          .getPublicUrl(filePath);

        return urlData.publicUrl;
      });

      const newUrls = await Promise.all(uploadPromises);

      if (multiple) {
        const allUrls = [...previewUrls, ...newUrls];
        setPreviewUrls(allUrls);
        if (onImagesUploaded) {
          onImagesUploaded(allUrls);
        }
      } else {
        // For single image mode, replace the current image
        setPreviewUrls([newUrls[0]]);
        onImageUploaded(newUrls[0]);
      }

      toast.success(
        multiple
          ? `${newUrls.length} imagens enviadas com sucesso`
          : "Imagem enviada com sucesso"
      );
    } catch (error) {
      console.error("Error uploading image(s):", error);
      toast.error("Erro ao fazer upload da imagem. Tente novamente.");
    } finally {
      setUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (indexToRemove: number) => {
    const newUrls = previewUrls.filter((_, index) => index !== indexToRemove);
    setPreviewUrls(newUrls);
    
    if (multiple && onImagesUploaded) {
      onImagesUploaded(newUrls);
    } else if (!multiple) {
      onImageUploaded("");
    }
  };

  return (
    <div className="space-y-4">
      {/* Image preview area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {previewUrls.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="relative rounded-md overflow-hidden border border-gray-300 h-40"
          >
            <img
              src={url}
              alt={`Upload preview ${index}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1"
              title="Remover imagem"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {/* Upload button / placeholder (show if we're under the limit for multiple mode) */}
        {(!multiple || previewUrls.length < maxImages) && (
          <button
            type="button"
            onClick={openFileDialog}
            disabled={uploading}
            className="flex flex-col items-center justify-center border-2 border-dashed 
                     border-gray-300 rounded-md h-40 hover:border-gray-400
                     transition-colors"
          >
            {uploading ? (
              <>
                <Loader2 className="animate-spin h-6 w-6 text-primary mb-2" />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Upload className="h-6 w-6 text-gray-500 mb-2" />
                <span>Clique para enviar</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        multiple={multiple}
      />
    </div>
  );
};

export default ImageUploader;
