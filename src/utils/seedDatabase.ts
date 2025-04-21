
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
    
    // Salvar as configurações iniciais como itens no LocalStorage
    // em vez de tentar usar uma tabela inexistente
    localStorage.setItem('site_name', 'Tuca Noronha');
    localStorage.setItem('contact_email', 'contato@tucanoronha.com');
    localStorage.setItem('setup_completed', 'true');
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
    // Salvar no localStorage em vez de uma tabela inexistente
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
