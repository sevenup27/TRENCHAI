# TRENCHAI

AI-powered Solana on-chain intelligence.

TRENCHAI connects wallets, tokens and trades into an explorable graph and uses Claude Opus 5.5 to analyze observed data.

## Modules
- RADAR — token activity
- WALLETS — wallet history
- NETWORK — wallet/token graph
- JOURNAL — detected observations
- AI ANALYSIS — grounded analysis from indexed data

## Architecture
Solana data -> indexer -> database -> graph/analytics -> API -> web UI -> Claude Opus 5.5

The included app runs with deterministic demo data until a Solana provider and database are configured. It never presents demo data as live on-chain data.

## Quick start
```bash
npm install
cp .env.example .env
npm run dev
```
Open http://localhost:3000

## Environment
See `.env.example`.

ANTHROPIC_MODEL defaults to `claude-opus-5-5`.

For production, connect a Solana indexing provider (for example Helius) and PostgreSQL/ClickHouse, then replace the demo data adapter with the provider adapter.

This repository is an engineering foundation, not financial advice or a guarantee of trading performance.
