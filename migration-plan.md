# Plano de Migração para Next.js

## Visão Geral
Este documento descreve o plano para migrar o projeto Tuca Journeys da stack atual (React/Vite) para Next.js, mantendo a integração com Supabase e Tailwind CSS.

## Benefícios da Migração
- **Renderização do lado do servidor (SSR)**: Melhora SEO e performance inicial
- **Geração de sites estáticos (SSG)**: Para páginas que não precisam de dados dinâmicos
- **API Routes**: Simplifica a arquitetura backend
- **Otimização de imagens**: Melhor performance com Next/Image
- **Roteamento baseado em arquivos**: Simplifica a organização

## Fases de Migração

### Fase 1: Configuração e Estrutura Base
- Criar novo projeto Next.js usando `create-next-app`
- Configurar Tailwind CSS e shadcn/ui
- Migrar configurações do TypeScript
- Configurar integração com Supabase
- Estabelecer estrutura de diretórios Next.js
- Configurar ambiente de desenvolvimento

### Fase 2: Migração de Componentes Cruciais
1. **Componentes UI Base**
   - Migrar componentes do diretório `/src/components/ui`
   - Adaptar para usar o sistema de importação do Next.js

2. **Layout e Componentes Compartilhados**
   - Header/Footer
   - Navegação
   - Autenticação
   - Layouts de página

3. **Contextos e Providers**
   - AuthContext
   - CartContext
   - ThemeContext
   - Providers de dados

### Fase 3: Migração de Páginas Principais
1. **Páginas de maior tráfego:**
   - Página inicial (Index)
   - Tours
   - Accommodations
   - Packages

2. **Funcionalidades críticas para o negócio:**
   - Sistema de reservas
   - Checkout
   - Autenticação de usuário

### Fase 4: Migração de Funcionalidades Secundárias
- Dashboard do usuário
- Wishlist
- Notificações
- Páginas administrativas

### Fase 5: Otimizações e Melhorias
- Implementar ISR (Incremental Static Regeneration) para páginas de conteúdo
- Otimizar carregamento de imagens com Next/Image
- Implementar caching de API
- Adicionar análise de performance
- Implementar testes automatizados

## Estratégia Técnica

### Roteamento
- Migrar de `/src/routes` para estrutura baseada em arquivos em `/app` ou `/pages`
- Implementar middlewares para rotas protegidas
- Configurar redirecionamentos para URLs legadas

### Fetching de Dados
- Migrar hooks personalizados para usar SWR ou React Query
- Implementar getServerSideProps/getStaticProps onde apropriado
- Criar API Routes para endpoints do backend

### Componentização
- Priorizar componentes do lado do cliente vs. servidor
- Refatorar para usar Server Components onde beneficiar performance

### Autenticação
- Adaptar integração Supabase para Next.js Auth
- Implementar middleware de autenticação

## Cronograma Estimado
- **Fase 1**: 1-2 semanas
- **Fase 2**: 2-3 semanas
- **Fase 3**: 3-4 semanas
- **Fase 4**: 2-3 semanas
- **Fase 5**: 2-3 semanas

## Testes e Validação
- Desenvolver suíte de testes automatizados
- Implementar testes A/B para comparar performance
- Monitorar métricas Web Vitals antes e depois da migração

## Riscos e Mitigações
- **Compatibilidade de bibliotecas**: Verificar compatibilidade com Next.js antecipadamente
- **Performance**: Monitorar e otimizar durante a migração
- **SEO**: Garantir redirecionamentos adequados e preservação de URLs
- **Tempo de inatividade**: Implementar migração gradual com ambas versões executando em paralelo

## Rollback Plan
- Manter sistema atual operacional durante a migração
- Implementar estratégia de feature flags para nova implementação
- Estabelecer métricas claras para decisão de rollback