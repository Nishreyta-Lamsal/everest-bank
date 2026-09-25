# ────────────────────────────────────────────────────────────
# Everest Bank frontend (Next.js 16)
#
# Deliberately NOT an `output: "standalone"` image. next.config.ts reads
# API_PROXY_TARGET to build the /media rewrite, and `next start` re-reads the
# config on every boot, so the backend address stays a runtime value. A
# standalone build serialises the config into the image and the address would
# be baked in at build time instead.
# ────────────────────────────────────────────────────────────

FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Compiled into the client bundle, so it has to exist here; setting it at
# runtime is too late. Keep it relative: the browser calls this app's own
# /api/v1 proxy so the session cookie stays first-party. See
# src/lib/api/base-url.ts.
ARG NEXT_PUBLIC_API_BASE_URL=/api/v1
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

RUN npm run build

# The runner needs `next` and its runtime dependencies, nothing else. Dropping
# the build-only tree takes the image from about 1.7 GB to a third of that.
RUN npm prune --omit=dev

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/next.config.ts ./next.config.ts

USER nextjs
EXPOSE 3000

CMD ["./node_modules/.bin/next", "start"]
