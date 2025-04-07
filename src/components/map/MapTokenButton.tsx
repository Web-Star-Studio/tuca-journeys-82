
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { MapPin } from "lucide-react";

interface MapTokenButtonProps {
  onUpdateToken: (token: string) => void;
}

const MapTokenButton = ({ onUpdateToken }: MapTokenButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      onUpdateToken(token.trim());
      setIsOpen(false);
    }
  };
  
  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        className="absolute bottom-4 left-4 z-20 bg-white/80 backdrop-blur-sm"
        onClick={() => setIsOpen(true)}
      >
        <MapPin className="h-4 w-4 mr-2" /> Atualizar Token
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Definir Token Mapbox</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="token" className="text-sm font-medium">
                Mapbox Access Token
              </label>
              <Input
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjazl..."
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Obtenha seu token em <a href="https://mapbox.com/account/access-tokens" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">mapbox.com</a>
              </p>
            </div>
            
            <DialogFooter>
              <Button type="submit" disabled={!token.trim()}>
                Salvar Token
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MapTokenButton;
