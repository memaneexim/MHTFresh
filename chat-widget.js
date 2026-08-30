(function() {
  const styles = `
    #trade-desk-btn { position:fixed; bottom:24px; left:24px; z-index:9999; background:#0B1E33; color:#fff; padding:10px 18px 10px 12px; border-radius:30px; font-weight:700; cursor:pointer; box-shadow:0 10px 30px rgba(0,0,0,0.3); transition:all 0.3s ease; display:flex; align-items:center; gap:10px; font-size:13px; font-family:'Plus Jakarta Sans',sans-serif; border:1px solid rgba(212,163,115,0.4); }
    #trade-desk-btn:hover { transform:translateY(-2px); background:#06121E; border-color:#D4A373; }
    .trade-avatar { width:30px; height:30px; border-radius:50%; background:linear-gradient(135deg,#1E5128,#16A34A); display:flex; align-items:center; justify-content:center; font-size:14px; }
    #trade-window { position:fixed; bottom:85px; left:24px; z-index:9999; width:360px; background:#fff; border-radius:14px; box-shadow:0 20px 60px rgba(0,0,0,0.3); display:none; flex-direction:column; overflow:hidden; border:1px solid #CBD5E1; font-family:'Inter',sans-serif; }
    #trade-window.open { display:flex; }
    #trade-window * { box-sizing: border-box; margin: 0; padding: 0; }
    .trade-head { background:#0B1E33; color:#fff; padding:16px; display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #D4A373; }
    .trade-head button { background:none; border:none; color:#fff; font-size:18px; cursor:pointer; }
    .trade-body { padding:16px; height:300px; overflow-y:auto; display:flex; flex-direction:column; gap:10px; background:#F8FAFC; }
    .trade-msg { padding:10px 14px; border-radius:10px; font-size:13px; max-width:85%; line-height:1.45; }
    .trade-msg.desk { background:#fff; color:#1E293B; border:1px solid #E2E8F0; align-self:flex-start; }
    .trade-msg.user { background:#0B1E33; color:#fff; align-self:flex-end; }
    .trade-foot { padding:12px; background:#fff; border-top:1px solid #E2E8F0; display:flex; gap:8px; }
    #trade-input { flex:1; border:1px solid #CBD5E1; border-radius:20px; padding:8px 14px; font-size:13px; outline:none; }
    .trade-foot button { background:#0B1E33; color:#D4A373; border:none; width:36px; height:36px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; font-weight:bold; }
  `;
  const styleSheet = document.createElement('style');
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  const widgetHTML = `
    <button id="trade-desk-btn" onclick="toggleTradeDesk()">
      <span class="trade-avatar">🌐</span>
      <span>Global Exporter Trade Desk</span>
    </button>
    <div id="trade-window">
      <div class="trade-head">
        <div>
          <b style="font-size:14px;display:block;">MHT Fresh Trade Desk</b>
          <span style="font-size:11px;color:#D4A373;">● Direct Inward Procurement Protocol</span>
        </div>
        <button onclick="toggleTradeDesk()">✕</button>
      </div>
      <div class="trade-body" id="trade-body">
        <div class="trade-msg desk">Welcome. We clear full container loads (40RF) through Nhava Sheva (JNPT) with onward cold-chain distribution across West India. Are you offering a fresh season crop?</div>
      </div>
      <div class="trade-foot">
        <input type="text" id="trade-input" placeholder="Type origin, fruit variety, or packaging..." onkeydown="if(event.key==='Enter')sendTradeMsg()">
        <button onclick="sendTradeMsg()">➤</button>
      </div>
    </div>
  `;
  const div = document.createElement('div');
  div.innerHTML = widgetHTML;
  document.body.appendChild(div);

  window.toggleTradeDesk = function() {
    document.getElementById('trade-window').classList.toggle('open');
  };

  window.sendTradeMsg = async function() {
    const input = document.getElementById('trade-input');
    const msg = input.value.trim();
    if(!msg) return;
    const body = document.getElementById('trade-body');
    
    const udiv = document.createElement('div');
    udiv.className = 'trade-msg user';
    udiv.textContent = msg;
    body.appendChild(udiv);
    input.value = '';
    body.scrollTop = body.scrollHeight;

    const ddiv = document.createElement('div');
    ddiv.className = 'trade-msg desk';
    ddiv.textContent = 'Routing to our procurement officers...';
    body.appendChild(ddiv);
    body.scrollTop = body.scrollHeight;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: msg})
      });
      const data = await res.json();
      ddiv.textContent = data.reply || 'Thank you for your consignment details. Please fill out our Exporter Partnership Intake form below or reach our direct trade desk on WhatsApp for formal Purchase Orders.';
    } catch(e) {
      ddiv.textContent = 'Trade desk is active. Please submit your packhouse packing list and CFR Nhava Sheva quote through the Exporter Intake form below.';
    }
    body.scrollTop = body.scrollHeight;
  };
})();