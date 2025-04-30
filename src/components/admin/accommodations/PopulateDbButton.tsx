
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Database } from 'lucide-react';
import { populateEntireAccommodationsDatabase } from '@/utils/populateDatabaseUtils';
import { toast } from 'sonner';

const PopulateDbButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePopulateDb = async () => {
    if (confirm('Isso irá adicionar dados de exemplo à base de dados. Continuar?')) {
      setIsLoading(true);
      try {
        await populateEntireAccommodationsDatabase();
        toast.success('Base de dados populada com sucesso!');
      } catch (error) {
        console.error('Failed to populate database:', error);
        toast.error('Falha ao popular a base de dados');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePopulateDb}
      disabled={isLoading}
      className="flex items-center gap-2"
    >
      <Database className="h-4 w-4" />
      {isLoading ? 'Populando...' : 'Adicionar Dados de Exemplo'}
    </Button>
  );
};

export default PopulateDbButton;
