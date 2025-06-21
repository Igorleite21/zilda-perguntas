const perguntasOriginais = [
      {
        pergunta: "Qual o melhor pãozinho da vida?",
        alternativas: ["Pão francês da padaria", "Pão caseiro da vó", "Pão de forma", "Pão integral"],
        correta: 1
      },
      {
        pergunta: "Comida mais clássica de vó:",
        alternativas: ["Strogonoff", "Pizza", "Arroz, feijão e bife", "Nuggets"],
        correta: 2
      },
      {
        pergunta: "Vó sempre tem o quê na bolsa?",
        alternativas: ["Tablet", "Dinheiro trocado", "Docinho ou bala", "Controle remoto"],
        correta: 2
      },
      {
        pergunta: "O que tem no colo de vó?",
        alternativas: ["Wi-Fi", "Conforto e carinho", "Celular", "Cobertor furado"],
        correta: 1
      },
      {
        pergunta: "Qual sobremesa lembra vó?",
        alternativas: ["Pudim", "Sorvete", "Mousse", "Torta gelada"],
        correta: 0
      },
      {
        pergunta: "Quando você tá triste, a vó:",
        alternativas: ["Te dá bronca", "Te abraça e faz café", "Te ignora", "Manda mensagem"],
        correta: 1
      },
      {
        pergunta: "Qual cheiro lembra vó?",
        alternativas: ["Perfume importado", "Leite com chocolate", "Comida na panela", "Colônia e bolo assando"],
        correta: 3
      },
      {
        pergunta: "Vó chama o neto de:",
        alternativas: ["Senhor", "Criança", "Amor da vida dela", "Usuário"],
        correta: 2
      },
      {
        pergunta: "O que vó faz melhor que chef?",
        alternativas: ["Empadão", "Tudo", "Bolo", "Sopa de letrinha"],
        correta: 1
      },
      {
        pergunta: "Quando a gente vai embora da casa da vó:",
        alternativas: ["Ela manda embora logo", "Ela dá comida pra viagem", "Ela diz tchau frio", "Ela dorme"],
        correta: 1
      }
    ];

    let perguntas = [];
    let indiceAtual = 0;
    let pontuacao = 0;
    let nome = "";

    function embaralharArray(array) {
      return array.sort(() => Math.random() - 0.5);
    }

    function iniciarJogo() {
      const nomeInput = document.getElementById("nomeJogador").value.trim();
      if (nomeInput === "") {
        alert("Digite seu nome, meu netinho!");
        return;
      }

      nome = nomeInput;
      perguntas = embaralharArray([...perguntasOriginais]);
      indiceAtual = 0;
      pontuacao = 0;

      document.getElementById("telaInicial").style.display = "none";
      document.getElementById("telaJogo").style.display = "block";

      mostrarPergunta();
    }

    function mostrarPergunta() {
      if (indiceAtual >= perguntas.length) {
        mostrarResultadoFinal();
        return;
      }

      const q = perguntas[indiceAtual];
      document.getElementById("perguntaTexto").innerText = q.pergunta;
      const alternativasDiv = document.getElementById("alternativas");
      alternativasDiv.innerHTML = "";

      q.alternativas.forEach((texto, index) => {
        const btn = document.createElement("button");
        btn.innerText = texto;
        btn.onclick = () => verificarResposta(index);
        alternativasDiv.appendChild(btn);
      });

      document.getElementById("pontuacaoAtual").innerText = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;
    }

    function verificarResposta(indiceEscolhido) {
      const correta = perguntas[indiceAtual].correta;
      const alternativasDiv = document.getElementById("alternativas");
      const botoes = alternativasDiv.querySelectorAll("button");

      botoes.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correta) {
          btn.style.backgroundColor = "#4CAF50"; // Verde
          btn.style.color = "#fff";
        }
        if (i === indiceEscolhido && i !== correta) {
          btn.style.backgroundColor = "#f44336"; // Vermelho
          btn.style.color = "#fff";
        }
      });

      if (indiceEscolhido === correta) {
        pontuacao++;
      }

      setTimeout(() => {
        indiceAtual++;
        mostrarPergunta();
      }, 1500);
    }

    function mostrarResultadoFinal() {
      document.getElementById("telaJogo").style.display = "none";
      document.getElementById("telaFinal").style.display = "block";

      let mensagem = "";
      if (pontuacao === 10) {
        mensagem = "Você é o orgulho da vóvó! 💙";
      } else if (pontuacao >= 7) {
        mensagem = "Muito bem, meu netinho! Quase perfeito!";
      } else if (pontuacao >= 4) {
        mensagem = "Tá bom, mas dá pra melhorar! 😅";
      } else {
        mensagem = "Ai ai ai... precisa vir mais vezes comer pãozinho com a vó! 😢";
      }

      document.getElementById("mensagemFinal").innerHTML = `
        ${mensagem}<br><br>
        Pontuação: ${pontuacao} de ${perguntas.length}<br><br>
        Jesus te ama ❤️<br><br>
        Tente novamente, ${nome}! 💕
      `;
    }

    function recomecarJogo() {
      document.getElementById("telaFinal").style.display = "none";
      document.getElementById("telaInicial").style.display = "block";
      document.getElementById("nomeJogador").value = "";
    }