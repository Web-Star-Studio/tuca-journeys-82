
import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  Settings,
  User,
  BarChart2,
  MessageSquare,
  Tag,
  Users,
} from 'lucide-react';
import { Partner } from '@/types/partner';
import SidebarLink from './SidebarLink';
import { getPartnerRoutes } from '@/routes/partner/routeConfig';

interface SidebarNavigationProps {
  collapsed: boolean;
  partner?: Partner;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ collapsed, partner }) => {
  const routes = getPartnerRoutes(partner?.business_type);
  
  return (
    <nav className="space-y-1">
      {routes.map((route) => (
        route.icon ? (
          <SidebarLink
            key={route.path}
            to={route.path}
            icon={<route.icon size={20} />}
            label={route.label}
            collapsed={collapsed}
          />
        ) : null
      ))}
    </nav>
  );
};

export default SidebarNavigation;
