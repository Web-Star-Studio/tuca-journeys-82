
import React from "react";
import { PointData } from "./utils/mapData";

interface MapPopupProps {
  point: PointData;
  onClose: () => void;
}

const MapPopup = ({ point, onClose }: MapPopupProps) => {
  return (
    <div className="p-3 max-w-[250px]">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-sm">{point.name}</h3>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-800"
        >
          ×
        </button>
      </div>
      
      <p className="text-xs text-gray-600 mb-2">{point.description || point.category}</p>
      
      {point.category && (
        <div className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full inline-block">
          {point.category}
        </div>
      )}
    </div>
  );
};

export default MapPopup;
