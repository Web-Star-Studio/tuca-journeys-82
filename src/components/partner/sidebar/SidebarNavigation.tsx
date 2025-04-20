
import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  Package,
  Settings,
  User,
  BarChart2,
  MessageSquare,
  Tag,
  Truck,
  CalendarDays,
  LogOut,
  Users,
} from 'lucide-react';
import { Partner } from '@/types/partner';
import SidebarLink from './SidebarLink';

interface SidebarNavigationProps {
  collapsed: boolean;
  partner?: Partner;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ collapsed, partner }) => {
  return (
    <nav className="space-y-1">
      <SidebarLink
        to="/parceiro/dashboard"
        icon={<LayoutDashboard size={20} />}
        label="Dashboard"
        end
        collapsed={collapsed}
      />
      <SidebarLink
        to="/parceiro/reservas"
        icon={<Calendar size={20} />}
        label="Reservas"
        collapsed={collapsed}
      />
      
      {partner?.business_type === 'accommodation' && (
        <SidebarLink
          to="/parceiro/hospedagens"
          icon={<Calendar size={20} />}
          label="Hospedagens"
          collapsed={collapsed}
        />
      )}
      
      {partner?.business_type === 'tour' && (
        <SidebarLink
          to="/parceiro/passeios"
          icon={<Package size={20} />}
          label="Passeios"
          collapsed={collapsed}
        />
      )}
      
      {partner?.business_type === 'vehicle' && (
        <SidebarLink
          to="/parceiro/veiculos"
          icon={<Truck size={20} />}
          label="Veículos"
          collapsed={collapsed}
        />
      )}
      
      {partner?.business_type === 'event' && (
        <SidebarLink
          to="/parceiro/eventos"
          icon={<CalendarDays size={20} />}
          label="Eventos"
          collapsed={collapsed}
        />
      )}
      
      {partner?.business_type === 'product' && (
        <SidebarLink
          to="/parceiro/produtos"
          icon={<Package size={20} />}
          label="Produtos"
          collapsed={collapsed}
        />
      )}

      <SidebarLink
        to="/parceiro/cupons"
        icon={<Tag size={20} />}
        label="Cupons"
        collapsed={collapsed}
      />
      
      <SidebarLink
        to="/parceiro/clientes"
        icon={<Users size={20} />}
        label="Clientes"
        collapsed={collapsed}
      />
      
      <SidebarLink
        to="/parceiro/relatorios"
        icon={<BarChart2 size={20} />}
        label="Relatórios"
        collapsed={collapsed}
      />
      
      <SidebarLink
        to="/parceiro/chat"
        icon={<MessageSquare size={20} />}
        label="Mensagens"
        collapsed={collapsed}
      />
      
      <SidebarLink
        to="/parceiro/perfil"
        icon={<User size={20} />}
        label="Perfil"
        collapsed={collapsed}
      />
      
      <SidebarLink
        to="/parceiro/configuracoes"
        icon={<Settings size={20} />}
        label="Configurações"
        collapsed={collapsed}
      />
    </nav>
  );
};

export default SidebarNavigation;
