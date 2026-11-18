
require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// Protecção básica dos cabeçalhos HTTP
app.use(helmet());

// Permite receber imagens em formato Base64
app.use(express.json({ limit: "8mb" }));

// Disponibiliza os ficheiros da pasta public
app.use(express.static("public"));

// Limita o número de pedidos para evitar abusos
app.use("/api/", rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 30,
    standardHeaders: "draft-7",
    legacyHeaders: false
}));

// Instruções para a leitura das fichas
const PR = 'Imagem de uma ficha de aposta escrita à mão. Cada selecção tem o formato CÓDIGO.PROGNÓSTICO: código de 4 dígitos, ponto, prognóstico (1, X, 2, 1X, 12, X2, +2.5, -2.5, GG ou NG). As selecções estão separadas por ponto e vírgula e podem ocupar várias linhas. Pode existir um valor de aposta. Devolve APENAS JSON: {"linhas":[{"c":"1001","p":"1","conf":0.95}],"valor":null}. Não adivinhes: se algo estiver ilegível usa conf baixa (abaixo de 0.5). Não inventes linhas.';

// Rota responsável pela leitura das fotografias
app.post("/api/ler-foto", async (req, res) => {
    try {
        const { imagem } = req.body || {};

        if (
            typeof imagem !== "string" ||
            !/^data:image\/(jpeg|jpg|png|webp);base64,/i.test(imagem)
        ) {
            return res.status(400).json({
                error: "Imagem inválida."
            });
        }

        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({
                error: "A chave da API não está configurada no servidor."
            });
        }

        const resposta = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
                },
                body: JSON.stringify({
                    model: process.env.GROQ_MODEL ||
                        "meta-llama/llama-4-scout-17b-16e-instruct",
                    temperature: 0,
                    response_format: {
                        type: "json_object"
                    },
                    messages: [{
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: PR
                            },
                            {
                                type: "image_url",
                                image_url: {
                                    url: imagem
                                }
                            }
                        ]
                    }]
                })
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            console.error("Erro da Groq:", resposta.status);
            return res.status(502).json({
                error: "Não foi possível processar a imagem na Groq."
            });
        }

        const conteudo = dados.choices?.[0]?.message?.content;

        if (!conteudo) {
            return res.status(502).json({
                error: "A Groq não devolveu um resultado válido."
            });
        }

        const resultado = JSON.parse(conteudo);

        return res.json(resultado);

    } catch (erro) {
        console.error("Erro no servidor:", erro.message);

        return res.status(500).json({
            error: "Ocorreu um erro ao processar a imagem."
        });
    }
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
