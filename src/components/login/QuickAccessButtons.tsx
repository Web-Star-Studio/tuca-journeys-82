
import React from "react";
import { Link } from "react-router-dom";

const QuickAccessButtons = () => {
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Não tem uma conta?</span>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/cadastro"
          className="text-sm text-tuca-ocean-blue hover:text-tuca-ocean-blue/80"
        >
          Criar uma conta
        </Link>
      </div>
    </div>
  );
};

export default QuickAccessButtons;
