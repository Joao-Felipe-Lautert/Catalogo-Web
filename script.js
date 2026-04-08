// 1. CONFIGURAÇÃO DO BANCO DE DADOS
const supabaseUrl = "https://fnekquopeqracqhnteia.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuZWtxdW9wZXFyYWNxaG50ZWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNzIyODksImV4cCI6MjA4OTg0ODI4OX0.iIIw0fTQAIZlO3vR8tWiuS_r85c6YFioCS6OA3bVoL4";

// Inicia a conexão
const banco = window.supabase.createClient(supabaseUrl, supabaseKey);

// 2. FUNÇÃO PARA BUSCAR E DESENHAR OS PRODUTOS
async function carregarCatalogo() {
  // Faz um SELECT * FROM produtos na nuvem
  let { data: produtos, error } = await banco.from("produtos").select("*");

  if (error) {
    console.error("Erro ao buscar dados:", error);
    return;
  }

  let vitrine = document.getElementById("vitrine");
  vitrine.innerHTML = ""; // Limpa a tela

  // Loop para desenhar cada produto na telas
  produtos.forEach((item) => {
    // Cria a máscara de moeda Brasileira
    let precoFormatado = Number(item.preco).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    let div = document.createElement("div");
    div.className = "card-produto";
    div.innerHTML = `
        <img src="${item.image_src}" width="150">
        <h3>${item.nome}</h3>
        <p>${item.categoria}</p>
        <p class="preco-destaque">${precoFormatado}</p>
    `;
    vitrine.appendChild(div);
  });
}

// Roda a função assim que o site abrir
carregarCatalogo();
