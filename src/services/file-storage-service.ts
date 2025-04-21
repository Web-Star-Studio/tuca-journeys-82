
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

/**
 * Interface para resultados de operações de arquivo
 */
interface FileResult {
  url: string;
  path: string;
  size?: number;
  contentType?: string;
}

/**
 * Serviço para gerenciamento de arquivos no Storage
 */
export class FileStorageService {
  /**
   * Faz upload de um arquivo para o bucket especificado
   */
  static async uploadFile(
    file: File,
    bucket: string,
    userId?: string
  ): Promise<FileResult | null> {
    try {
      // Gerar nome de arquivo único
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = userId 
        ? `${userId}/${fileName}`
        : fileName;
      
      // Fazer upload para o Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) throw error;
      
      // Gerar URL pública para o arquivo
      const { data: publicUrl } = supabase.storage
        .from(bucket)
        .getPublicUrl(data?.path || '');
      
      return {
        url: publicUrl.publicUrl,
        path: data?.path || '',
        size: file.size,
        contentType: file.type
      };
    } catch (error) {
      console.error('Erro ao fazer upload do arquivo:', error);
      return null;
    }
  }
  
  /**
   * Remove um arquivo do Storage
   */
  static async deleteFile(bucket: string, path: string): Promise<boolean> {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erro ao excluir arquivo:', error);
      return false;
    }
  }
  
  /**
   * Lista arquivos em um diretório específico
   */
  static async listFiles(bucket: string, prefix?: string): Promise<string[]> {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(prefix || '');
      
      if (error) throw error;
      
      return data.map(item => item.name);
    } catch (error) {
      console.error('Erro ao listar arquivos:', error);
      return [];
    }
  }
}
