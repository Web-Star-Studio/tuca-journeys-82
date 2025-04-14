
# Tuca Noronha - Instruções de Lançamento

Este documento contém as instruções para o lançamento da plataforma Tuca Noronha.

## Pré-requisitos

1. Conta no Supabase configurada com as tabelas necessárias
2. Servidor web para hospedar a aplicação
3. Domínio configurado (opcional, mas recomendado)

## Passo a Passo para Lançamento

### 1. Configuração do Banco de Dados

O sistema utiliza o Supabase como backend. As tabelas necessárias são:

- `user_profiles`: Perfis de usuários
- `user_roles`: Funções dos usuários (admin, customer)
- `tours`: Passeios disponíveis
- `accommodations`: Acomodações disponíveis
- `bookings`: Reservas
- `products`: Produtos disponíveis

### 2. Inicialização da Plataforma

Ao acessar a plataforma pela primeira vez, você será direcionado para a página de configuração inicial (`/setup`). Nesta página você poderá:

1. Inicializar o banco de dados com dados iniciais
2. Criar o primeiro usuário administrador

### 3. Verificação das Funcionalidades

Antes de divulgar a plataforma, verifique se todas as funcionalidades estão operando corretamente:

- Cadastro e login de usuários
- Listagem e detalhes de passeios, acomodações e pacotes
- Carrinho de compras e checkout
- Painel administrativo
- Relatórios e análises

### 4. Configurações de Ambiente

Verifique as configurações de ambiente para produção:

- Variáveis de ambiente corretamente configuradas
- URLs e endpoints apontando para os servidores de produção
- Configurações de autenticação e segurança

### 5. Acesso Administrativo

Após a inicialização, você pode acessar o painel administrativo através de `/admin` usando as credenciais do administrador criado.

## Suporte e Contato

Para suporte técnico ou dúvidas sobre a plataforma, entre em contato:

Email: suporte@tucanoronha.com
