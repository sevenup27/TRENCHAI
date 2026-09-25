# Production data layer

Use a Solana indexing provider for real transaction data. The application is deliberately split so the demo adapter can be replaced without changing the UI.

Recommended pipeline:
Solana history/stream -> normalized events -> PostgreSQL/ClickHouse -> wallet/token graph -> API -> Opus 5.5.

Keep provider and Anthropic keys server-side. Do not publish demo numbers as live on-chain statistics.
