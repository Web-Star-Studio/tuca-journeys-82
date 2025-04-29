
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useAccommodations } from "@/hooks/use-accommodations";
import { Accommodation } from "@/types/database";
import { toast } from "sonner";
import { useUI } from "@/contexts/UIContext";
import ImageUploader from "@/components/admin/shared/ImageUploader";
import TagInput from "@/components/admin/shared/TagInput";

interface AccommodationFormProps {
  accommodationId: number | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export const AccommodationForm: React.FC<AccommodationFormProps> = ({
  accommodationId,
  onCancel,
  onSuccess,
}) => {
  const { showGlobalSpinner } = useUI();
  const { 
    getAccommodationById, 
    createAccommodation, 
    updateAccommodation 
  } = useAccommodations();
  
  // Initial form state
  const [formState, setFormState] = useState<Partial<Accommodation>>({
    title: "",
    short_description: "",
    description: "",
    price_per_night: 0,
    type: "",
    max_guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    amenities: [],
    address: "",
    image_url: "",
    gallery_images: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // Load existing accommodation data if in edit mode
  useEffect(() => {
    const loadAccommodation = async () => {
      if (accommodationId) {
        showGlobalSpinner(true);
        try {
          const accommodation = getAccommodationById(accommodationId);
          
          if (accommodation) {
            setFormState(accommodation);
          } else {
            toast.error("Hospedagem não encontrada");
            onCancel();
          }
        } catch (error) {
          console.error("Error loading accommodation:", error);
          toast.error("Erro ao carregar dados da hospedagem");
          onCancel();
        } finally {
          showGlobalSpinner(false);
        }
      }
    };
    
    loadAccommodation();
  }, [accommodationId]);
  
  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: any }
  ) => {
    const { name, value } = 'target' in e ? e.target : e;
    
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when field is updated
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };
  
  // Handle numeric input fields
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value === "" ? 0 : parseFloat(value);
    
    setFormState((prev) => ({
      ...prev,
      [name]: numericValue
    }));
    
    // Clear validation error
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };
  
  // Handle image upload completion
  const handleImageUploaded = (url: string, fieldName: string) => {
    setFormState((prev) => ({
      ...prev,
      [fieldName]: url
    }));
    
    // Clear validation error
    if (validationErrors[fieldName]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[fieldName];
        return updated;
      });
    }
  };
  
  // Handle gallery images upload
  const handleGalleryImagesUpdated = (urls: string[]) => {
    setFormState((prev) => ({
      ...prev,
      gallery_images: urls
    }));
  };
  
  // Handle amenities update
  const handleAmenitiesUpdated = (amenities: string[]) => {
    setFormState((prev) => ({
      ...prev,
      amenities
    }));
  };
  
  // Form validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formState.title || formState.title.trim() === "") {
      errors.title = "Título é obrigatório";
    }
    
    if (!formState.short_description || formState.short_description.trim() === "") {
      errors.short_description = "Descrição curta é obrigatória";
    }
    
    if (!formState.description || formState.description.trim() === "") {
      errors.description = "Descrição completa é obrigatória";
    }
    
    if (!formState.type || formState.type.trim() === "") {
      errors.type = "Tipo de hospedagem é obrigatório";
    }
    
    if (!formState.price_per_night || formState.price_per_night <= 0) {
      errors.price_per_night = "Preço por noite precisa ser maior que zero";
    }
    
    if (!formState.address || formState.address.trim() === "") {
      errors.address = "Endereço é obrigatório";
    }
    
    if (!formState.image_url || formState.image_url.trim() === "") {
      errors.image_url = "Imagem principal é obrigatória";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Por favor, corrija os erros no formulário");
      return;
    }
    
    setIsSubmitting(true);
    showGlobalSpinner(true);
    
    try {
      if (accommodationId) {
        // Update existing accommodation
        await updateAccommodation({
          ...formState,
          id: accommodationId
        });
        toast.success("Hospedagem atualizada com sucesso");
      } else {
        // Create new accommodation
        await createAccommodation(formState);
        toast.success("Hospedagem criada com sucesso");
      }
      
      onSuccess();
    } catch (error) {
      console.error("Error saving accommodation:", error);
      toast.error("Ocorreu um erro ao salvar a hospedagem");
    } finally {
      setIsSubmitting(false);
      showGlobalSpinner(false);
    }
  };
  
  // Accommodation types
  const accommodationTypes = [
    "Pousada",
    "Hotel",
    "Casa",
    "Apartamento",
    "Villa",
    "Chalé",
    "Resort",
    "Hostel",
    "Camping"
  ];
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título <span className="text-red-500">*</span></Label>
          <Input
            id="title"
            name="title"
            value={formState.title}
            onChange={handleChange}
            placeholder="Ex: Pousada Vista Mar"
            className={validationErrors.title ? "border-red-500" : ""}
          />
          {validationErrors.title && (
            <p className="text-red-500 text-sm">{validationErrors.title}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Tipo <span className="text-red-500">*</span></Label>
          <Select
            value={formState.type}
            onValueChange={(value) => handleChange({ name: "type", value })}
          >
            <SelectTrigger className={validationErrors.type ? "border-red-500" : ""}>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipos de Hospedagem</SelectLabel>
                {accommodationTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {validationErrors.type && (
            <p className="text-red-500 text-sm">{validationErrors.type}</p>
          )}
        </div>
      </div>
      
      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="short_description">
          Descrição Curta <span className="text-red-500">*</span>
        </Label>
        <Input
          id="short_description"
          name="short_description"
          value={formState.short_description}
          onChange={handleChange}
          placeholder="Breve descrição (até 100 caracteres)"
          maxLength={100}
          className={validationErrors.short_description ? "border-red-500" : ""}
        />
        {validationErrors.short_description && (
          <p className="text-red-500 text-sm">{validationErrors.short_description}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">
          Descrição Completa <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          value={formState.description}
          onChange={handleChange}
          placeholder="Descrição detalhada da hospedagem"
          rows={4}
          className={validationErrors.description ? "border-red-500" : ""}
        />
        {validationErrors.description && (
          <p className="text-red-500 text-sm">{validationErrors.description}</p>
        )}
      </div>
      
      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="price_per_night">
            Preço por noite (R$) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="price_per_night"
            name="price_per_night"
            type="number"
            min="0"
            step="0.01"
            value={formState.price_per_night}
            onChange={handleNumericChange}
            className={validationErrors.price_per_night ? "border-red-500" : ""}
          />
          {validationErrors.price_per_night && (
            <p className="text-red-500 text-sm">{validationErrors.price_per_night}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="max_guests">Máximo de Hóspedes</Label>
          <Input
            id="max_guests"
            name="max_guests"
            type="number"
            min="1"
            max="50"
            value={formState.max_guests}
            onChange={handleNumericChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Quartos</Label>
          <Input
            id="bedrooms"
            name="bedrooms"
            type="number"
            min="0"
            value={formState.bedrooms}
            onChange={handleNumericChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Banheiros</Label>
          <Input
            id="bathrooms"
            name="bathrooms"
            type="number"
            min="0"
            value={formState.bathrooms}
            onChange={handleNumericChange}
          />
        </div>
      </div>
      
      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="address">
          Endereço <span className="text-red-500">*</span>
        </Label>
        <Input
          id="address"
          name="address"
          value={formState.address}
          onChange={handleChange}
          placeholder="Ex: Praia do Sueste, s/n"
          className={validationErrors.address ? "border-red-500" : ""}
        />
        {validationErrors.address && (
          <p className="text-red-500 text-sm">{validationErrors.address}</p>
        )}
      </div>
      
      {/* Amenities */}
      <div className="space-y-2">
        <Label>Comodidades</Label>
        <TagInput
          tags={formState.amenities || []}
          onTagsChange={handleAmenitiesUpdated}
          placeholder="Digite e pressione Enter para adicionar"
          suggestions={[
            "Wi-Fi", 
            "Ar-condicionado", 
            "Piscina", 
            "Café da manhã", 
            "Estacionamento",
            "TV", 
            "Cozinha", 
            "Churrasqueira"
          ]}
        />
      </div>
      
      {/* Images */}
      <div className="space-y-2">
        <Label>
          Imagem Principal <span className="text-red-500">*</span>
        </Label>
        <ImageUploader 
          currentImage={formState.image_url} 
          onImageUploaded={(url) => handleImageUploaded(url, "image_url")} 
          folder="accommodations"
        />
        {validationErrors.image_url && (
          <p className="text-red-500 text-sm">{validationErrors.image_url}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label>Galeria de Imagens</Label>
        <ImageUploader 
          multiple={true}
          currentImages={formState.gallery_images} 
          onImagesUploaded={handleGalleryImagesUpdated} 
          folder="accommodations/gallery"
          maxImages={5}
        />
      </div>
      
      {/* Form Actions */}
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {accommodationId ? "Atualizar" : "Criar"} Hospedagem
        </Button>
      </div>
    </form>
  );
};
