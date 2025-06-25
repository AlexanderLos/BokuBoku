import express from 'express';
import { WebSocketServer } from 'ws';
import { Connection, PublicKey, SystemInstruction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

const server = app.listen(port, () => {
  console.log(`Dashboard running at http://localhost:${port}`);
});

const wss = new WebSocketServer({ server });
const RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';
const addresses = process.env.MONITOR_ADDRS ? process.env.MONITOR_ADDRS.split(',') : [];

async function fetchTransfers(connection, address) {
  const sigs = await connection.getSignaturesForAddress(new PublicKey(address), { limit: 20 });
  const transfers = [];
  for (const sig of sigs) {
    const tx = await connection.getTransaction(sig.signature, { maxSupportedTransactionVersion: 0 });
    if (!tx) continue;
    for (const ix of tx.transaction.message.instructions) {
      if (ix.programId.equals(SystemInstruction.programId)) {
        try {
          const t = SystemInstruction.decodeTransfer(ix);
          transfers.push({ from: t.fromPubkey.toBase58(), to: t.toPubkey.toBase58(), lamports: t.lamports, sig: sig.signature });
        } catch {}
      }
    }
  }
  return transfers;
}

async function poll() {
  const connection = new Connection(RPC_URL, 'confirmed');
  const known = new Set();
  while (true) {
    for (const addr of addresses) {
      try {
        const transfers = await fetchTransfers(connection, addr);
        for (const tr of transfers) {
          if (known.has(tr.sig)) continue;
          known.add(tr.sig);
          const payload = { from: tr.from, to: tr.to, amount: tr.lamports / LAMPORTS_PER_SOL, sig: tr.sig };
          const msg = JSON.stringify(payload);
          for (const client of wss.clients) {
            if (client.readyState === 1) client.send(msg);
          }
        }
      } catch (err) {
        console.error(`Error fetching tx for ${addr}: ${err.message}`);
      }
    }
    await new Promise(r => setTimeout(r, 15000));
  }
}

if (addresses.length) {
  poll();
} else {
  console.log('Set MONITOR_ADDRS env variable to monitor wallet addresses');
}
