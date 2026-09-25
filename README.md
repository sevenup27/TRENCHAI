# TRENCHAI

### AI-Powered On-Chain Intelligence for the Solana Trenches

TRENCHAI is an on-chain research platform designed to connect **wallets, tokens, trades, and behavioral patterns** into one searchable intelligence layer.

The core idea is simple:

> **Don't just look at a token. Follow the wallets behind it.**

TRENCHAI turns individual blockchain events into relationships that can be explored across wallets and tokens, then uses **Claude Opus 5.5** to analyze the indexed observations and explain patterns.

---

## Overview

Solana produces an enormous amount of trading activity every day.

A single token can involve hundreds or thousands of wallets. A single wallet can move through dozens of tokens. Those interactions create a network of relationships that is difficult to investigate manually.

TRENCHAI is built around that problem.

Instead of treating every transaction as an isolated event, TRENCHAI models the market as a connected structure:

```text
TOKEN
  ↓
WALLET
  ↓
TRADE
  ↓
ANOTHER TOKEN
  ↓
ANOTHER WALLET
  ↓
NEW CONNECTION
```

This allows researchers and traders to move from one observation to another and investigate the larger trail behind it.

---

# Core Modules

## RADAR

The market activity layer.

RADAR is designed to provide a compact view of token activity, including:

- token price
- liquidity
- trading volume
- recent observed trades
- buy/sell activity
- token-level activity changes

The production architecture is designed so RADAR can consume normalized on-chain data rather than relying on frontend-only calculations.

---

## WALLETS

The wallet intelligence layer.

A wallet profile can contain:

- observed trades
- buy/sell history
- tokens traded
- transaction activity
- wallet-to-token relationships
- historical behavioral patterns

The objective is to make a wallet an entity that can be investigated instead of just displaying a public address.

Example workflow:

```text
Find wallet
    ↓
Open wallet history
    ↓
See previous tokens
    ↓
Open another token
    ↓
Find other wallets
    ↓
Continue investigation
```

---

## NETWORK

The core graph layer.

NETWORK connects wallets and tokens based on observed trading activity.

Conceptually:

```text
Wallet A ───── Token X
    │             │
    │             │
    └──── Token Y ┘
          │
       Wallet B
```

Each wallet and token becomes a node.

Observed trading activity becomes an edge.

This creates an explorable graph of relationships across the Solana ecosystem.

The architecture is designed to support future graph features such as:

- wallet clusters
- shared token exposure
- repeated wallet overlap
- multi-hop wallet discovery
- token-to-token relationship paths
- activity clusters
- temporal graph analysis

---

## JOURNAL

The research timeline.

JOURNAL stores observations detected by the analytics layer.

Examples:

- multiple wallets entering the same token
- repeated wallet overlap
- unusual activity concentration
- new wallet/token connections
- recurring behavioral patterns

The purpose is to create a persistent research trail instead of forcing users to rediscover the same information manually.

---

# AI ANALYSIS

TRENCHAI uses **Claude Opus 5.5** as an analysis layer on top of indexed observations.

The model is not intended to invent blockchain activity.

Instead, the application provides the model with structured observations such as:

```text
wallet
token
trade
side
amount
timestamp
relationships
```

The AI then analyzes the supplied data and returns structured observations.

Example:

```text
Wallet cluster detected

5 wallets purchased the same token during the
observed window.

3 of these wallets also traded another common token.

Further investigation recommended:
inspect the shared wallet history and timing.
```

The architecture deliberately separates:

```text
ON-CHAIN DATA
      ↓
NORMALIZATION
      ↓
ANALYTICS
      ↓
GRAPH
      ↓
AI ANALYSIS
```

This separation is important because the AI should analyze evidence rather than become the source of the evidence.

---

# Architecture

```text
                     ┌──────────────────┐
                     │   Solana Data    │
                     │ RPC / Indexer    │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │     Indexer      │
                     │ Transactions     │
                     │ Token Metadata   │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │    Database      │
                     │ PostgreSQL /     │
                     │ ClickHouse       │
                     └────────┬─────────┘
                              │
                 ┌────────────┴────────────┐
                 ▼                         ▼
        ┌────────────────┐        ┌────────────────┐
        │   Analytics    │        │  Graph Engine  │
        │ Wallet metrics │        │ Wallet ↔ Token │
        │ Trade patterns │        │ relationships  │
        └────────┬───────┘        └───────┬────────┘
                 │                        │
                 └────────────┬───────────┘
                              ▼
                     ┌──────────────────┐
                     │       API        │
                     └────────┬─────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
             ┌────────────┐     ┌──────────────┐
             │  Web App   │     │ Opus 5.5 AI  │
             │ RADAR       │     │ Analysis     │
             │ WALLETS     │     │ Explanations │
             │ NETWORK     │     └──────────────┘
             │ JOURNAL     │
             └────────────┘
```

---

# Project Structure

```text
TRENCHAI/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── docs/
│   └── PRODUCTION.md
│
├── public/
│   ├── index.html
│   ├── app.js
│   └── styles.css
│
├── src/
│   ├── ai.ts
│   ├── data.ts
│   └── server.ts
│
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

---

# Technology Stack

### Application

- TypeScript
- Node.js
- Express
- HTML / CSS / JavaScript

### AI

- Anthropic API
- Claude Opus 5.5

### Data Layer

Designed for:

- Solana RPC / indexing providers
- PostgreSQL
- ClickHouse for high-volume analytical workloads

### Graph Layer

Wallets and tokens are modeled as entities connected by observed trading relationships.

This makes it possible to build higher-level graph analytics without coupling the frontend to the underlying blockchain provider.

---

# Data Pipeline

The intended production pipeline is:

```text
Solana
   ↓
Transaction ingestion
   ↓
Transaction parsing
   ↓
Trade normalization
   ↓
Wallet / token entities
   ↓
Database
   ↓
Graph construction
   ↓
Analytics
   ↓
API
   ↓
Web application
   ↓
AI analysis
```

A key design principle is **normalized data**.

Different Solana data providers may expose transactions in different formats. TRENCHAI should normalize those events into a consistent internal representation before analytics are performed.

---

# Example Normalized Trade

```json
{
  "wallet": "WALLET_ADDRESS",
  "token": "TOKEN_ADDRESS",
  "side": "BUY",
  "solAmount": 12.4,
  "timestamp": "2026-09-25T12:00:00Z",
  "signature": "TRANSACTION_SIGNATURE"
}
```

Once normalized, the same event can power:

- RADAR
- WALLETS
- NETWORK
- JOURNAL
- AI ANALYSIS

---

# AI Grounding

TRENCHAI follows a simple rule:

> **The blockchain data is the source of truth. AI is the analysis layer.**

The model should not be asked to create:

- wallet addresses
- transaction signatures
- prices
- volumes
- PnL figures
- trades
- token activity

Those values should come from indexed data.

AI receives selected observations and can:

- summarize activity
- identify relationships
- describe repeated patterns
- compare observed behavior
- suggest areas for further investigation
- explain graph connections in natural language

AI output should always remain distinguishable from raw on-chain observations.

---

# Example Investigation

A typical investigation can start with a single token.

```text
1. Open TOKEN X
          ↓
2. Find recent buyers
          ↓
3. Select WALLET A
          ↓
4. Open wallet history
          ↓
5. Discover TOKEN Y
          ↓
6. Find other buyers of TOKEN Y
          ↓
7. Discover WALLET B
          ↓
8. Compare activity
          ↓
9. Ask AI to analyze the observed relationships
```

This is the central workflow TRENCHAI is designed around.

---

# API

The current development API exposes:

```text
GET  /api/status
GET  /api/radar
GET  /api/wallets
GET  /api/network
POST /api/analyze
```

The API layer is intentionally separated from the frontend so the same data can later power:

- web applications
- dashboards
- alerts
- Discord/Telegram bots
- external research tools
- automated monitoring services

---

# Environment Variables

Copy:

```bash
cp .env.example .env
```

Then configure:

```env
PORT=3000

DATABASE_URL=

HELIUS_API_KEY=

ANTHROPIC_API_KEY=

ANTHROPIC_MODEL=claude-opus-5-5
```

API keys must remain server-side.

Never expose them inside frontend JavaScript or commit `.env` to GitHub.

---

# Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Type-check the project:

```bash
npm run typecheck
```

Build:

```bash
npm run build
```

---

# Production Roadmap

## Phase 1 — Foundation

- [x] Web application
- [x] RADAR interface
- [x] Wallet interface
- [x] Network interface
- [x] AI analysis endpoint
- [x] Opus 5.5 integration
- [x] TypeScript backend
- [x] CI workflow

## Phase 2 — On-Chain Indexing

- [ ] Solana transaction ingestion
- [ ] Historical wallet indexing
- [ ] Swap parsing
- [ ] Token metadata indexing
- [ ] PostgreSQL schema
- [ ] Incremental synchronization
- [ ] Real-time event processing

## Phase 3 — Intelligence

- [ ] Wallet behavior profiles
- [ ] Wallet clustering
- [ ] Token relationship graph
- [ ] Temporal activity analysis
- [ ] Pattern detection
- [ ] Advanced JOURNAL events
- [ ] AI research summaries

## Phase 4 — Monitoring

- [ ] Wallet watchlists
- [ ] Token watchlists
- [ ] Real-time alerts
- [ ] Custom filters
- [ ] Telegram/Discord notifications
- [ ] Saved investigations

## Phase 5 — Advanced Graph Intelligence

- [ ] Multi-hop wallet discovery
- [ ] Graph path exploration
- [ ] Cluster analysis
- [ ] Relationship scoring
- [ ] Historical pattern comparison
- [ ] Large-scale graph visualization

---

# Security

TRENCHAI is designed with a server-side secret model.

### Never expose

- `ANTHROPIC_API_KEY`
- Solana provider API keys
- database credentials

### Recommended production controls

- environment-based secrets
- API authentication
- rate limiting
- request validation
- database connection pooling
- structured logging
- monitoring
- encrypted transport
- least-privilege database credentials

---

# Important Data Integrity Principles

TRENCHAI should distinguish between:

### Observed data

Directly indexed blockchain activity.

### Derived metrics

Calculations made from observed activity.

### AI interpretation

Natural-language analysis of the observed and derived data.

These three layers should never be presented as if they are the same thing.

---

# Why TRENCHAI

Most blockchain data is fragmented across explorers, charts, wallets and transaction pages.

TRENCHAI is built around a different workflow:

```text
Don't just inspect a transaction.

Follow the relationship.

Don't just inspect a wallet.

Follow its history.

Don't just inspect a token.

Follow the wallets around it.

Then let AI help explain the structure.
```

---

# Current Status

TRENCHAI is under active development.

The repository currently contains a working application shell, API layer, graph-oriented data model, demo dataset, and Opus 5.5 analysis integration.

The production milestone is connecting the same architecture to a real Solana indexing pipeline and persistent analytical database.

Demo data is intentionally labeled as demo data and must not be presented as live blockchain statistics.

---

# Disclaimer

TRENCHAI is an on-chain research and analytics project.

It does not guarantee trading performance, token performance, profitability, or future market movements.

AI-generated observations are informational and should be independently verified against the underlying blockchain data.

---

# License

License terms will be added before public production release.

---

## TRENCHAI

**Follow the money. Find the signal.**

Built for the Solana trenches.
