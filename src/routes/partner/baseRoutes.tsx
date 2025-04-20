
import React from "react";
import { Route } from "react-router-dom";
import PartnerRoute from "@/components/partner/PartnerRoute";
import PartnerDashboard from "@/pages/partner/Dashboard";
import PartnerBookings from "@/pages/partner/Bookings";
import PartnerProfile from "@/pages/partner/Profile";
import PartnerSettings from "@/pages/partner/Settings";
import PartnerClients from "@/pages/partner/Clients";
import PartnerReports from "@/pages/partner/Reports";
import PartnerChat from "@/pages/partner/Chat";
import PartnerCoupons from "@/pages/partner/Coupons";

export const baseRoutes = [
  {
    path: "/parceiro/dashboard",
    element: <PartnerDashboard />,
    label: "Dashboard",
  },
  {
    path: "/parceiro/reservas",
    element: <PartnerBookings />,
    label: "Reservas",
  },
  {
    path: "/parceiro/cupons",
    element: <PartnerCoupons />,
    label: "Cupons",
  },
  {
    path: "/parceiro/clientes",
    element: <PartnerClients />,
    label: "Clientes",
  },
  {
    path: "/parceiro/relatorios",
    element: <PartnerReports />,
    label: "Relatórios",
  },
  {
    path: "/parceiro/chat",
    element: <PartnerChat />,
    label: "Mensagens",
  },
  {
    path: "/parceiro/perfil",
    element: <PartnerProfile />,
    label: "Perfil",
  },
  {
    path: "/parceiro/configuracoes",
    element: <PartnerSettings />,
    label: "Configurações",
  },
];

