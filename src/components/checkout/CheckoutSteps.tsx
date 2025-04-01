
import React from "react";

interface CheckoutStepsProps {
  step: number;
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ step }) => {
  return (
    <div className="flex items-center mb-6">
      <div className={`rounded-full h-8 w-8 flex items-center justify-center font-medium ${step >= 1 ? 'bg-tuca-ocean-blue text-white' : 'bg-gray-200'}`}>1</div>
      <div className={`h-1 flex-grow mx-2 ${step >= 2 ? 'bg-tuca-ocean-blue' : 'bg-gray-200'}`}></div>
      <div className={`rounded-full h-8 w-8 flex items-center justify-center font-medium ${step >= 2 ? 'bg-tuca-ocean-blue text-white' : 'bg-gray-200'}`}>2</div>
    </div>
  );
};

export default CheckoutSteps;
