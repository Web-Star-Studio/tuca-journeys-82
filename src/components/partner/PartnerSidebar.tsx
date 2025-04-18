
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Calendar,
  Package,
  Settings,
  Users,
  BarChart2,
  MessageSquare,
  Tag,
  Truck,
  CalendarDays,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurrentPartner } from '@/hooks/use-partner';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  end?: boolean;
  collapsed: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  to,
  icon,
  label,
  end = false,
  collapsed,
}) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
          collapsed ? 'justify-center' : '',
          isActive
            ? 'bg-tuca-ocean-blue text-white'
            : 'text-gray-700 hover:bg-tuca-ocean-blue/10 hover:text-tuca-ocean-blue'
        )
      }
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

interface PartnerSidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const PartnerSidebar: React.FC<PartnerSidebarProps> = ({ collapsed, setCollapsed }) => {
  const { data: partner } = useCurrentPartner();

  return (
    <aside
      className={cn(
        'bg-white border-r border-gray-200 h-screen transition-all duration-300 fixed left-0 top-0 z-30',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between border-b">
          {!collapsed ? (
            <div>
              <h2 className="text-lg font-medium">Parceiro</h2>
              <p className="text-xs text-gray-500 truncate">{partner?.business_name}</p>
            </div>
          ) : (
            <div className="mx-auto">
              <span className="font-bold">TN</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <div className="p-2 flex-grow overflow-y-auto">
          <nav className="space-y-1">
            <SidebarLink
              to="/parceiro/dashboard"
              icon={<Home size={20} />}
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
                icon={<Home size={20} />}
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
              to="/parceiro/configuracoes"
              icon={<Settings size={20} />}
              label="Configurações"
              collapsed={collapsed}
            />
          </nav>
        </div>

        <div className="p-2 border-t">
          <SidebarLink
            to="/logout"
            icon={<LogOut size={20} />}
            label="Sair"
            collapsed={collapsed}
          />
        </div>
      </div>
    </aside>
  );
};

export default PartnerSidebar;
