
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

interface MapTokenInputProps {
  onSubmit: (token: string) => void;
}

const MapTokenInput = ({ onSubmit }: MapTokenInputProps) => {
  const [token, setToken] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      onSubmit(token.trim());
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-2">
            <MapPin size={32} className="text-tuca-ocean-blue" />
          </div>
          <CardTitle className="text-center">Mapa de Fernando de Noronha</CardTitle>
          <CardDescription className="text-center">
            Para visualizar o mapa, é necessário um token de acesso do Mapbox
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token">Token do Mapbox</Label>
                <Input
                  id="token"
                  placeholder="Insira seu token público do Mapbox"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Para obter um token:</p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Crie uma conta em <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-tuca-ocean-blue hover:underline">mapbox.com</a></li>
                  <li>Acesse o painel de controle</li>
                  <li>Vá para a seção Tokens</li>
                  <li>Copie o token público (default public token)</li>
                </ol>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-tuca-ocean-blue hover:bg-tuca-deep-blue">
              Visualizar Mapa
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default MapTokenInput;
