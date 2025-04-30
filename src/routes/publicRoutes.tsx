import React from "react";
import { RouteObject } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Tours from "@/pages/Tours";
import TourDetail from "@/pages/TourDetail";
import Accommodations from "@/pages/Accommodations";
import AccommodationDetail from "@/pages/AccommodationDetail";
import Bookings from "@/pages/Bookings";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Orders from "@/pages/Orders";
import Wishlist from "@/pages/Wishlist";
import Map from "@/pages/Map";
import Packages from "@/pages/Packages";
import PackageDetail from "@/pages/PackageDetail";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Coupons from "@/pages/Coupons";
import Points from "@/pages/Points";
import Notifications from "@/pages/Notifications";
import Payments from "@/pages/Payments";
import SettingsPage from "@/pages/SettingsPage";

// Add these imports:
import EventsList from "@/pages/EventsList";
import EventDetails from "@/pages/EventDetails";
import MyEventTickets from "@/pages/MyEventTickets";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/sobre",
    element: <About />,
  },
  {
    path: "/contato",
    element: <Contact />,
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
    path: "/hospedagens",
    element: <Accommodations />,
  },
  {
    path: "/hospedagens/:id",
    element: <AccommodationDetail />,
  },
  {
    path: "/reservas",
    element: <Bookings />,
  },
  {
    path: "/perfil",
    element: <Profile />,
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
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/pedidos",
    element: <Orders />,
  },
  {
    path: "/lista-de-desejos",
    element: <Wishlist />,
  },
  {
    path: "/mapa",
    element: <Map />,
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
    path: "/loja",
    element: <Products />,
  },
  {
    path: "/loja/:id",
    element: <ProductDetail />,
  },
  {
    path: "/cupons",
    element: <Coupons />,
  },
  {
    path: "/pontos",
    element: <Points />,
  },
  {
    path: "/notificacoes",
    element: <Notifications />,
  },
  {
    path: "/pagamentos",
    element: <Payments />,
  },
  {
    path: "/configuracoes",
    element: <SettingsPage />,
  },
  
  // Update the existing Events route with our new component
  {
    path: "/eventos",
    element: <EventsList />,
  },
  // Add the event details and tickets pages
  {
    path: "/eventos/:id",
    element: <EventDetails />,
  },
  {
    path: "/meus-ingressos",
    element: <MyEventTickets />,
  },
  
];

export default publicRoutes;
