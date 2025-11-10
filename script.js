const botao = document.getElementById("check-btn");
const input = document.getElementById("news-link");
const mensagem = document.getElementById("message");

// Lista de sites confiáveis
const sitesConfiaveis = [
  "g1.globo.com",
  "bbc.com",
  "cnn.com",
  "uol.com.br",
  "folha.uol.com.br",
  "estadao.com.br",
  "aosfatos.org",
  "lupa.uol.com.br",
  "boatos.org"
];

// Lista de sites suspeitos (entretenimento, clickbait)
const sitesSuspeitos = [
  "choquei.com",
  "sensacionalista.com",
  "emprimeiralinha.com",
  "gossipbr.com"
];

// Palavras suspeitas na URL
const palavrasSuspeitas = [
  "choquei",
  "bomba",
  "escandalo",
  "exclusivo",
  "viral",
  "polêmica",
  "surpresa",
  "urgente"
];

botao.addEventListener("click", () => {
  const link = input.value.trim().toLowerCase();

  if (!link.startsWith("http")) {
    exibirMensagem("Digite um link válido começando com http:// ou https://", "erro");
    return;
  }

  try {
    const url = new URL(link);
    const dominio = url.hostname.replace("www.", "");

    let pontuacao = 0;

    // Avalia domínio
    if (sitesConfiaveis.includes(dominio)) {
      pontuacao += 2;
    } else if (sitesSuspeitos.includes(dominio)) {
      pontuacao -= 2;
    }

    // Avalia palavras suspeitas na URL
    palavrasSuspeitas.forEach(palavra => {
      if (link.includes(palavra)) pontuacao -= 1;
    });

    // Decide resultado
    if (pontuacao >= 2) {
      exibirMensagem(`✅ Notícia confiável. Site: "${dominio}"`, "sucesso");
    } else if (pontuacao <= -1) {
      exibirMensagem(`❌ Notícia provavelmente falsa. Site: "${dominio}"`, "erro");
    } else {
      exibirMensagem(`⚠️ Notícia suspeita. Site: "${dominio}"`, "alerta");
    }

  } catch {
    exibirMensagem("Link inválido.", "erro");
  }

  input.value = "";
});

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") botao.click();
});

function exibirMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = `resultado ${tipo}`;
}

