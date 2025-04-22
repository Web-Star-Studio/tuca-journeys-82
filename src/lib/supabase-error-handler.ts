
import { toast } from 'sonner';

interface ErrorHandlerOptions {
  showToast?: boolean;
  toastPrefix?: string;
  throwError?: boolean;
  customHandler?: (error: any) => void;
}

/**
 * Manipulador genérico de erros para operações do Supabase
 */
export const handleSupabaseError = (
  error: any, 
  message: string = 'Erro na operação',
  options: ErrorHandlerOptions = {}
) => {
  const { 
    showToast = true, 
    toastPrefix = '', 
    throwError = false,
    customHandler
  } = options;
  
  // Log detalhado no console
  console.error(message, error);
  
  // Formatar mensagem amigável
  let friendlyMessage = '';
  
  if (error?.code === '23505') {
    friendlyMessage = 'Este item já existe. Tente com informações diferentes.';
  } else if (error?.code === '42501') {
    friendlyMessage = 'Você não tem permissão para realizar esta operação.';
  } else if (error?.code === '42P01') {
    friendlyMessage = 'Erro no sistema. Por favor, contate o suporte.';
  } else if (error?.code === '23503') {
    friendlyMessage = 'Não foi possível realizar a operação devido a restrições de integridade.';
  } else if (error?.message?.includes('network')) {
    friendlyMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
  } else if (error?.message?.includes('JWT')) {
    friendlyMessage = 'Sua sessão expirou. Faça login novamente.';
  } else if (error?.message?.includes('row level security')) {
    friendlyMessage = 'Você não tem permissão para acessar este recurso.';
  } else if (error?.statusCode === 413) {
    friendlyMessage = 'O arquivo é muito grande. Tente um arquivo menor.';
  } else {
    friendlyMessage = error?.message || 'Ocorreu um erro inesperado.';
  }
  
  // Exibir toast se necessário
  if (showToast) {
    toast.error(`${toastPrefix ? `${toastPrefix}: ` : ''}${friendlyMessage}`);
  }
  
  // Chamar manipulador personalizado se fornecido
  if (customHandler) {
    customHandler(error);
  }
  
  // Lançar erro se necessário
  if (throwError) {
    throw new Error(friendlyMessage);
  }
  
  return {
    message: friendlyMessage,
    originalError: error,
    success: false
  };
};

/**
 * Helper para erros em operações de consulta
 */
export const handleQueryError = (error: any, context: string = '') => {
  return handleSupabaseError(error, `Erro ao buscar dados${context ? ` (${context})` : ''}`, {
    showToast: true,
    toastPrefix: 'Falha na consulta',
    throwError: false
  });
};

/**
 * Helper para erros em operações de mutação
 */
export const handleMutationError = (error: any, context: string = '') => {
  return handleSupabaseError(error, `Erro ao atualizar dados${context ? ` (${context})` : ''}`, {
    showToast: true,
    toastPrefix: 'Falha na operação',
    throwError: false
  });
};

/**
 * Helper para erros em operações de autenticação
 */
export const handleAuthError = (error: any, context: string = '') => {
  return handleSupabaseError(error, `Erro de autenticação${context ? ` (${context})` : ''}`, {
    showToast: true,
    toastPrefix: 'Autenticação',
    throwError: false
  });
};

/**
 * Helper para erros em operações de storage
 */
export const handleStorageError = (error: any, context: string = '') => {
  return handleSupabaseError(error, `Erro no sistema de arquivos${context ? ` (${context})` : ''}`, {
    showToast: true,
    toastPrefix: 'Armazenamento',
    throwError: false
  });
};
