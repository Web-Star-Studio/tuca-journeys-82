
import React from "react";
import { motion } from "framer-motion";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div className="relative w-full overflow-hidden">
      {children}
    </div>
  );
};

export default PageContainer;
