
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Mail, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useCurrentPartner } from '@/hooks/use-partner';

interface PartnerHeaderProps {
  pageTitle: string;
  toggleMobileSidebar?: () => void;
}

const PartnerHeader: React.FC<PartnerHeaderProps> = ({ pageTitle, toggleMobileSidebar }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: partner } = useCurrentPartner();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      <div className="container px-4 mx-auto flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <h1 className="text-xl font-medium">{pageTitle}</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notificações</span>
          </Button>
          
          <Button variant="ghost" size="icon">
            <Mail className="h-5 w-5" />
            <span className="sr-only">Mensagens</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg" alt="Perfil" />
                  <AvatarFallback>
                    {user?.email?.substring(0, 2).toUpperCase() || 'UN'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">{partner?.business_name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/parceiro/configuracoes')}>
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/perfil')}>
                Perfil Pessoal
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/parceiro/ajuda')}>
                Ajuda & Suporte
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/logout')}>
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default PartnerHeader;
