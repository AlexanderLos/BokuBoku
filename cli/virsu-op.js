#!/usr/bin/env node

import { Connection, PublicKey, SystemInstruction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import chalk from 'chalk';
import ora from 'ora';

const RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';

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

async function main() {
  const addresses = process.argv.slice(2);
  if (addresses.length === 0) {
    console.log('Usage: virsu-op <SOL_ADDRESS> [more addresses...]');
    process.exit(1);
  }

  console.log(chalk.magenta.bold('\nVirsu-OP - Solana Wallet Tracker\n'));
  const connection = new Connection(RPC_URL, 'confirmed');
  const known = new Set();
  const spinner = ora('Fetching transactions...').start();
  while (true) {
    for (const addr of addresses) {
      try {
        const transfers = await fetchTransfers(connection, addr);
        for (const tr of transfers) {
          if (known.has(tr.sig)) continue;
          known.add(tr.sig);
          spinner.stop();
          const amount = tr.lamports / LAMPORTS_PER_SOL;
          console.log(`${chalk.cyan(tr.from)} ${chalk.yellow('->')} ${chalk.cyan(tr.to)} ${chalk.green(`${amount} SOL`)} (${tr.sig})`);
          spinner.start();
        }
      } catch (err) {
        spinner.stop();
        console.error(chalk.red(`Error fetching tx for ${addr}: ${err.message}`));
        spinner.start();
      }
    }
    await new Promise(r => setTimeout(r, 15000));
  }
}

main();
