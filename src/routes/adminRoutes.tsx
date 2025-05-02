
import { Suspense, lazy } from "react";
import { RouteObject } from "react-router-dom";
import { Loader2 } from "lucide-react";

import AdminLogin from "@/pages/admin/AdminLogin";

// Lazy load all admin pages to improve performance
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminTours = lazy(() => import("@/pages/admin/Tours"));
const AdminTourAvailability = lazy(() => import("@/pages/admin/TourAvailability"));
const AdminAccommodations = lazy(() => import("@/pages/admin/Accommodations"));
const AdminAccommodationAvailability = lazy(() => import("@/pages/admin/AccommodationAvailability"));
const AdminBookings = lazy(() => import("@/pages/admin/Bookings"));
const AdminUsers = lazy(() => import("@/pages/admin/Users"));
const AdminReports = lazy(() => import("@/pages/admin/Reports"));
const AdminPackages = lazy(() => import("@/pages/admin/Packages"));
const AdminMedia = lazy(() => import("@/pages/admin/Media"));
const AdminSettings = lazy(() => import("@/pages/admin/Settings"));
const AdminProducts = lazy(() => import("@/pages/admin/Products"));
const AdminAuditLogs = lazy(() => import("@/pages/admin/AuditLogs"));
const AdminPermissions = lazy(() => import("@/pages/admin/Permissions"));
const AdminEvents = lazy(() => import("@/pages/admin/Events"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-12 w-12 animate-spin text-tuca-ocean-blue" />
  </div>
);

const adminRoutes: RouteObject[] = [
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminDashboard />
      </Suspense>
    ),
  },
  {
    path: "/admin/tours",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminTours />
      </Suspense>
    ),
  },
  {
    path: "/admin/tour-availability/:id",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminTourAvailability />
      </Suspense>
    ),
  },
  {
    path: "/admin/accommodations",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminAccommodations />
      </Suspense>
    ),
  },
  {
    path: "/admin/accommodation-availability/:id",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminAccommodationAvailability />
      </Suspense>
    ),
  },
  {
    path: "/admin/bookings",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminBookings />
      </Suspense>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminUsers />
      </Suspense>
    ),
  },
  {
    path: "/admin/reports",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminReports />
      </Suspense>
    ),
  },
  {
    path: "/admin/packages",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminPackages />
      </Suspense>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminProducts />
      </Suspense>
    ),
  },
  {
    path: "/admin/media",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminMedia />
      </Suspense>
    ),
  },
  {
    path: "/admin/settings",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminSettings />
      </Suspense>
    ),
  },
  {
    path: "/admin/audit-logs",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminAuditLogs />
      </Suspense>
    ),
  },
  {
    path: "/admin/permissions",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminPermissions />
      </Suspense>
    ),
  },
  {
    path: "/admin/events",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminEvents />
      </Suspense>
    ),
  },
];

export default adminRoutes;
