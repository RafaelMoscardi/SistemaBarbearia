# Comandos Úteis

## Configuração Inicial

```bash
# Instalar dependências
npm install

# Configurar banco de dados (PostgreSQL deve estar rodando)
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Executar migrations
npx prisma migrate dev --name init

# Popular banco com dados de exemplo
npx prisma db seed

# Iniciar servidor de desenvolvimento
npm run dev
```

## Desenvolvimento

```bash
# Gerar cliente Prisma após mudanças no schema
npx prisma generate

# Criar nova migration
npx prisma migrate dev --name nome_da_migration

# Reset do banco (CUIDADO - apaga todos os dados)
npx prisma migrate reset

# Visualizar banco de dados
npx prisma studio

# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch

# Verificar tipos TypeScript
npm run typecheck

# Executar linting
npm run lint

# Formatar código
npx prettier --write .
```

## Produção

```bash
# Build para produção
npm run build

# Iniciar em modo produção
npm start

# Executar migrations em produção
npx prisma migrate deploy

# Build e teste de produção
npm run build && npm start
```

## Docker

```bash
# Build da imagem
docker build -t sistema-barbearia .

# Executar container
docker run -p 3000:3000 --env-file .env sistema-barbearia

# Docker Compose (se você criar um docker-compose.yml)
docker-compose up -d
```

## Banco de Dados

```bash
# Backup do banco
pg_dump -U postgres -h localhost barbearia_db > backup.sql

# Restaurar backup
psql -U postgres -h localhost barbearia_db < backup.sql

# Conectar ao banco via psql
psql -U postgres -h localhost -d barbearia_db
```

## Prisma Úteis

```bash
# Ver schema atual
npx prisma db pull

# Sincronizar schema com banco (desenvolvimento)
npx prisma db push

# Formatar schema.prisma
npx prisma format

# Validar schema
npx prisma validate

# Ver status das migrations
npx prisma migrate status
```

## Git

```bash
# Primeira configuração
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main

# Workflow normal
git add .
git commit -m "feat: descrição das mudanças"
git push

# Criar branch para feature
git checkout -b feature/nome-da-feature
git push -u origin feature/nome-da-feature
```

## Ambiente de Produção

### Vercel
1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. Deploy automático

### Railway/Render
1. Conecte repositório
2. Configure PostgreSQL addon
3. Configure variáveis de ambiente
4. Deploy

### VPS/Servidor
```bash
# Clone do repositório
git clone <repo-url>
cd sistema-barbearia

# Configurar Node.js, PostgreSQL
# Configurar .env
# PM2 para gerenciar processo
npm install -g pm2
npm run build
pm2 start npm --name "barbearia" -- start
pm2 startup
pm2 save
```