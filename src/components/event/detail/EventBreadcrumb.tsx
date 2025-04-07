
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const EventBreadcrumb = () => {
  return (
    <div className="mb-8">
      <Link to="/eventos" className="flex items-center text-tuca-ocean-blue hover:underline">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para eventos
      </Link>
    </div>
  );
};

export default EventBreadcrumb;
