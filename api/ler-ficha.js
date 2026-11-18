// api/ler-ficha.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  // Proteção simples: só 1 foto de cada vez, limite de tamanho
  const { imageUrl } = req.body || {};
  if (!imageUrl || typeof imageUrl !== 'string') {
    return res.status(400).json({ error: 'Falta a imagem' });
  }

  const PR = 'Imagem de uma ficha de aposta escrita à mão. Cada selecção tem o formato CÓDIGO.PROGNÓSTICO: código de 4 dígitos, ponto, prognóstico (1, X, 2, 1X, 12, X2, +2.5, -2.5, GG ou NG). As selecções estão separadas por ponto e vírgula e podem ocupar várias linhas. Pode existir um valor de aposta. Devolve APENAS JSON: {"linhas":[{"c":"1001","p":"1","conf":0.95}],"valor":null}. Não adivinhes: se algo estiver ilegível usa conf baixa (abaixo de 0.5). Não inventes linhas.';

  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.GROQ_API_KEY
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        temperature: 0,
        response_format: { type: 'json_object' },
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: PR },
            { type: 'image_url', image_url: { url: imageUrl } }
          ]
        }]
      })
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: 'Erro na Groq' });
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: 'Erro no servidor' });
  }
}