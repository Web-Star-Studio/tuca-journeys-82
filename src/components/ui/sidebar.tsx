
import React, { createContext, useState, useContext } from "react";

// Create the sidebar context
type SidebarContextType = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Create the sidebar provider component
export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Create a custom hook to use the sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// Create the sidebar trigger component
export const SidebarTrigger = () => {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <button
      type="button"
      onClick={() => setCollapsed(!collapsed)}
      className="fixed top-4 left-4 z-50 rounded-md p-2 bg-white shadow-md"
    >
      {collapsed ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      )}
    </button>
  );
};

// Export additional sidebar components
export const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const { collapsed } = useSidebar();

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white border-r transition-all duration-300 z-40 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {children}
    </aside>
  );
};

export const SidebarHeader = ({ children }: { children?: React.ReactNode }) => {
  const { collapsed } = useSidebar();

  return (
    <div className="h-16 border-b flex items-center px-4">
      {children || (
        <h2 className={`font-semibold ${collapsed ? "text-xs" : "text-xl"}`}>
          {collapsed ? "Menu" : "Dashboard"}
        </h2>
      )}
    </div>
  );
};

export const SidebarContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="py-4">{children}</div>;
};

export const SidebarFooter = ({ children }: { children: React.ReactNode }) => {
  return <div className="absolute bottom-0 left-0 right-0 border-t p-4">{children}</div>;
};

export const SidebarGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className="mb-4">{children}</div>;
};

export const SidebarGroupLabel = ({ children }: { children: React.ReactNode }) => {
  const { collapsed } = useSidebar();

  if (collapsed) return null;

  return (
    <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
      {children}
    </h3>
  );
};

export const SidebarGroupContent = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export const SidebarMenu = ({ children }: { children: React.ReactNode }) => {
  return <ul className="space-y-1">{children}</ul>;
};

export const SidebarMenuItem = ({ children }: { children: React.ReactNode }) => {
  return <li>{children}</li>;
};

export const SidebarMenuButton = ({
  children,
  asChild,
  ...props
}: {
  children: React.ReactNode;
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { collapsed } = useSidebar();
  
  if (asChild) {
    return <div className={`flex items-center px-4 py-2 text-sm rounded-md hover:bg-gray-100 ${
      collapsed ? "justify-center" : ""
    }`}>{children}</div>;
  }
  
  return (
    <button
      type="button"
      className={`flex items-center w-full px-4 py-2 text-sm rounded-md hover:bg-gray-100 ${
        collapsed ? "justify-center" : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};
