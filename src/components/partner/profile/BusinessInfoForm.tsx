
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Partner } from "@/types/partner";

interface BusinessInfoFormProps {
  formData: {
    business_name: string;
    description: string;
    contact_email: string;
    contact_phone: string;
    website: string;
    address: string;
  };
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCancel: () => void;
}

const BusinessInfoForm: React.FC<BusinessInfoFormProps> = ({
  formData,
  onSubmit,
  onChange,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="business_name">Nome do Negócio</Label>
        <Input 
          id="business_name" 
          name="business_name" 
          value={formData.business_name} 
          onChange={onChange} 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea 
          id="description" 
          name="description" 
          value={formData.description} 
          onChange={onChange}
          rows={4}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contact_email">Email de Contato</Label>
          <Input 
            id="contact_email" 
            name="contact_email" 
            value={formData.contact_email} 
            onChange={onChange}
            type="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact_phone">Telefone</Label>
          <Input 
            id="contact_phone" 
            name="contact_phone" 
            value={formData.contact_phone} 
            onChange={onChange}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input 
          id="website" 
          name="website" 
          value={formData.website} 
          onChange={onChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Endereço</Label>
        <Input 
          id="address" 
          name="address" 
          value={formData.address} 
          onChange={onChange}
        />
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
};

export default BusinessInfoForm;
