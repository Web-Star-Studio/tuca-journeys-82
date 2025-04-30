
import React from "react";
import { RouteObject } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Tours from "@/pages/Tours";
import TourDetail from "@/pages/TourDetail";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import Events from "@/pages/Events";
import Payments from "@/pages/Payments";
import Notifications from "@/pages/Notifications";
import FeaturedAccommodationsPage from "@/pages/FeaturedAccommodationsPage";
import AccommodationDetailsPage from "@/pages/AccommodationDetailsPage";
import BookingsPage from "@/pages/BookingsPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPassword from "@/pages/ResetPassword";
import OrdersPage from "@/pages/OrdersPage";
import WishlistPage from "@/pages/WishlistPage";
import MapPage from "@/pages/MapPage";
import PackagesPage from "@/pages/PackagesPage";
import PackageDetailPage from "@/pages/PackageDetailPage";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import CouponsPage from "@/pages/CouponsPage";
import PointsPage from "@/pages/PointsPage";
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
    element: <FeaturedAccommodationsPage />,
  },
  {
    path: "/hospedagens/:id",
    element: <AccommodationDetailsPage />,
  },
  {
    path: "/reservas",
    element: <BookingsPage />,
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
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/pedidos",
    element: <OrdersPage />,
  },
  {
    path: "/lista-de-desejos",
    element: <WishlistPage />,
  },
  {
    path: "/mapa",
    element: <MapPage />,
  },
  {
    path: "/pacotes",
    element: <PackagesPage />,
  },
  {
    path: "/pacotes/:id",
    element: <PackageDetailPage />,
  },
  {
    path: "/loja",
    element: <ProductsPage />,
  },
  {
    path: "/loja/:id",
    element: <ProductDetailPage />,
  },
  {
    path: "/cupons",
    element: <CouponsPage />,
  },
  {
    path: "/pontos",
    element: <PointsPage />,
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
