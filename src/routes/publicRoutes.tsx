
import { Suspense, lazy } from "react";
import { RouteObject } from "react-router-dom";

import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import { Loader2 } from "lucide-react";

// Lazy loaded routes - fix default exports
const EventsList = lazy(() => import("@/pages/EventsList"));
const EventDetail = lazy(() => import("@/pages/EventDetail"));
const EventPurchase = lazy(() => import("@/pages/EventPurchase"));
const MyEventTickets = lazy(() => import("@/pages/MyEventTickets"));
const Tours = lazy(() => import("@/pages/Tours"));
const TourDetail = lazy(() => import("@/pages/TourDetail"));
const TourBooking = lazy(() => import("@/pages/TourBooking"));

// Fix imports for components that don't have default exports
// Use import() and then access the named export
const Accommodations = lazy(() => import("@/pages/Accommodations").then(module => ({ default: module.Accommodations || module.default })));
const AccommodationDetail = lazy(() => import("@/pages/AccommodationDetail").then(module => ({ default: module.AccommodationDetail || module.default })));
const Packages = lazy(() => import("@/pages/Packages").then(module => ({ default: module.Packages || module.default })));
const PackageDetail = lazy(() => import("@/pages/PackageDetail").then(module => ({ default: module.PackageDetail || module.default })));

const Store = lazy(() => import("@/pages/Store"));
const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const Wishlist = lazy(() => import("@/pages/Wishlist").then(module => ({ default: module.Wishlist || module.default })));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Profile = lazy(() => import("@/pages/Profile"));
const Bookings = lazy(() => import("@/pages/Bookings").then(module => ({ default: module.Bookings || module.default })));
const BookingDetail = lazy(() => import("@/pages/BookingDetail"));
const Map = lazy(() => import("@/pages/Map").then(module => ({ default: module.Map || module.default })));
const Partners = lazy(() => import("@/pages/Partners"));
const PartnerDetail = lazy(() => import("@/pages/PartnerDetail"));
const Unauthorized = lazy(() => import("@/pages/Unauthorized"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-12 w-12 animate-spin text-tuca-ocean-blue" />
  </div>
);

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
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/eventos",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <EventsList />
      </Suspense>
    ),
  },
  {
    path: "/eventos/:id",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <EventDetail />
      </Suspense>
    ),
  },
  {
    path: "/eventos/:id/comprar",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <EventPurchase />
      </Suspense>
    ),
  },
  {
    path: "/meus-ingressos",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <MyEventTickets />
      </Suspense>
    ),
  },
  {
    path: "/tours",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Tours />
      </Suspense>
    ),
  },
  {
    path: "/tours/:id",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <TourDetail />
      </Suspense>
    ),
  },
  {
    path: "/tours/:id/reservar",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <TourBooking />
      </Suspense>
    ),
  },
  {
    path: "/hospedagens",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Accommodations />
      </Suspense>
    ),
  },
  {
    path: "/hospedagens/:id",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AccommodationDetail />
      </Suspense>
    ),
  },
  {
    path: "/pacotes",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Packages />
      </Suspense>
    ),
  },
  {
    path: "/pacotes/:id",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PackageDetail />
      </Suspense>
    ),
  },
  {
    path: "/loja",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Store />
      </Suspense>
    ),
  },
  {
    path: "/produtos/:id",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ProductDetails />
      </Suspense>
    ),
  },
  {
    path: "/carrinho",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Cart />
      </Suspense>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Checkout />
      </Suspense>
    ),
  },
  {
    path: "/favoritos",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Wishlist />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    path: "/perfil",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Profile />
      </Suspense>
    ),
  },
  {
    path: "/reservas",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Bookings />
      </Suspense>
    ),
  },
  {
    path: "/reservas/:id",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <BookingDetail />
      </Suspense>
    ),
  },
  {
    path: "/mapa",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Map />
      </Suspense>
    ),
  },
  {
    path: "/parceiros",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Partners />
      </Suspense>
    ),
  },
  {
    path: "/parceiros/:id",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PartnerDetail />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Register />,
  },
  {
    path: "/recuperar-senha",
    element: <ForgotPassword />,
  },
  {
    path: "/redefinir-senha",
    element: <ResetPassword />,
  },
  {
    path: "/unauthorized",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Unauthorized />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default publicRoutes;
