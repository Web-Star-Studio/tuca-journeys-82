
import React from "react";

interface DashboardRowProps {
  children: React.ReactNode;
}

const DashboardRow = ({ children }: DashboardRowProps) => {
  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      {children}
    </div>
  );
};

export default DashboardRow;
