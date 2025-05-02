
import React from "react";
import { RouteObject } from "react-router-dom";
import Home from "@/pages/Index";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Tours from "@/pages/Tours";
import TourDetail from "@/pages/TourDetail";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Accommodations from "@/pages/Accommodations";
import AccommodationDetail from "@/pages/AccommodationDetail";
import Packages from "@/pages/Packages";
import PackageDetail from "@/pages/PackageDetail";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";
import Contact from "@/pages/Contact";
import Map from "@/pages/Map";
import { Store } from "@/pages/Store";
import { NotFound } from "@/pages/NotFound";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import CheckoutSuccess from "@/pages/CheckoutSuccess";
import Booking from "@/pages/Booking";
import BookingConfirmation from "@/pages/BookingConfirmation";
import BookingDetail from "@/pages/BookingDetail";
import Partners from "@/pages/Partners";
import PartnerDetail from "@/pages/PartnerDetail";
import Restaurants from "@/pages/Restaurants";
import RestaurantDetail from "@/pages/RestaurantDetail";
import UserReservations from "@/pages/UserReservations";
import EventPurchase from "@/pages/EventPurchase";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
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
    path: "/tours",
    element: <Tours />,
  },
  {
    path: "/tours/:id",
    element: <TourDetail />,
  },
  {
    path: "/accommodations",
    element: <Accommodations />,
  },
  {
    path: "/accommodations/:id",
    element: <AccommodationDetail />,
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
    path: "/events",
    element: <Events />,
  },
  {
    path: "/events/:id",
    element: <EventDetail />,
  },
  {
    path: "/events/:id/purchase",
    element: <EventPurchase />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/map",
    element: <Map />,
  },
  {
    path: "/hospedagens",
    element: <Accommodations />,
  },
  {
    path: "/tours/:id/reservar",
    element: <Booking />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/:id",
    element: <ProductDetail />,
  },
  {
    path: "/store",
    element: <Store />,
  },
  {
    path: "/loja",
    element: <Store />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/checkout/success",
    element: <CheckoutSuccess />,
  },
  {
    path: "/book",
    element: <Booking />,
  },
  {
    path: "/booking/confirmation",
    element: <BookingConfirmation />,
  },
  {
    path: "/booking/:id",
    element: <BookingDetail />,
  },
  {
    path: "/reservar",
    element: <Booking />,
  },
  {
    path: "/partners",
    element: <Partners />,
  },
  {
    path: "/partners/:id",
    element: <PartnerDetail />,
  },
  // New restaurant routes
  {
    path: "/restaurantes",
    element: <Restaurants />,
  },
  {
    path: "/restaurantes/:id",
    element: <RestaurantDetail />,
  },
  {
    path: "/minhas-reservas",
    element: <UserReservations />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default publicRoutes;
