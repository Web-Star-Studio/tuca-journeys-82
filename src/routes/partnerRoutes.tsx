
import React from "react";
import { Route, Navigate } from "react-router-dom";
import PartnerRoute from "@/components/partner/PartnerRoute";
import PartnerDashboard from "@/pages/partner/Dashboard";
import PartnerBookings from "@/pages/partner/Bookings";
import PartnerProfile from "@/pages/partner/Profile";
import PartnerRegister from "@/pages/partner/Register";

export const partnerRoutes = (
  <>
    <Route 
      path="/parceiro/dashboard" 
      element={
        <PartnerRoute>
          <PartnerDashboard />
        </PartnerRoute>
      } 
    />
    <Route 
      path="/parceiro/reservas" 
      element={
        <PartnerRoute>
          <PartnerBookings />
        </PartnerRoute>
      } 
    />
    <Route 
      path="/parceiro/perfil" 
      element={
        <PartnerRoute>
          <PartnerProfile />
        </PartnerRoute>
      } 
    />
    <Route path="/parceiro/cadastro" element={<PartnerRegister />} />
  </>
);
