
import React, { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col">
      {children}
    </div>
  );
};

export default PageContainer;
