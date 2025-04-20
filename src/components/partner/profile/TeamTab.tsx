
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, UserPlus, Trash } from "lucide-react";

const TeamTab: React.FC = () => {
  // Mock team members for display purposes
  const teamMembers = [
    { id: 1, name: "João Silva", role: "Administrador", email: "joao@example.com" },
    { id: 2, name: "Maria Oliveira", role: "Gerente", email: "maria@example.com" },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Membros da Equipe</CardTitle>
        <Button className="flex items-center gap-2">
          <UserPlus size={16} />
          <span>Adicionar Membro</span>
        </Button>
      </CardHeader>
      <CardContent>
        {teamMembers.length > 0 ? (
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex justify-between items-center p-3 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="bg-tuca-ocean-blue text-white p-2 rounded-full">
                    <User size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">{member.role}</span>
                  <Button variant="ghost" size="icon" className="text-red-500">
                    <Trash size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">Adicione membros à sua equipe</h3>
            <p className="text-gray-500 mt-2 mb-4">
              Equipes permitem que você trabalhe com outros colaboradores em seu negócio.
            </p>
            <Button>Adicionar Membro</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamTab;
