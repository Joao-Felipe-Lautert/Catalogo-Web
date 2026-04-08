const supabaseUrl = "https://fnekquopeqracqhnteia.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuZWtxdW9wZXFyYWNxaG50ZWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNzIyODksImV4cCI6MjA4OTg0ODI4OX0.iIIw0fTQAIZlO3vR8tWiuS_r85c6YFioCS6OA3bVoL4";
const banco = window.supabase.createClient(supabaseUrl, supabaseKey);

async function fazerLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("mensagem");
  const btn = document.getElementById("btn-entrar");

  // Efeito de carregamento (Feedback visual)
  btn.innerText = "Verificando...";
  btn.disabled = true;

  // Comando que tenta logar no Supabase
  const { data, error } = await banco.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    msg.innerText = "Acesso Negado: " + error.message;
    msg.style.color = "red";
    btn.innerText = "Entrar no Painel";
    btn.disabled = false; // Libera o botão novamente
  } else {
    msg.innerText = "Acesso concedido! Carregando painel...";
    msg.style.color = "green";
    setTimeout(() => {
      window.location.href = "admin.html";
    }, 1000);
  }
}

// Alterna entre texto escondido e visível
function mostrarSenha() {
  let inputSenha = document.getElementById("password");
  let btnOlho = document.getElementById("btn-olho");

  if (inputSenha.type === "password") {
    inputSenha.type = "text";
    btnOlho.innerText = "🙈"; // Troca o emoji
  } else {
    inputSenha.type = "password";
    btnOlho.innerText = "👁️";
  }
}

// Seleciona o campo de entrada
const enterPress = document.getElementById("password");

// Adiciona o ouvinte de evento 'keydown'
enterPress.addEventListener("keydown", function (event) {
  // Verifica se a tecla pressionada foi 'Enter'
  if (event.key === "Enter") {
    fazerLogin();
    // Coloque sua função aqui (ex: enviarFormulario())
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Pergunta ao Supabase se existe um usuário logado (seguro)
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // 2. Se a resposta for sim (usuário existir), redireciona
  if (user) {
    window.location.href = "admin.html";
  }
});
