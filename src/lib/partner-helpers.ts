
import {
  Building,
  Compass,
  CalendarDays,
  Car,
  ShoppingBag,
  Utensils,
  Package
} from "lucide-react";
import { Partner } from "@/types/partner";

export const getPartnerBusinessTypeInfo = (businessType: Partner["business_type"]) => {
  switch (businessType) {
    case 'accommodation': 
      return { 
        icon: Building, 
        label: 'Hospedagens',
        routePrefix: '/hospedagens',
        singularLabel: 'Hospedagem',
        createLabel: 'Nova Hospedagem'
      };
    case 'tour': 
      return { 
        icon: Compass, 
        label: 'Passeios',
        routePrefix: '/passeios',
        singularLabel: 'Passeio',
        createLabel: 'Novo Passeio'
      };
    case 'vehicle': 
      return { 
        icon: Car, 
        label: 'Veículos',
        routePrefix: '/veiculos',
        singularLabel: 'Veículo',
        createLabel: 'Novo Veículo'
      };
    case 'event': 
      return { 
        icon: CalendarDays, 
        label: 'Eventos',
        routePrefix: '/eventos',
        singularLabel: 'Evento',
        createLabel: 'Novo Evento'
      };
    case 'product': 
      return { 
        icon: ShoppingBag, 
        label: 'Produtos',
        routePrefix: '/produtos',
        singularLabel: 'Produto',
        createLabel: 'Novo Produto'
      };
    case 'restaurant': 
      return { 
        icon: Utensils, 
        label: 'Restaurantes',
        routePrefix: '/restaurantes',
        singularLabel: 'Restaurante',
        createLabel: 'Novo Restaurante'
      };
    case 'service': 
      return { 
        icon: Package, 
        label: 'Serviços',
        routePrefix: '/servicos',
        singularLabel: 'Serviço',
        createLabel: 'Novo Serviço'
      };
    default: 
      return { 
        icon: Package, 
        label: 'Produtos',
        routePrefix: '/produtos',
        singularLabel: 'Item',
        createLabel: 'Novo Item'
      };
  }
};

export const getPartnerItemName = (businessType: Partner["business_type"]) => {
  const info = getPartnerBusinessTypeInfo(businessType);
  return info.singularLabel;
};

export const getPartnerItemsRoute = (businessType: Partner["business_type"]) => {
  const info = getPartnerBusinessTypeInfo(businessType);
  return `/parceiro${info.routePrefix}`;
};

export const getPartnerCreateRoute = (businessType: Partner["business_type"]) => {
  const info = getPartnerBusinessTypeInfo(businessType);
  return `/parceiro${info.routePrefix}/novo`;
};
