
import React from "react";
import { Route } from "react-router-dom";
import PartnerRoute from "@/components/partner/PartnerRoute";
import PartnerRegister from "@/pages/partner/Register";
import { baseRoutes } from "./partner/baseRoutes";
import { accommodationRoutes } from "./partner/accommodationRoutes";
import { tourRoutes } from "./partner/tourRoutes";
import { vehicleRoutes } from "./partner/vehicleRoutes";
import { eventRoutes } from "./partner/eventRoutes";
import { productRoutes } from "./partner/productRoutes";

export const partnerRoutes = (
  <>
    {/* Wrap all routes in PartnerRoute except registration */}
    {[
      ...baseRoutes,
      ...accommodationRoutes,
      ...tourRoutes,
      ...vehicleRoutes,
      ...eventRoutes,
      ...productRoutes,
    ].map((route) => (
      <Route
        key={route.path}
        path={route.path}
        element={<PartnerRoute>{route.element}</PartnerRoute>}
      />
    ))}
    <Route path="/parceiro/cadastro" element={<PartnerRegister />} />
  </>
);

