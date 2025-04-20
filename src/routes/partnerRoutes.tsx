
import React from "react";
import { Route, Navigate } from "react-router-dom";
import PartnerRoute from "@/components/partner/PartnerRoute";
import PartnerDashboard from "@/pages/partner/Dashboard";
import PartnerBookings from "@/pages/partner/Bookings";
import PartnerProfile from "@/pages/partner/Profile";
import PartnerRegister from "@/pages/partner/Register";
import PartnerSettings from "@/pages/partner/Settings";
import PartnerClients from "@/pages/partner/Clients";
import PartnerReports from "@/pages/partner/Reports";
import PartnerChat from "@/pages/partner/Chat";
import PartnerCoupons from "@/pages/partner/Coupons";

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
    <Route 
      path="/parceiro/configuracoes" 
      element={
        <PartnerRoute>
          <PartnerSettings />
        </PartnerRoute>
      } 
    />
    <Route 
      path="/parceiro/clientes" 
      element={
        <PartnerRoute>
          <PartnerClients />
        </PartnerRoute>
      } 
    />
    <Route 
      path="/parceiro/relatorios" 
      element={
        <PartnerRoute>
          <PartnerReports />
        </PartnerRoute>
      } 
    />
    <Route 
      path="/parceiro/chat" 
      element={
        <PartnerRoute>
          <PartnerChat />
        </PartnerRoute>
      } 
    />
    <Route 
      path="/parceiro/cupons" 
      element={
        <PartnerRoute>
          <PartnerCoupons />
        </PartnerRoute>
      } 
    />
    <Route path="/parceiro/cadastro" element={<PartnerRegister />} />
  </>
);
