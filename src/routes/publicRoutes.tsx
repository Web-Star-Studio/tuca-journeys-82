
import React from "react";
import { RouteObject } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Packages from "@/pages/Packages";
import PackageDetail from "@/pages/PackageDetail";
import Hospedagens from "@/pages/Hospedagens";
import Tours from "@/pages/Tours";
import TourDetail from "@/pages/TourDetail";
import Contact from "@/pages/Contact";
import Mapa from "@/pages/Mapa";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";

// Public routes accessible to all users
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/packages",
    element: <Packages />,
  },
  {
    path: "/packages/:id",
    element: <PackageDetail />,
  },
  {
    path: "/hospedagens",
    element: <Hospedagens />,
  },
  {
    path: "/passeios",
    element: <Tours />,
  },
  {
    path: "/passeios/:id",
    element: <TourDetail />,
  },
  {
    path: "/contato",
    element: <Contact />,
  },
  {
    path: "/mapa",
    element: <Mapa />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default publicRoutes;
