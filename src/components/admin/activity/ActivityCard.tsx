
import React from "react";
import { Activity } from "@/types/activity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, PencilIcon, CalendarIcon, Trash2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/formatters";
import { Switch } from "@/components/ui/switch";
import { useActivities } from "@/modules/activities";

interface ActivityCardProps {
  activity: Activity;
  onEdit: (activity: Activity) => void;
  onDelete: (activity: Activity) => void;
  disabled?: boolean;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onEdit,
  onDelete,
  disabled = false,
}) => {
  const { toggleActivityFeatured, toggleActivityActive } = useActivities();

  const handleFeaturedToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    
    toggleActivityFeatured({ 
      activityId: activity.id, 
      isFeatured: !(activity.is_featured ?? false) 
    });
  };
  
  const handleActiveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    
    toggleActivityActive({ 
      activityId: activity.id, 
      isActive: !(activity.is_active ?? true)
    });
  };
  
  return (
    <Card className={`overflow-hidden ${!(activity.is_active ?? true) ? 'opacity-70' : ''}`}>
      <div
        className="h-40 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${activity.image_url || "/placeholder.jpg"})`,
        }}
      >
        {(activity.is_featured ?? false) && (
          <Badge className="absolute top-2 right-2 bg-yellow-500">
            Destaque
          </Badge>
        )}
        {!(activity.is_active ?? true) && (
          <Badge className="absolute top-2 left-2 bg-red-500">
            Desativado
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="truncate">{activity.title}</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm">{activity.rating}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pb-2">
        <div className="text-sm text-muted-foreground line-clamp-2">
          {activity.short_description}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Duração:</span>
          <span className="font-medium">{activity.duration}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Capacidade:</span>
          <span className="font-medium">{activity.max_participants} pessoas</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Preço:</span>
          <span className="font-medium">{formatCurrency(activity.price)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Categoria:</span>
          <span className="font-medium">{activity.category}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Dificuldade:</span>
          <span className="font-medium capitalize">{activity.difficulty}</span>
        </div>
        
        <div className="pt-3 border-t flex items-center justify-between">
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(activity)}
              disabled={disabled}
            >
              <PencilIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={disabled}
              onClick={() => onDelete(activity)}
              className="text-red-500 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <Link to={`/atividades/${activity.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center space-x-1" onClick={handleFeaturedToggle}>
              <Switch
                checked={activity.is_featured ?? false}
                disabled={disabled}
              />
              <span className="text-xs">Destaque</span>
            </div>
            
            <div className="flex items-center space-x-1" onClick={handleActiveToggle}>
              <Switch
                checked={activity.is_active ?? true}
                disabled={disabled}
              />
              <span className="text-xs">Ativo</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
