import React from "react";
import { RouteObject } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import { Orders } from "@/pages/Orders";
import { Wishlist } from "@/pages/Wishlist";
import { Bookings } from "@/pages/Bookings"; 
import { Settings } from "@/pages/Settings";
import Notifications from "@/pages/Notifications";
import TravelPreferences from "@/pages/TravelPreferences";

// Define your protected routes here
export const protectedRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    ),
  },
  {
    path: "/wishlist",
    element: (
      <ProtectedRoute>
        <Wishlist />
      </ProtectedRoute>
    ),
  },
  {
    path: "/bookings",
    element: (
      <ProtectedRoute>
        <Bookings /> {/* Updated component name */}
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute>
        <Notifications />
      </ProtectedRoute>
    ),
  },
  {
    path: "/travel-preferences",
    element: (
      <ProtectedRoute>
        <TravelPreferences />
      </ProtectedRoute>
    ),
  },
];
