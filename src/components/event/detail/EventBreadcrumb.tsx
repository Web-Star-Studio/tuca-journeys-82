
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface EventBreadcrumbProps {
  name: string;
}

const EventBreadcrumb = ({ name }: EventBreadcrumbProps) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-tuca-ocean-blue"
          >
            Início
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link
              to="/eventos"
              className="ml-1 text-sm font-medium text-gray-700 hover:text-tuca-ocean-blue"
            >
              Eventos
            </Link>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="ml-1 text-sm font-medium text-gray-500 truncate max-w-[200px]">
              {name}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default EventBreadcrumb;
