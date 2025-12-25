
import { createClient } from '@supabase/supabase-js';

/**
 * Função utilitária para buscar variáveis de ambiente de forma segura.
 * Evita o erro "Cannot read properties of undefined" ao verificar cada nível do objeto.
 */
const getEnvVar = (key: string): string => {
  try {
    // 1. Tenta acessar via import.meta (padrão Vite/ESM moderno)
    if (typeof import.meta !== 'undefined') {
      const metaEnv = (import.meta as any).env;
      if (metaEnv && typeof metaEnv === 'object') {
        return metaEnv[key] || '';
      }
    }
    
    // 2. Tenta acessar via process.env (padrão Node.js/Webpack/Vercel legacy)
    if (typeof process !== 'undefined' && process.env) {
      return process.env[key] || '';
    }
  } catch (e) {
    // Silencia erros de acesso para não quebrar a renderização
    console.warn(`Ambiente: Variável ${key} não pôde ser acessada de forma nativa.`);
  }
  return '';
};

// Busca as chaves ou usa placeholders seguros
const supabaseUrl = getEnvVar('VITE_SUPABASE_URL') || 'https://placeholder.supabase.co';
const supabaseKey = getEnvVar('VITE_SUPABASE_ANON_KEY') || 'placeholder';

// Inicialização do cliente Supabase
// Mesmo com dados falsos, o cliente é criado para não quebrar os imports, 
// mas as chamadas falharão graciosamente.
export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Verifica se o Supabase está configurado com chaves reais de produção.
 */
export const isProduction = ((): boolean => {
  if (!supabaseUrl || !supabaseKey) return false;
  if (supabaseUrl.includes('placeholder')) return false;
  if (supabaseKey === 'placeholder') return false;
  // Se a URL contém 'supabase.co' e não é o placeholder, assumimos produção
  return supabaseUrl.includes('supabase.co');
})();

console.log(`[Guito Plus] Sistema iniciado em modo: ${isProduction ? 'PRODUÇÃO' : 'DEMONSTRAÇÃO'}`);
