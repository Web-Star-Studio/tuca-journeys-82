
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, UserCircle, Heart, Package } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { isUserPartner } from '@/lib/api';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';

export const UserDropdownContent = ({ closeDropdown }: { closeDropdown: () => void }) => {
  const { user, signOut } = useAuth();  // Using signOut instead of logout
  const navigate = useNavigate();

  const { data: isPartner } = useQuery({
    queryKey: ['isPartner', user?.id],
    queryFn: () => user?.id ? isUserPartner(user.id) : false,
    enabled: !!user?.id,
  });

  const handleLogout = async () => {
    closeDropdown();
    try {
      await signOut?.(); // Using optional chaining since signOut might be undefined
      toast.success('Logout realizado com sucesso');
      navigate('/');
    } catch (error) {
      toast.error('Erro ao fazer logout');
    }
  };

  return (
    <div className="py-2">
      <div className="px-4 py-3">
        <p className="text-sm">Logado como</p>
        <p className="text-sm font-medium truncate">{user?.email}</p>
      </div>
      
      <div className="border-t border-gray-200"></div>
      
      <div className="flex flex-col px-1 py-1">
        <Link 
          to="/perfil" 
          onClick={closeDropdown}
          className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"
        >
          <UserCircle className="w-4 h-4 mr-2" />
          Meu Perfil
        </Link>
        
        <Link 
          to="/reservas" 
          onClick={closeDropdown}
          className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"
        >
          <Package className="w-4 h-4 mr-2" />
          Minhas Reservas
        </Link>
        
        <Link 
          to="/wishlist" 
          onClick={closeDropdown}
          className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"
        >
          <Heart className="w-4 h-4 mr-2" />
          Favoritos
        </Link>
        
        <Link 
          to="/dashboard" 
          onClick={closeDropdown}
          className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"
        >
          <Settings className="w-4 h-4 mr-2" />
          Dashboard
        </Link>

        {isPartner ? (
          <Link 
            to="/parceiro/dashboard" 
            onClick={closeDropdown}
            className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"
          >
            <User className="w-4 h-4 mr-2" />
            Área do Parceiro
          </Link>
        ) : (
          <Link 
            to="/parceiro/cadastro" 
            onClick={closeDropdown}
            className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100"
          >
            <User className="w-4 h-4 mr-2" />
            Seja um Parceiro
          </Link>
        )}
      </div>
      
      <div className="border-t border-gray-200"></div>
      
      <div className="px-1 py-1">
        <button
          onClick={handleLogout}
          className="flex w-full items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 text-red-600"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </button>
      </div>
    </div>
  );
};
