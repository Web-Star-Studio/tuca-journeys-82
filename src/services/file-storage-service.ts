
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

type FileCategory = 'avatars' | 'tours' | 'accommodations' | 'events' | 'products' | 'vehicles' | 'partners';

export class FileStorageService {
  /**
   * Upload file to Supabase storage
   */
  static async uploadFile(
    file: File,
    category: FileCategory,
    userId?: string,
    itemId?: string | number
  ): Promise<{ path: string; url: string } | null> {
    try {
      // Create file path with unique ID to prevent collisions
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      let filePath = '';
      
      // Organize files by category and owner
      if (userId) {
        filePath = `${userId}/${fileName}`;
      } else if (itemId) {
        filePath = `${itemId}/${fileName}`;
      } else {
        filePath = fileName;
      }

      // Upload the file to the correct bucket
      const { error: uploadError } = await supabase
        .storage
        .from(category) // Use the category as bucket name
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Error uploading file:', uploadError);
        return null;
      }

      // Get the public URL for the file
      const { data } = supabase
        .storage
        .from(category) // Use the same bucket for consistency
        .getPublicUrl(filePath);

      return { 
        path: filePath,
        url: data.publicUrl
      };
    } catch (error) {
      console.error('File upload error:', error);
      return null;
    }
  }

  /**
   * Delete file from Supabase storage
   */
  static async deleteFile(bucket: FileCategory, filePath: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .storage
        .from(bucket)
        .remove([filePath]);

      if (error) {
        console.error('Error deleting file:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('File deletion error:', error);
      return false;
    }
  }

  /**
   * Update database record with file reference
   */
  static async updateFileReference(
    tableName: "tours" | "accommodations" | "events" | "vehicles" | "partners" | "products" | "user_profiles",
    columnName: string,
    recordId: string | number,
    fileUrl: string
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(tableName)
        .update({ [columnName]: fileUrl })
        .eq('id', recordId);

      if (error) {
        console.error('Error updating file reference:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('File reference update error:', error);
      return false;
    }
  }
}
