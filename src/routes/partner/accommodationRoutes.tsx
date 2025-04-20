
import React from "react";
import { Building } from "lucide-react";
import PartnerAccommodations from "@/pages/partner/accommodations/PartnerAccommodations";

export const accommodationRoutes = [
  {
    path: "/parceiro/hospedagens",
    element: <PartnerAccommodations />,
    label: "Hospedagens",
    icon: Building,
  },
];
