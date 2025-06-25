# Boryoku Dashboard

This project provides two utilities:

- **Dashboard** – a small Express server that serves a local web dashboard showing Solana transfers in a cyber‑punk style.
- **Virsu-OP** – a CLI script for tracking Solana wallet transfers from the terminal.

## Running the Dashboard

Install dependencies and start the server:

```bash
npm install
npm start
```

Set `MONITOR_ADDRS` to a comma separated list of wallet addresses to monitor. Optionally, set `SOLANA_RPC_URL` to a custom RPC endpoint.

The dashboard will be available at <http://localhost:3000>.

## Virsu-OP CLI

The CLI lives in `cli/virsu-op.js` and accepts one or more wallet addresses:

```bash
node cli/virsu-op.js <ADDRESS_1> [ADDRESS_2 ...]
```

Transfers are displayed in the terminal using bright colours. Set `SOLANA_RPC_URL` if you need to use a different RPC endpoint.
