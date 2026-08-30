// ============================================================
// MHT FRESH — Cloudflare Pages Functions API Router
// Location: functions/api/[[route]].js
// ============================================================

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...CORS } });
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api\/?/, '').replace(/\/$/, '');

  if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });

  // 1. EXPORTER INTAKE / PROPOSAL SUBMISSION
  if (request.method === 'POST' && path === 'exporter-inquiry') {
    const body = await request.json().catch(() => ({}));
    if (env && env.KV) {
      const submissions = (await env.KV.get('exporter_proposals')) || '[]';
      const arr = JSON.parse(submissions);
      arr.unshift({
        id: 'prop_' + Date.now(),
        date: new Date().toISOString(),
        ...body
      });
      await env.KV.put('exporter_proposals', JSON.stringify(arr.slice(0, 500)));
    }
    return json({ ok: true, msg: 'Consignment offer registered with MHT Fresh import desk.' });
  }

  // 2. LIVE DESK CHAT ROUTER
  if (request.method === 'POST' && path === 'chat') {
    const body = await request.json().catch(() => ({}));
    const text = (body.message || '').toLowerCase();
    
    let reply = "MHT Fresh contracts 40RF Controlled Atmosphere containers CIF/CFR Nhava Sheva (JNPT). Please specify your fruit, box net weight, count sizing, and available shipping window.";
    
    if (text.includes('dragon') || text.includes('pitahaya') || text.includes('vietnam')) {
      reply = "We continuously import Vietnamese White & Red Pitahaya (Counts 20-26, 9kg/18kg foam cartons) under Form AI preferential tariff into Nhava Sheva.";
    } else if (text.includes('grape') || text.includes('muscat') || text.includes('china')) {
      reply = "For Chinese table grapes (Shine Muscat & Red Globe), we require dual-release SO2 pads, cold-treatment PQ protocols, and 4kg/6.5kg net carton packaging.";
    } else if (text.includes('apple') || text.includes('chile') || text.includes('south africa') || text.includes('turkey')) {
      reply = "We import Royal Gala and Red Fuji apples in 18kg bushel cartons (Counts 100-138) with strict 0°C to +1°C cold chain monitoring.";
    } else if (text.includes('lc') || text.includes('payment') || text.includes('terms')) {
      reply = "We operate via verified Irrevocable Letters of Credit (LC) and structured TT terms with accredited Indian commercial banking partners.";
    }

    return json({ ok: true, reply });
  }

  return json({ ok: true, name: 'MHT Fresh Import API', status: 'Operational' });
}