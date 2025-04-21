
import { supabase } from "@/lib/supabase";

// Este arquivo está mantido apenas para referência.
// Em ambiente de produção, não deveríamos ter dados de demonstração.

export class DemoService {
  static isDemoUser(userId: string): boolean {
    return false; // Em produção, não há usuários demo
  }
  
  static getDemoPartnerId(): string {
    throw new Error("Demo functionality is disabled in production");
  }
  
  static async ensureDemoUserHasPartner(userId: string): Promise<{ id: string }> {
    throw new Error("Demo functionality is disabled in production");
  }
}

export const demoService = DemoService;
