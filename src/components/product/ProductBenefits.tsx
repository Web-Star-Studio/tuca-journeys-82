
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ProductBenefitsProps {
  benefits: string[];
}

const ProductBenefits: React.FC<ProductBenefitsProps> = ({ benefits }) => {
  if (!benefits || benefits.length === 0) return null;
  
  return (
    <div className="mt-6 border-t pt-6">
      <h3 className="text-lg font-semibold mb-3">Benefícios do Produto</h3>
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductBenefits;
