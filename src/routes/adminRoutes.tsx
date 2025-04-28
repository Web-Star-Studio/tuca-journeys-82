
import React from "react";
import { RouteObject, Navigate } from "react-router-dom";
import Dashboard from "@/pages/admin/Dashboard";
import Tours from "@/pages/admin/Tours";
import Accommodations from "@/pages/admin/Accommodations";
import Packages from "@/pages/admin/Packages";
import Products from "@/pages/admin/Products";
import Media from "@/pages/admin/Media";
import Reports from "@/pages/admin/Reports";
import Settings from "@/pages/admin/Settings";
import Users from "@/pages/admin/Users";
import Bookings from "@/pages/admin/Bookings";
import Permissions from "@/pages/admin/Permissions";
import AuditLogs from "@/pages/admin/AuditLogs";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <Navigate to="/admin/dashboard" replace />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute requiredPermission="admin">
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/tours",
    element: (
      <ProtectedRoute requiredPermission="admin">
        <Tours />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/accommodations",
    element: (
      <ProtectedRoute requiredPermission="admin">
        <Accommodations />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/packages",
    element: (
      <ProtectedRoute requiredPermission="admin">
        <Packages />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <ProtectedRoute requiredPermission="admin">
        <Products />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/media",
    element: (
      <ProtectedRoute requiredPermission="admin">
        <Media />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/reports",
    element: (
      <ProtectedRoute requiredPermission="admin">
        <Reports />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/settings",
    element: (
      <ProtectedRoute requiredPermission="admin">
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <ProtectedRoute requiredPermission="admin">
        <Users />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/bookings",
    element: (
      <ProtectedRoute requiredPermission="admin">
        <Bookings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/permissions",
    element: (
      <ProtectedRoute requiredPermission="master">
        <Permissions />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/audit-logs",
    element: (
      <ProtectedRoute requiredPermission="master">
        <AuditLogs />
      </ProtectedRoute>
    ),
  },
];

export default adminRoutes;
