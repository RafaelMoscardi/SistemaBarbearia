# Sistema de Barbearia Multi-unidade

Sistema completo de gestão para barbearias com múltiplas unidades, portal do cliente, gestão de barbeiros, comissões, programa de fidelidade e muito mais.

## 🚀 Funcionalidades Principais

### Portal do Cliente
- Agendamento online com seleção de unidade, barbeiro e serviço
- Histórico de atendimentos
- Avaliações de serviços
- Programa de fidelidade com pontos
- Carteirinha digital do plano
- Reagendamento e cancelamento

### Painel Administrativo (OWNER/MANAGER)
- Dashboard com KPIs e métricas
- Gestão de múltiplas unidades
- Cadastro de barbeiros e serviços
- Controle de preços por unidade
- Relatórios financeiros exportáveis
- Sistema de comissões configurável
- Planos e assinaturas

### Área do Barbeiro
- Agenda pessoal
- Bloqueio de horários
- Visualização de comissões
- Fechamento de período

### Funcionalidades Técnicas
- Multi-tenant com isolamento por organização
- RBAC (Role-Based Access Control)
- Dark mode
- Internacionalização (pt-BR)
- Acessibilidade básica
- Rate limiting
- Audit logs

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Banco de Dados**: PostgreSQL
- **Autenticação**: NextAuth.js
- **Validação**: Zod
- **Gerenciamento de Estado**: React Query

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/sistema-barbearia.git
cd sistema-barbearia
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados:

Crie um arquivo `.env` baseado no `.env.example`:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/barbearia_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="gere-uma-chave-secreta-aqui"
```

4. Execute as migrations do banco de dados:
```bash
npx prisma migrate dev
```

5. Popule o banco com dados de exemplo:
```bash
npx prisma db seed
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Acesse: http://localhost:3000

## 🔑 Credenciais de Teste

Após executar o seed, você pode acessar o sistema com:

- **Admin**: admin@barbeariapremium.com / senha123
- **Barbeiro**: carlos@barbeariapremium.com / senha123
- **Cliente**: cliente1@email.com / senha123

## 📁 Estrutura do Projeto

```
sistema-barbearia/
├── prisma/
│   ├── schema.prisma       # Schema do banco de dados
│   └── seed.ts            # Script de seed
├── public/                # Arquivos estáticos
├── src/
│   ├── app/              # App Router do Next.js
│   │   ├── api/          # API Routes
│   │   ├── app/          # Painel admin
│   │   ├── auth/         # Páginas de autenticação
│   │   ├── barber/       # Área do barbeiro
│   │   └── portal/       # Portal do cliente
│   ├── components/       # Componentes React
│   │   └── ui/          # Componentes de UI
│   ├── lib/             # Utilitários e configurações
│   ├── hooks/           # Custom React hooks
│   └── types/           # TypeScript types
├── .env.example         # Exemplo de variáveis de ambiente
├── next.config.js       # Configuração do Next.js
├── tailwind.config.ts   # Configuração do Tailwind
└── package.json         # Dependências do projeto
```

## 🧪 Testes

Execute os testes com:
```bash
npm test
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Importe o projeto no Vercel
3. Configure as variáveis de ambiente
4. Deploy automático

### Docker

```bash
docker build -t sistema-barbearia .
docker run -p 3000:3000 sistema-barbearia
```

## 📊 Funcionalidades Detalhadas

### Sistema de Comissões
- Configuração de percentuais por serviço
- Override por barbeiro
- Relatórios por período
- Fechamento mensal

### Programa de Fidelidade
- Acúmulo de pontos por valor gasto
- Resgate via cupons
- Planos Basic/Pro/Premium
- Benefícios exclusivos

### Multi-unidade
- Horários independentes por unidade
- Preços diferenciados
- Relatórios consolidados
- Gestão centralizada

### Dashboard e KPIs
- Faturamento por período
- Taxa de ocupação
- Ticket médio
- Top serviços/barbeiros
- Exportação CSV

## 🔒 Segurança

- Autenticação JWT
- Isolamento multi-tenant
- Rate limiting nas APIs
- Validação de dados com Zod
- Audit logs de ações sensíveis
- Sanitização de inputs

## 📝 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Iniciar produção
npm run lint         # Linting
npm run typecheck    # Type checking
npm run db:migrate   # Executar migrations
npm run db:seed      # Popular banco
npm run db:studio    # Prisma Studio
```

## 🤝 Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para suporte@barbeariapremium.com ou abra uma issue no GitHub.

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)

---

Desenvolvido com ❤️ para modernizar a gestão de barbearias