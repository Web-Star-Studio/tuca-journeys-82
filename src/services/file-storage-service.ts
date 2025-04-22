
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

/**
 * Interface para resultados de operações de arquivo
 */
export interface FileResult {
  url: string;
  path: string;
  size?: number;
  contentType?: string;
}

export interface FileUploadOptions {
  /**
   * ID do usuário para organizar arquivos
   */
  userId?: string;
  /**
   * Sobrescrever arquivo se já existir
   */
  upsert?: boolean;
  /**
   * Validar o tipo do arquivo
   */
  validateType?: boolean;
  /**
   * Tipos de arquivo permitidos (ex: ['image/jpeg', 'image/png'])
   */
  allowedTypes?: string[];
  /**
   * Tamanho máximo em bytes (padrão: 5MB)
   */
  maxSize?: number;
  /**
   * Nome personalizado para o arquivo (sem extensão)
   */
  customName?: string;
  /**
   * Tempo de cache em segundos (padrão: 3600 = 1 hora)
   */
  cacheControl?: string;
}

/**
 * Serviço para gerenciamento de arquivos no Storage
 */
export class FileStorageService {
  /**
   * Verifica se um bucket existe e cria se não existir
   */
  static async ensureBucketExists(bucket: string): Promise<boolean> {
    try {
      // Verificar se o bucket existe
      const { data: buckets, error } = await supabase.storage.listBuckets();
      
      if (error) throw error;
      
      const bucketExists = buckets.some(b => b.name === bucket);
      
      // Se não existir, criar
      if (!bucketExists) {
        const { error: createError } = await supabase.storage.createBucket(bucket, {
          public: true
        });
        
        if (createError) throw createError;
        console.log(`Bucket '${bucket}' criado com sucesso`);
      }
      
      return true;
    } catch (error) {
      console.error(`Erro ao verificar/criar bucket '${bucket}':`, error);
      return false;
    }
  }

  /**
   * Faz upload de um arquivo para o bucket especificado
   */
  static async uploadFile(
    file: File,
    bucket: string,
    options: FileUploadOptions = {}
  ): Promise<FileResult | null> {
    const {
      userId,
      upsert = false,
      validateType = true,
      allowedTypes,
      maxSize = 5 * 1024 * 1024, // 5MB padrão
      customName,
      cacheControl = '3600'
    } = options;
    
    try {
      // Validar tipo de arquivo
      if (validateType && allowedTypes && !allowedTypes.includes(file.type)) {
        const errorMsg = `Tipo de arquivo não permitido. Tipos aceitos: ${allowedTypes.join(', ')}`;
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
      
      // Validar tamanho
      if (file.size > maxSize) {
        const errorMsg = `Arquivo muito grande (${(file.size / 1024 / 1024).toFixed(2)}MB). Tamanho máximo: ${(maxSize / 1024 / 1024).toFixed(2)}MB`;
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
      
      // Garantir que o bucket existe
      await this.ensureBucketExists(bucket);
      
      // Gerar nome de arquivo único
      const fileExt = file.name.split('.').pop();
      const fileName = customName 
        ? `${customName}.${fileExt}` 
        : `${uuidv4()}.${fileExt}`;
        
      const filePath = userId 
        ? `${userId}/${fileName}`
        : fileName;
      
      // Fazer upload para o Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl,
          upsert,
          contentType: file.type
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
    } catch (error: any) {
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
    } catch (error: any) {
      console.error('Erro ao excluir arquivo:', error);
      toast.error(`Erro ao excluir arquivo: ${error.message}`);
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
      
      if (!data) return [];
      
      return data.map(item => item.name);
    } catch (error: any) {
      console.error('Erro ao listar arquivos:', error);
      toast.error(`Erro ao listar arquivos: ${error.message}`);
      return [];
    }
  }

  /**
   * Copia um arquivo dentro do storage
   */
  static async copyFile(
    sourceBucket: string, 
    sourcePath: string,
    destinationBucket: string,
    destinationPath: string
  ): Promise<boolean> {
    try {
      // Primeiro baixamos o arquivo
      const { data: fileData, error: downloadError } = await supabase.storage
        .from(sourceBucket)
        .download(sourcePath);
        
      if (downloadError) throw downloadError;
      
      if (!fileData) {
        throw new Error('Arquivo de origem não encontrado');
      }
      
      // Depois fazemos upload para o destino
      const { error: uploadError } = await supabase.storage
        .from(destinationBucket)
        .upload(destinationPath, fileData);
        
      if (uploadError) throw uploadError;
      
      return true;
    } catch (error: any) {
      console.error('Erro ao copiar arquivo:', error);
      toast.error(`Erro ao copiar arquivo: ${error.message}`);
      return false;
    }
  }
}
