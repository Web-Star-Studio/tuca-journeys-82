
import React from "react";
import { Truck, Shield, RefreshCw } from "lucide-react";

const ProductBenefits = () => {
  return (
    <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
      <div className="text-center">
        <Truck className="h-6 w-6 mx-auto mb-2 text-tuca-ocean-blue" />
        <p className="text-sm">Entrega para todo Brasil</p>
      </div>
      <div className="text-center">
        <Shield className="h-6 w-6 mx-auto mb-2 text-tuca-ocean-blue" />
        <p className="text-sm">Garantia de qualidade</p>
      </div>
      <div className="text-center">
        <RefreshCw className="h-6 w-6 mx-auto mb-2 text-tuca-ocean-blue" />
        <p className="text-sm">30 dias para devolução</p>
      </div>
    </div>
  );
};

export default ProductBenefits;
