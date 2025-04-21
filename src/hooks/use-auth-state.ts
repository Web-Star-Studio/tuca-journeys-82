
import { useState, useEffect, useRef } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Usar uma ref para controlar se o componente está montado
  const isMounted = useRef<boolean>(true);

  // Inicializar o estado de autenticação
  useEffect(() => {
    // Função para verificar a sessão atual
    const checkCurrentSession = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        
        // Verificar se o componente ainda está montado
        if (isMounted.current) {
          setSession(sessionData.session);
          setUser(sessionData.session?.user ?? null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);
        if (isMounted.current) {
          setLoading(false);
        }
      }
    };

    // Configurar o listener para mudanças de estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Estado de autenticação alterado:", event);
        
        if (isMounted.current) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          setLoading(false);
        }
      }
    );
    
    // Verificar sessão existente
    checkCurrentSession();

    // Cleanup
    return () => {
      isMounted.current = false;
      subscription.unsubscribe();
    };
  }, []);

  return { user, session, loading, setLoading };
};
