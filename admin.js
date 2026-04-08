// 1. CONFIGURAÇÃO DO BANCO (Igual fizemos na Fase 1)
const supabaseUrl = "https://fnekquopeqracqhnteia.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuZWtxdW9wZXFyYWNxaG50ZWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNzIyODksImV4cCI6MjA4OTg0ODI4OX0.iIIw0fTQAIZlO3vR8tWiuS_r85c6YFioCS6OA3bVoL4";
const banco = window.supabase.createClient(supabaseUrl, supabaseKey);

async function verificarAcesso() {
  // Pergunta ao Supabase: Tem alguém logado?
  const {
    data: { user },
  } = await banco.auth.getUser();

  if (!user) {
    alert("Área restrita! Faça login primeiro.");
    window.location.href = "login.html"; // Expulsa o invasor
  } else {
    // Se estiver logado, mostra quem é
    document.getElementById("nome-usuario").innerText = user.email;
  }
}
verificarAcesso();

// 2. FUNÇÃO DE CADASTRO
async function cadastrarProduto() {
  // Captura os valores digitados no HTML
  let nomeProduto = document.getElementById("input-nome").value;
  let precoProduto = document.getElementById("input-preco").value;
  let imagemProduto = document.getElementById("input-imagem").value;
  let categoriaProduto = document.getElementById("input-categoria").value;
  let aviso = document.getElementById("mensagem-aviso");

  // Validação de segurança básica
  if (nomeProduto === "" || precoProduto === "") {
    aviso.innerText = "Preencha todos os campos!";
    aviso.style.color = "red";
    return;
  }

  aviso.innerText = "Salvando na nuvem...";
  aviso.style.color = "blue";

  // Envia o comando INSERT para a tabela 'produtos' no Supabase
  let { error } = await banco.from("produtos").insert([
    {
      nome: nomeProduto,
      categoria: categoriaProduto,
      preco: precoProduto,
      image_src: imagemProduto,
    },
  ]);

  // Verifica se deu erro ou se foi sucesso
  if (error) {
    aviso.innerText = "Erro ao salvar: " + error.message;
    aviso.style.color = "red";
  } else {
    aviso.innerText = "Produto cadastrado com sucesso!";
    aviso.style.color = "green";

    // Limpa as caixas de texto para o próximo cadastro
    document.getElementById("input-nome").value = "";
    document.getElementById("input-preco").value = "";
    document.getElementById("input-imagem").value = "";
    document.getElementById("input-categoria").value = "";
  }
}

async function sairDoSistema() {
  await banco.auth.signOut();
  window.location.href = "index.html"; // Manda de volta para a vitrine pública
}
