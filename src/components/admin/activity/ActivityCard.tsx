
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, PencilIcon, CalendarIcon, Trash2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/formatters";
import { Switch } from "@/components/ui/switch";
import { Activity } from "@/types/activity";
import { useActivityMutations } from "@/hooks/activities/use-activity-mutations";

export interface ActivityCardProps {
  activity: Activity;
  onEditActivity?: (activity: Activity) => void;
  onDeleteActivity?: (activity: Activity) => void;
  onEdit?: (activity: Activity) => void;
  onDelete?: (activity: Activity) => void;
  disabled?: boolean;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  onEdit,
  onDelete,
  onEditActivity,
  onDeleteActivity,
  disabled = false,
}) => {
  const { toggleActivityFeatured, toggleActivityActive } = useActivityMutations();

  const handleFeaturedToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    
    toggleActivityFeatured(activity);
  };
  
  const handleActiveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    
    toggleActivityActive(activity);
  };

  // Handle both naming conventions for edit/delete functions
  const handleEdit = (activity: Activity) => {
    if (onEdit) onEdit(activity);
    else if (onEditActivity) onEditActivity(activity);
  };
  
  const handleDelete = (activity: Activity) => {
    if (onDelete) onDelete(activity);
    else if (onDeleteActivity) onDeleteActivity(activity);
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
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Destaque:</span>
            <Switch 
              checked={activity.is_featured ?? false} 
              onCheckedChange={() => {}} 
              onClick={handleFeaturedToggle}
              disabled={disabled}
            />
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Ativo:</span>
            <Switch 
              checked={activity.is_active ?? true} 
              onCheckedChange={() => {}} 
              onClick={handleActiveToggle}
              disabled={disabled}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-2 pt-2 border-t">
        <Link to={`/admin/activities/${activity.id}/availability`}>
          <Button 
            variant="outline" 
            className="w-full" 
            size="sm"
            disabled={disabled}
          >
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span className="sr-only sm:not-sr-only sm:inline-block sm:text-xs">Datas</span>
          </Button>
        </Link>
        <Button
          variant="outline"
          className="w-full"
          size="sm"
          onClick={() => handleEdit(activity)}
          disabled={disabled}
        >
          <PencilIcon className="h-4 w-4 mr-1" />
          <span className="sr-only sm:not-sr-only sm:inline-block sm:text-xs">Editar</span>
        </Button>
        <Button
          variant="outline"
          className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
          size="sm"
          onClick={() => handleDelete(activity)}
          disabled={disabled}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          <span className="sr-only sm:not-sr-only sm:inline-block sm:text-xs">Excluir</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActivityCard;
