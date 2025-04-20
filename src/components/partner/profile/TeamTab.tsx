
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TeamTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Membros da Equipe</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">Adicione membros à sua equipe</h3>
          <p className="text-gray-500 mt-2 mb-4">
            Equipes permitem que você trabalhe com outros colaboradores em seu negócio.
          </p>
          <Button>Adicionar Membro</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamTab;
