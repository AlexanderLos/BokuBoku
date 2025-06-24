# Boryokuland React

This repository contains a React app and a simple CLI utility called **Virsu-OP** for tracking Solana wallet transfers from the terminal.

## Virsu-OP

The CLI script lives in `cli/virsu-op.js` and can monitor one or more Solana addresses. It displays transfer information in a stylized, cyber‑punk fashion.

### Usage

```bash
node cli/virsu-op.js <ADDRESS_1> [ADDRESS_2 ...]
```

Set `SOLANA_RPC_URL` to use a custom RPC endpoint. The script polls every 15 seconds and prints new transfers.
