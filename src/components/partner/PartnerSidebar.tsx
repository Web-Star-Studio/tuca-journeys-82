
import React from 'react';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurrentPartner } from '@/hooks/use-partner';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarNavigation from './sidebar/SidebarNavigation';
import SidebarLink from './sidebar/SidebarLink';

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
        <SidebarHeader 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
          partner={partner}
        />

        <div className="p-2 flex-grow overflow-y-auto">
          <SidebarNavigation collapsed={collapsed} partner={partner} />
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
