
import React from "react";
import { PointData } from "./utils/mapData";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { getCategoryIcon } from "./utils/dataToMapPoints";

interface MapPopupProps {
  point: PointData;
  onClose: () => void;
}

const MapPopup = ({ point, onClose }: MapPopupProps) => {
  const CategoryIcon = point.category ? getCategoryIcon(point.category) : null;

  return (
    <div className="p-3 max-w-[280px]">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-sm">{point.name}</h3>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-800"
        >
          ×
        </button>
      </div>
      
      <p className="text-xs text-gray-600 mb-2">{point.description || ""}</p>
      
      <div className="flex items-center gap-2 mb-2">
        {point.category && (
          <div className="text-xs font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1" 
              style={{ backgroundColor: `${point.color}20`, color: point.color }}>
            {CategoryIcon && <CategoryIcon size={12} />}
            {point.category}
          </div>
        )}
        
        {point.price !== undefined && (
          <div className="text-xs font-medium">
            {point.price === 0 ? 'Gratuito' : `R$ ${point.price.toFixed(2)}`}
          </div>
        )}
      </div>
      
      {point.rating !== undefined && point.rating !== null && (
        <div className="flex items-center mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={12}
              className={star <= point.rating! ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}
            />
          ))}
          <span className="text-xs ml-1">{point.rating.toFixed(1)}</span>
        </div>
      )}
      
      {point.url && (
        <Link 
          to={point.url}
          className="text-xs text-tuca-ocean-blue hover:underline font-medium block mt-1"
        >
          Ver detalhes →
        </Link>
      )}
    </div>
  );
};

export default MapPopup;
