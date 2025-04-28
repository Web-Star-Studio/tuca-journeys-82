
import React from "react";
import { RouteObject } from "react-router-dom";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminLogin from "@/pages/admin/AdminLogin";
import Tours from "@/pages/admin/Tours";
import TourAvailability from "@/pages/admin/TourAvailability";
import Accommodations from "@/pages/admin/Accommodations";
import AccommodationAvailability from "@/pages/admin/AccommodationAvailability";
import Products from "@/pages/admin/Products";
import Users from "@/pages/admin/Users";
import Media from "@/pages/admin/Media";
import Reports from "@/pages/admin/Reports";
import Settings from "@/pages/admin/Settings";
import Bookings from "@/pages/admin/Bookings";
import Packages from "@/pages/admin/Packages";
import Permissions from "@/pages/admin/Permissions";
import AuditLogs from "@/pages/admin/AuditLogs";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/tours",
    element: <Tours />,
  },
  {
    path: "/admin/tours/:id/availability",
    element: <TourAvailability />,
  },
  {
    path: "/admin/accommodations",
    element: <Accommodations />,
  },
  {
    path: "/admin/accommodations/:id/availability",
    element: <AccommodationAvailability />,
  },
  {
    path: "/admin/packages",
    element: <Packages />,
  },
  {
    path: "/admin/products",
    element: <Products />,
  },
  {
    path: "/admin/bookings",
    element: <Bookings />,
  },
  {
    path: "/admin/users",
    element: <Users />,
  },
  {
    path: "/admin/permissions",
    element: <Permissions />,
  },
  {
    path: "/admin/audit-logs",
    element: <AuditLogs />,
  },
  {
    path: "/admin/media",
    element: <Media />,
  },
  {
    path: "/admin/reports",
    element: <Reports />,
  },
  {
    path: "/admin/settings",
    element: <Settings />,
  },
];

export default adminRoutes;
