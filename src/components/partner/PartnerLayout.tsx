
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCurrentPartner } from "@/hooks/use-partner";
import PartnerSidebar from "./PartnerSidebar";
import PartnerHeader from "./PartnerHeader";
import { Loader2 } from "lucide-react";

interface PartnerLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

const PartnerLayout: React.FC<PartnerLayoutProps> = ({ children, pageTitle }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <PartnerSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Mobile Sidebar */}
      <div className={`md:hidden ${mobileOpen ? 'block' : 'hidden'} fixed inset-0 z-40 bg-black bg-opacity-50`} onClick={toggleMobileSidebar} />
      <div className={`md:hidden fixed top-0 left-0 z-50 h-full w-64 bg-white transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <PartnerSidebar collapsed={false} setCollapsed={() => {}} />
      </div>

      <div className={`transition-all duration-300 ${collapsed ? 'md:pl-16' : 'md:pl-64'}`}>
        <PartnerHeader pageTitle={pageTitle} toggleMobileSidebar={toggleMobileSidebar} />
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PartnerLayout;
