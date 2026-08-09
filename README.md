# CEX

A simple centralized exchange (CEX) built with three services:

- **cex-fe** — React + Vite + Tailwind UI (tickers, stock detail, portfolio, orders)
- **cex-be** — Express API + Prisma/PostgreSQL. Validates orders and pushes them to Redis.
- **cex-engine** — Reads orders from Redis, matches them in memory orderbooks, settles trades.

## Flow

1. UI submits an order via the API.
2. Backend checks it and queues it in Redis.
3. Engine picks it up, matches it in the orderbook, and settles balances.

## Tech

React, Vite, Tailwind, TypeScript, Express, Prisma, PostgreSQL, Redis