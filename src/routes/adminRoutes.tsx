
import React from "react";
import { RouteObject } from "react-router-dom";
import Dashboard from "@/pages/admin/Dashboard";
import AdminLogin from "@/pages/admin/AdminLogin";
import Tours from "@/pages/admin/Tours";
import Packages from "@/pages/admin/Packages";
import Products from "@/pages/admin/Products";
import Accommodations from "@/pages/admin/Accommodations";
import Users from "@/pages/admin/Users";
import Settings from "@/pages/admin/Settings";
import Bookings from "@/pages/admin/Bookings";
import TourAvailability from "@/pages/admin/TourAvailability";
import AccommodationAvailability from "@/pages/admin/AccommodationAvailability";
import Events from "@/pages/admin/Events";
import Reports from "@/pages/admin/Reports";
import Media from "@/pages/admin/Media";
import Permissions from "@/pages/admin/Permissions";
import AuditLogs from "@/pages/admin/AuditLogs";
import RestaurantManagement from "@/pages/admin/RestaurantManagement";
import RestaurantDetail from "@/pages/admin/RestaurantDetail";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <Dashboard />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin/tours",
    element: <Tours />,
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
    path: "/admin/accommodations",
    element: <Accommodations />,
  },
  {
    path: "/admin/users",
    element: <Users />,
  },
  {
    path: "/admin/settings",
    element: <Settings />,
  },
  {
    path: "/admin/bookings",
    element: <Bookings />,
  },
  {
    path: "/admin/tours/availability",
    element: <TourAvailability />,
  },
  {
    path: "/admin/accommodations/availability",
    element: <AccommodationAvailability />,
  },
  {
    path: "/admin/events",
    element: <Events />,
  },
  {
    path: "/admin/reports",
    element: <Reports />,
  },
  {
    path: "/admin/media",
    element: <Media />,
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
    path: "/admin/restaurants",
    element: <RestaurantManagement />,
  },
  {
    path: "/admin/restaurants/:id",
    element: <RestaurantDetail />,
  }
];

export default adminRoutes;
