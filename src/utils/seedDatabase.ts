
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface SeedResult {
  success: boolean;
  message: string;
}

/**
 * Função para inicializar o banco de dados com dados básicos
 */
export async function seedDatabase(): Promise<SeedResult> {
  try {
    // Configurar buckets de armazenamento
    const bucketsToCreate = [
      { id: 'avatars', public: true },
      { id: 'tours', public: true },
      { id: 'accommodations', public: true },
      { id: 'events', public: true },
      { id: 'products', public: true },
      { id: 'vehicles', public: true },
      { id: 'partners', public: true },
      { id: 'public', public: true }
    ];
    
    for (const bucket of bucketsToCreate) {
      const { error } = await supabase.storage.createBucket(
        bucket.id, 
        { public: bucket.public }
      );
      
      if (error && !error.message.includes('already exists')) {
        throw error;
      }
    }
    
    // Criar configurações iniciais do sistema
    const { error: settingsError } = await supabase
      .from('system_settings')
      .upsert([
        { key: 'site_name', value: 'Tuca Noronha' },
        { key: 'contact_email', value: 'contato@tucanoronha.com' },
        { key: 'setup_completed', value: 'true' }
      ]);
    
    if (settingsError) throw settingsError;
    
    // Salvar flag de inicialização no localStorage (para desenvolvimento)
    localStorage.setItem('databaseSeeded', 'true');
    
    return {
      success: true,
      message: "Banco de dados inicializado com sucesso",
    };
  } catch (error) {
    console.error("Erro ao inicializar banco de dados:", error);
    return {
      success: false,
      message: "Erro ao inicializar o banco de dados",
    };
  }
}

/**
 * Marca o processo de setup como concluído
 */
export async function markSetupAsComplete(): Promise<SeedResult> {
  try {
    // Salvar no Supabase
    const { error } = await supabase
      .from('system_settings')
      .upsert([{ key: 'setup_completed', value: 'true' }]);
    
    if (error) throw error;
    
    // Para demonstração, salvamos no localStorage também
    localStorage.setItem('setupCompleted', 'true');
    
    return {
      success: true,
      message: "Setup marcado como concluído",
    };
  } catch (error) {
    console.error("Erro ao marcar setup como concluído:", error);
    return {
      success: false,
      message: "Erro ao finalizar o setup",
    };
  }
}
