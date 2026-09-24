# Stage 1: Install dependencies
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# Stage 2: Build the app
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Accept build arguments for environment variables
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

RUN corepack enable && pnpm build

# Stage 3: Production runner
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 asif

COPY --from=builder /app/public ./public
RUN mkdir .next && chown asif:nodejs .next
COPY --from=builder --chown=asif:nodejs /app/.next/standalone ./
COPY --from=builder --chown=asif:nodejs /app/.next/static ./.next/static

USER asif
EXPOSE 3069

ENV PORT=3069
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]