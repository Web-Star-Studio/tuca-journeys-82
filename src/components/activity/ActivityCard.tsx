
import React from "react";
import { Link } from "react-router-dom";
import { Activity } from "@/types/activity";
import { formatCurrency } from "@/utils/format-utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Clock, Map, Users, User, Star } from "lucide-react";

interface ActivityCardProps {
  activity: Activity;
  viewMode?: 'grid' | 'list';
}

const ActivityCard: React.FC<ActivityCardProps> = ({ 
  activity, 
  viewMode = 'grid'
}) => {
  // Get difficulty badge color based on level
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty.toLowerCase()) {
      case 'fácil':
        return 'bg-green-100 text-green-800';
      case 'moderado':
        return 'bg-blue-100 text-blue-800';
      case 'difícil':
        return 'bg-orange-100 text-orange-800';
      case 'extremo':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden border hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 h-48 md:h-auto">
            <img 
              src={activity.image_url || '/placeholder-activity.jpg'} 
              alt={activity.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col flex-1 p-4">
            <div className="mb-2 flex justify-between items-start">
              <div>
                <Badge className="mb-2">{activity.category}</Badge>
                <h3 className="text-xl font-medium">{activity.title}</h3>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                <span className="font-medium">{activity.rating}</span>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {activity.short_description}
            </p>
            
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{activity.duration}</span>
              </div>
              <div className="flex items-center">
                <Map className="h-4 w-4 mr-1" />
                <span>{activity.meeting_point}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>Até {activity.max_participants} pessoas</span>
              </div>
              <div className="flex items-center">
                <Badge 
                  variant="outline" 
                  className={`${getDifficultyColor(activity.difficulty)} border-0 text-xs`}
                >
                  {activity.difficulty}
                </Badge>
              </div>
            </div>
            
            <div className="mt-auto flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">
                  {formatCurrency(activity.price)}
                </p>
                <p className="text-xs text-muted-foreground">por pessoa</p>
              </div>
              <Button asChild>
                <Link to={`/atividades/${activity.id}`}>
                  Ver Detalhes
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      <div className="relative h-48">
        <img 
          src={activity.image_url || '/placeholder-activity.jpg'} 
          alt={activity.title} 
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-2 left-2">
          {activity.category}
        </Badge>
        {activity.is_featured && (
          <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600">
            Destaque
          </Badge>
        )}
      </div>
      <CardContent className="pt-4 flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{activity.title}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
            <span className="font-medium">{activity.rating}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {activity.short_description}
        </p>
        
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{activity.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>Até {activity.max_participants}</span>
          </div>
          <Badge 
            variant="outline" 
            className={`${getDifficultyColor(activity.difficulty)} border-0 text-xs mt-1`}
          >
            {activity.difficulty}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <div>
          <p className="font-bold text-lg">
            {formatCurrency(activity.price)}
          </p>
          <p className="text-xs text-muted-foreground">por pessoa</p>
        </div>
        <Button size="sm" variant="outline" asChild>
          <Link to={`/atividades/${activity.id}`}>
            <span>Detalhes</span>
            <ArrowRight className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActivityCard;
