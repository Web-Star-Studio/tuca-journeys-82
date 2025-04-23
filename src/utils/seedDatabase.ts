
import { supabase } from "@/lib/supabase";
import { demoData } from "./demoDataGenerator";
import { toast } from "sonner";

/**
 * Seeds the database with initial data for production/demo purposes
 * This function should be called once during initial setup
 */
export const seedDatabase = async () => {
  try {
    console.log("Starting database seeding process...");
    
    // Insert tours
    for (const tour of demoData.tours) {
      const { error } = await supabase
        .from('tours')
        .upsert({
          title: tour.title,
          short_description: tour.short_description,
          description: tour.description,
          price: tour.price,
          category: tour.category,
          duration: tour.duration,
          max_participants: tour.max_participants,
          min_participants: tour.min_participants,
          difficulty: tour.difficulty,
          rating: tour.rating,
          image_url: tour.image_url,
          gallery_images: tour.gallery_images,
          schedule: tour.schedule,
          includes: tour.includes,
          excludes: tour.excludes,
          notes: tour.notes,
          meeting_point: tour.meeting_point,
        });
      
      if (error) throw error;
    }
    
    // Insert accommodations
    for (const accommodation of demoData.accommodations) {
      const { error } = await supabase
        .from('accommodations')
        .upsert({
          title: accommodation.title,
          short_description: accommodation.description,
          description: accommodation.description,
          price_per_night: accommodation.price_per_night,
          type: accommodation.type,
          max_guests: accommodation.max_guests,
          bedrooms: accommodation.bedrooms,
          bathrooms: accommodation.bathrooms,
          amenities: accommodation.amenities,
          rating: accommodation.rating,
          image_url: accommodation.image_url,
          gallery_images: accommodation.gallery_images,
          address: accommodation.address,
        });
      
      if (error) throw error;
    }
    
    // Insert products
    for (const product of demoData.products) {
      const { error } = await supabase
        .from('products')
        .upsert({
          name: product.name,
          description: product.description,
          image_url: product.image_url,
          price: product.price,
          category: product.category,
          stock: product.stock,
          status: product.status,
          featured: product.featured,
        });
      
      if (error) throw error;
    }
    
    console.log("Database seeding completed successfully!");
    return { success: true };
  } catch (error) {
    console.error("Error seeding database:", error);
    toast.error("Erro ao semear o banco de dados");
    return { success: false, error };
  }
};

/**
 * Creates an initial admin user
 * @param email Admin email
 * @param password Admin password
 */
export const createInitialAdmin = async (email: string, password: string) => {
  try {
    // Check if the user already exists
    const { data: existingUser } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('email', email)
      .single();
      
    if (existingUser) {
      console.log("Admin user already exists");
      return { success: true, message: "Admin already exists" };
    }
    
    // Register the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: "Administrador",
          role: "admin"
        }
      }
    });
    
    if (authError) throw authError;
    
    if (authData?.user) {
      // Add admin role to the user
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert([
          { user_id: authData.user.id, role: 'admin' }
        ]);
      
      if (roleError) throw roleError;
      
      console.log("Initial admin user created successfully!");
      return { success: true };
    }
    
    return { success: false, error: "Failed to create user" };
  } catch (error) {
    console.error("Error creating initial admin:", error);
    return { success: false, error };
  }
};
