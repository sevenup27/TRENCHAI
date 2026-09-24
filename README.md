# TRENCHAI

AI-assisted trading bot for Pump.fun-style Solana markets.

## What this repo does

- Fetches Solana token/market data from configurable data sources.
- Sends normalized market snapshots to Claude for a structured trading decision.
- Runs in **paper-trading mode by default**.
- Includes a small web dashboard for bot status, positions, decisions and logs.
- Keeps live execution behind an explicit adapter so private keys are never sent to the AI model.

> **Important:** TRENCHAI is experimental trading software. Memecoin markets can move extremely fast and you can lose the entire trading balance. The default mode is paper trading.

## Model

The Anthropic API currently documents the API model name `claude-opus-5-5`. Set `ANTHROPIC_MODEL` in `.env` to the exact model available to your Anthropic account. Do not hard-code a model name that your account does not provide.

## Quick start

### 1. Requirements

- Node.js 20+
- npm 10+
- An Anthropic API key for AI analysis
- A Solana RPC URL

### 2. Install

```bash
npm install
cp .env.example .env
```

Edit `.env`:

```env
ANTHROPIC_API_KEY=your_key_here
ANTHROPIC_MODEL=claude-opus-5-5
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
TRADING_MODE=paper
```

### 3. Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## Architecture

```text
Market data -> Normalizer -> Risk checks -> Claude -> Decision engine
                                      |
                                      v
                                Paper executor
                                      |
                                      v
                                  Dashboard
```

The AI only receives market information and returns a strict JSON decision. It never receives private keys.

## Live trading

This repository intentionally does not ship a production private-key executor. Pump.fun and Solana transaction mechanics can change, and live trading requires validating the current contract/integration path before risking funds.

To add a live executor, implement `src/execution/executor.ts` and keep:

```env
TRADING_MODE=paper
```

until you have independently audited the transaction-building and signing code.

## Security

- Never commit `.env`.
- Never put a seed phrase/private key in prompts.
- Use a dedicated low-balance wallet for testing.
- Add spend limits, slippage limits, cooldowns and kill switches before live execution.

## License

MIT


## Claude Opus 5.5

TRENCHAI is configured for Anthropic's Claude Opus 5.5 API model: `claude-opus-5-5`.
Claude Opus 5.5 uses adaptive thinking, which is always enabled. Thinking depth is controlled with `output_config.effort`; this project uses `medium` by default.
