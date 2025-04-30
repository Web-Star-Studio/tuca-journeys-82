
import React from "react";
import { RouteObject } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Packages from "@/pages/Packages";
import PackageDetail from "@/pages/PackageDetail";
import Hospedagens from "@/pages/Hospedagens";
import AccommodationDetail from "@/pages/AccommodationDetail";
import Tours from "@/pages/Tours";
import TourDetail from "@/pages/TourDetail";
import Contact from "@/pages/Contact";
import Mapa from "@/pages/Mapa";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";
import Booking from "@/pages/Booking";
import BookingConfirmation from "@/pages/BookingConfirmation";
import Reservar from "@/pages/Reservar";

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
    path: "/pacotes",
    element: <Packages />,
  },
  {
    path: "/pacotes/:id",
    element: <PackageDetail />,
  },
  {
    path: "/hospedagens",
    element: <Hospedagens />,
  },
  {
    path: "/hospedagem/:id",
    element: <AccommodationDetail />,
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
    path: "/reservar",
    element: <Reservar />,
  },
  {
    path: "/reservar/pacote/:id",
    element: <Booking />,
  },
  {
    path: "/reserva-confirmada",
    element: <BookingConfirmation />,
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
