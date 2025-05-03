
import { Activity } from "@/types/activity";

// Convert database activity object to component activity object
export const adaptDBActivityToComponentActivity = (dbActivity: any): Activity => {
  return {
    id: dbActivity.id,
    title: dbActivity.title || dbActivity.name,
    description: dbActivity.description,
    short_description: dbActivity.short_description || dbActivity.description?.substring(0, 150) || '',
    duration: dbActivity.duration,
    price: dbActivity.price,
    image_url: dbActivity.image_url || dbActivity.image,
    gallery_images: dbActivity.gallery_images || [],
    category: dbActivity.category,
    difficulty: dbActivity.difficulty || 'normal',
    meeting_point: dbActivity.meeting_point,
    min_participants: dbActivity.min_participants || 1,
    max_participants: dbActivity.max_participants || 10,
    includes: dbActivity.includes || [],
    excludes: dbActivity.excludes || [],
    notes: dbActivity.notes || [],
    schedule: dbActivity.schedule || [],
    is_featured: dbActivity.is_featured || false,
    is_active: dbActivity.is_active !== false,
    partner_id: dbActivity.partner_id,
    rating: dbActivity.rating || 0,
    created_at: dbActivity.created_at || new Date().toISOString(),
    updated_at: dbActivity.updated_at || new Date().toISOString()
  };
};

// Convert component activity object to database activity object
export const adaptComponentActivityToDB = (activity: Partial<Activity>): any => {
  // Make a copy to avoid mutation
  const activityData = {
    title: activity.title,
    description: activity.description || '',
    short_description: activity.short_description || activity.description?.substring(0, 150) || '',
    duration: activity.duration,
    price: activity.price || 0,
    image_url: activity.image_url,
    gallery_images: activity.gallery_images || [],
    category: activity.category,
    difficulty: activity.difficulty || 'normal',
    meeting_point: activity.meeting_point,
    min_participants: activity.min_participants || 1,
    max_participants: activity.max_participants || 10,
    includes: activity.includes || [],
    excludes: activity.excludes || [],
    notes: activity.notes || [],
    schedule: activity.schedule || [],
    is_featured: activity.is_featured || false,
    is_active: activity.is_active !== false,
  };
  
  console.log('Activity data to be sent to DB:', activityData);
  
  return activityData;
};
