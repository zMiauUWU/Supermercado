const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let produtos = [
    { id: 1, nome: "Arroz", preco: 10.99 },
    { id: 2, nome: "Feijão", preco: 7.49 },
];

// Rota inicial
app.get("/", (req, res) => {
    res.send("Bem-vindo à API do supermercado!");
});

// Listar todos os produtos
app.get("/produtos", (req, res) => {
    res.json(produtos);
});

// Buscar um produto por ID
app.get("/produtos/:id", (req, res) => {
    const produto = produtos.find(p => p.id == req.params.id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(produto);
});

// Adicionar um novo produto
const { v4: uuidv4 } = require("uuid");

app.post("/produtos", (req, res) => {
    const { nome, preco } = req.body;
    if (!nome || !preco) return res.status(400).json({ erro: "Nome e preço são obrigatórios" });

    const novoProduto = { id: uuidv4(), nome, preco };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});


// Atualizar um produto
app.put("/produtos/:id", (req, res) => {
    const produto = produtos.find(p => p.id == req.params.id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });

    const { nome, preco } = req.body;
    if (nome) produto.nome = nome;
    if (preco) produto.preco = preco;

    res.json(produto);
});

// Deletar um produto
app.delete("/produtos/:id", (req, res) => {
    const index = produtos.findIndex(p => p.id == req.params.id);
    if (index === -1) return res.status(404).json({ erro: "Produto não encontrado" });

    produtos.splice(index, 1);
    res.status(204).send();
});

// Deletar todos os produtos
app.delete("/produtos", (req, res) => {
    produtos = []; // Esvazia o array de produtos
    res.status(204).send(); // Retorna 204 (No Content)
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
