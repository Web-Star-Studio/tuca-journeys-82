
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
import { 
  LayoutDashboard, Calendar, User, Settings, 
  Users, BarChart2, MessageSquare, Tag 
} from "lucide-react";

export const baseRoutes = [
  {
    path: "/parceiro/dashboard",
    element: <PartnerDashboard />,
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/parceiro/reservas",
    element: <PartnerBookings />,
    label: "Reservas",
    icon: Calendar,
  },
  {
    path: "/parceiro/cupons",
    element: <PartnerCoupons />,
    label: "Cupons",
    icon: Tag,
  },
  {
    path: "/parceiro/clientes",
    element: <PartnerClients />,
    label: "Clientes",
    icon: Users,
  },
  {
    path: "/parceiro/relatorios",
    element: <PartnerReports />,
    label: "Relatórios",
    icon: BarChart2,
  },
  {
    path: "/parceiro/chat",
    element: <PartnerChat />,
    label: "Mensagens",
    icon: MessageSquare,
  },
  {
    path: "/parceiro/perfil",
    element: <PartnerProfile />,
    label: "Perfil",
    icon: User,
  },
  {
    path: "/parceiro/configuracoes",
    element: <PartnerSettings />,
    label: "Configurações",
    icon: Settings,
  },
];
