
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ActivityFormValues } from "./ActivityFormDialog";
import ImageUpload from "@/components/ui/image-upload";
import GalleryUpload from "@/components/ui/gallery-upload";

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
  const handleMainImageUploaded = (url: string) => {
    form.setValue("image_url", url);
    setPreviewUrl(url);
  };

  const handleGalleryImagesChange = (urls: string[]) => {
    form.setValue("gallery_images", urls.join(","));
  };

  const galleryImages = form.watch("gallery_images") || "";
  const galleryImagesArray = galleryImages.split(",").filter(Boolean);

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="image_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Imagem Principal</FormLabel>
            <FormControl>
              <ImageUpload 
                currentImageUrl={field.value}
                onImageUploaded={handleMainImageUploaded}
                height="200px"
                bucketName="activity-images"
                folderPath="main"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="gallery_images"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Galeria de Imagens</FormLabel>
            <FormControl>
              <GalleryUpload 
                initialImages={galleryImagesArray}
                onImagesChange={handleGalleryImagesChange}
                maxImages={5}
                bucketName="activity-images"
                folderPath="gallery"
              />
            </FormControl>
            <FormDescription>
              Adicione até 5 imagens para a galeria da atividade
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="rating"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Avaliação (0-5)</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="5"
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

export default ActivityMediaForm;
