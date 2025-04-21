
import { supabase } from "@/lib/supabase";

/**
 * Ensures the necessary storage buckets exist
 */
export async function ensureStorageBuckets(): Promise<boolean> {
  try {
    // Define the buckets we need
    const requiredBuckets = [
      { id: 'avatars', public: true },
      { id: 'tours', public: true },
      { id: 'accommodations', public: true },
      { id: 'events', public: true },
      { id: 'vehicles', public: true },
      { id: 'products', public: true },
      { id: 'partners', public: true },
      { id: 'public', public: true }
    ];
    
    // Check existing buckets
    const { data: existingBuckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('Error checking storage buckets:', error);
      return false;
    }
    
    // Create any missing buckets
    const existingBucketIds = existingBuckets.map(b => b.name);
    
    for (const bucket of requiredBuckets) {
      if (!existingBucketIds.includes(bucket.id)) {
        const { error } = await supabase.storage.createBucket(bucket.id, {
          public: bucket.public
        });
        
        if (error) {
          console.error(`Error creating bucket ${bucket.id}:`, error);
          return false;
        }
        
        console.log(`Created storage bucket: ${bucket.id}`);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error ensuring storage buckets:', error);
    return false;
  }
}

/**
 * Initialize the storage service on app startup
 */
export async function initializeStorage(): Promise<void> {
  try {
    await ensureStorageBuckets();
    console.log('Storage service initialized successfully');
  } catch (error) {
    console.error('Failed to initialize storage service:', error);
  }
}
