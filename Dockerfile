# Etapa 1: Build da aplicação
FROM node:20 AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Etapa 2: Produção
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copia apenas o necessário para rodar a aplicação em produção
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npx", "next", "start"]
