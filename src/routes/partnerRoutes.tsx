
import React from "react";
import { RouteObject } from "react-router-dom";

// Partner pages
import PartnerRegister from "@/pages/partner/Register";
import PartnerDashboard from "@/pages/partner/Dashboard";

// Define partner routes
export const partnerRoutes: RouteObject[] = [
  {
    path: "/parceiro/cadastro",
    element: <PartnerRegister />,
  },
  {
    path: "/parceiro/dashboard",
    element: <PartnerDashboard />,
  },
];
