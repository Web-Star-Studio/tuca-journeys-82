
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Partner } from '@/types/partner';

interface SidebarHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  partner?: Partner;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  collapsed,
  setCollapsed,
  partner,
}) => {
  const getInitials = (name?: string) => {
    if (!name) return "TN";
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="p-4 flex items-center justify-between border-b">
      {!collapsed ? (
        <div>
          <h2 className="text-lg font-medium">Parceiro</h2>
          <p className="text-xs text-gray-500 truncate">{partner?.business_name || "Tucano Noronha"}</p>
        </div>
      ) : (
        <div className="mx-auto">
          <span className="font-bold">{getInitials(partner?.business_name)}</span>
        </div>
      )}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="rounded-full p-1 hover:bg-gray-100"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </div>
  );
};

export default SidebarHeader;
