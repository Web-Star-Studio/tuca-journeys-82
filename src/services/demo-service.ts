
import { supabase } from "@/lib/supabase";

const DEMO_PARTNER_ID = "00000000-0000-0000-0000-000000000001";

export class DemoService {
  static isDemoUser(userId: string): boolean {
    return userId.startsWith("demo-");
  }
  
  static getDemoPartnerId(): string {
    return DEMO_PARTNER_ID;
  }
  
  static async ensureDemoUserHasPartner(userId: string): Promise<{ id: string }> {
    if (!this.isDemoUser(userId)) {
      throw new Error("Not a demo user");
    }
    
    try {
      // Check if demo partner already exists
      const { data: existingPartner } = await supabase
        .from('partners')
        .select('id')
        .eq('id', DEMO_PARTNER_ID)
        .single();
        
      if (existingPartner) {
        return existingPartner;
      }
      
      // Create demo partner if not exists
      const { data: partner, error } = await supabase
        .from('partners')
        .insert({
          id: DEMO_PARTNER_ID,
          user_id: userId,
          business_name: "Demo Partner Business",
          business_type: "tour",
          description: "This is a demo partner business for testing purposes.",
          is_verified: true,
          is_active: true,
          contact_email: "partner@demo.com"
        })
        .select('id')
        .single();
        
      if (error) {
        console.error("Error creating demo partner:", error);
        throw error;
      }
      
      return partner;
    } catch (error) {
      console.error("Error in ensureDemoUserHasPartner:", error);
      return { id: DEMO_PARTNER_ID };
    }
  }
}

export const demoService = DemoService;
