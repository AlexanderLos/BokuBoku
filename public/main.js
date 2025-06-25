const container = document.getElementById('transfers');
const ws = new WebSocket(`ws://${location.host}`);

ws.onmessage = (ev) => {
  const data = JSON.parse(ev.data);
  const div = document.createElement('div');
  div.className = 'transfer';
  div.textContent = `${data.from} -> ${data.to} ${data.amount} SOL`;
  container.prepend(div);
};
