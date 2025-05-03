
import React from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, Clock, MapPin, Star, Users } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { Activity } from "@/types/activity";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={activity.image_url}
          alt={activity.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white text-tuca-ocean-blue">
            {activity.category}
          </Badge>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{activity.title}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{activity.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {activity.short_description}
        </p>
        <div className="flex flex-wrap text-sm text-gray-500 mb-4 gap-y-2">
          <div className="w-1/2 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{activity.duration}</span>
          </div>
          <div className="w-1/2 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{activity.meeting_point || "Local designado"}</span>
          </div>
          <div className="w-1/2 flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>Até {activity.max_participants} pessoas</span>
          </div>
          <div className="w-1/2 flex items-center">
            <Badge variant={activity.difficulty === "fácil" ? "success" : 
                         activity.difficulty === "moderado" ? "warning" : "destructive"}
                  className="text-xs py-0 h-5">
              {activity.difficulty || "Normal"}
            </Badge>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="font-bold text-tuca-ocean-blue">
            {formatCurrency(activity.price)}
          </div>
          <Link to={`/atividades/${activity.id}`}>
            <Button size="sm">Ver detalhes</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
