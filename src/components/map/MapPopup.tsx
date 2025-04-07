
import React from "react";
import { PointData } from "./utils/mapData";
import { Link } from "react-router-dom";
import { Star, MapPin, Calendar, ExternalLink, Clock, DollarSign } from "lucide-react";
import { getCategoryIcon } from "./utils/dataToMapPoints";
import SafeImage from "@/components/ui/safe-image";
import { formatCurrency } from "@/lib/utils";

interface MapPopupProps {
  point: PointData;
  onClose: () => void;
}

const MapPopup = ({ point, onClose }: MapPopupProps) => {
  const CategoryIcon = point.category ? getCategoryIcon(point.category) : null;

  return (
    <div className="p-0 w-[300px] max-w-[90vw]">
      <div className="relative">
        {/* Header image if available */}
        {point.image && (
          <div className="h-32 w-full overflow-hidden">
            <SafeImage 
              src={point.image} 
              alt={point.name} 
              className="w-full h-full object-cover"
              fallbackSrc="/placeholder.svg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 transition-colors"
        >
          <span className="sr-only">Fechar</span>
          ×
        </button>
        
        {/* Category tag if available */}
        {point.category && (
          <div 
            className="absolute top-2 left-2 text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1" 
            style={{ backgroundColor: `${point.color}20`, color: point.color }}
          >
            {CategoryIcon && <CategoryIcon size={12} />}
            {point.category}
          </div>
        )}
      </div>
      
      <div className="p-3">
        {/* Title */}
        <h3 className="font-bold text-base">{point.name}</h3>
        
        {/* Description */}
        {point.description && (
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
            {point.description}
          </p>
        )}
        
        {/* Details list */}
        <div className="mt-2 space-y-1.5">
          {/* Location detail if available */}
          {point.location && (
            <div className="flex items-center text-xs gap-1.5">
              <MapPin size={14} className="text-gray-500" />
              <span className="text-gray-700">{point.location}</span>
            </div>
          )}
          
          {/* Date detail for events */}
          {point.date && (
            <div className="flex items-center text-xs gap-1.5">
              <Calendar size={14} className="text-gray-500" />
              <span className="text-gray-700">{point.date}</span>
            </div>
          )}
          
          {/* Time detail for events with start/end times */}
          {point.startTime && (
            <div className="flex items-center text-xs gap-1.5">
              <Clock size={14} className="text-gray-500" />
              <span className="text-gray-700">
                {point.startTime}{point.endTime ? ` - ${point.endTime}` : ''}
              </span>
            </div>
          )}
          
          {/* Price detail if available */}
          {point.price !== undefined && (
            <div className="flex items-center text-xs gap-1.5">
              <DollarSign size={14} className="text-gray-500" />
              <span className="text-gray-700 font-medium">
                {point.price === 0 ? 'Gratuito' : formatCurrency(point.price)}
              </span>
            </div>
          )}
        </div>
        
        {/* Rating stars if available */}
        {point.rating !== undefined && point.rating !== null && (
          <div className="flex items-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                className={star <= point.rating! ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}
              />
            ))}
            <span className="text-xs ml-1.5 font-medium">{point.rating.toFixed(1)}</span>
          </div>
        )}
        
        {/* Link to detail page if available */}
        {point.url && (
          <Link 
            to={point.url}
            className="flex items-center justify-center w-full mt-3 text-xs text-white bg-tuca-ocean-blue hover:bg-tuca-ocean-blue/90 py-1.5 px-3 rounded font-medium gap-1.5"
          >
            Ver detalhes
            <ExternalLink size={12} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default MapPopup;
