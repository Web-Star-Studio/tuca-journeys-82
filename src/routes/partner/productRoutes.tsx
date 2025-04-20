
import React from "react";
import PartnerRoute from "@/components/partner/PartnerRoute";
import { ShoppingBag } from "lucide-react";

export const productRoutes = [
  {
    path: "/parceiro/produtos",
    element: <div>Produtos</div>,
    label: "Produtos",
    icon: ShoppingBag,
  },
];
