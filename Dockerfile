FROM node:18 as builder

WORKDIR /app
COPY ./package*.json ./
COPY ./backend/ ./backend/
COPY ./pnpm*.yaml ./

RUN npm install -g pnpm
RUN pnpm install --filter backend

WORKDIR /app/backend
RUN npx prisma generate
RUN pnpm build

FROM node:18-alpine

WORKDIR /app
COPY --from=builder app/node_modules ./node_modules

WORKDIR /app/backend
COPY --from=builder app/backend/dist ./dist
COPY --from=builder app/backend/node_modules ./node_modules
COPY ./backend/prisma ./prisma
# COPY ./backend/.env .
COPY ./backend/entrypoint.sh .

RUN chmod +x entrypoint.sh
CMD ["./entrypoint.sh"]