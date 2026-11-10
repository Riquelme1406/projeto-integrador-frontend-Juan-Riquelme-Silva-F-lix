// js/main.js — carregado com "defer" em todas as páginas.
// Cada bloco confere se o elemento existe, porque nem toda página tem vídeo, aviso ou gráfico.

// ===== Aula 4 (Desafio Extra): mostra qual formato de vídeo este navegador suporta =====
// canPlayType() devolve "probably", "maybe" ou "" (texto vazio, que é falsy).
// "probably" tem prioridade; "maybe" só entra se nenhum formato for "probably".
const video = document.querySelector('video');
const saidaFormato = document.getElementById('formato-suportado');

if (video && saidaFormato) {
  const formatos = [
    { tipo: 'video/webm', nome: 'WebM' },
    { tipo: 'video/mp4', nome: 'MP4' }
  ];
  const suportado = formatos.find((f) => video.canPlayType(f.tipo) === 'probably')
    || formatos.find((f) => video.canPlayType(f.tipo) === 'maybe');

  if (suportado) {
    saidaFormato.textContent = `Formato de vídeo suportado neste navegador: ${suportado.nome}`;
  } else {
    saidaFormato.textContent = 'Este navegador não consegue reproduzir os formatos de vídeo da página.';
  }
}

// ===== Aviso com botão de fechar =====
const alertaExemplo = document.getElementById('alerta-exemplo');
const botaoFecharAlerta = document.getElementById('fechar-alerta');

if (alertaExemplo && botaoFecharAlerta) {
  botaoFecharAlerta.addEventListener('click', () => {
    alertaExemplo.hidden = true;
  });
}

// ===== Aula 5: gráfico de barras em Canvas (modo imediato) =====
const canvasGrafico = document.getElementById('grafico-personagens');

if (canvasGrafico) {
  // Contagem de personagens por seção de personagens.html (conferir se alterar a página).
  // O texto do aria-label e do fallback no HTML precisa repetir estes mesmos números.
  const dados = [
    { rotulo: 'Cavaleiros', valor: 4, cor: '#3fb6a0' },
    { rotulo: 'Trama', valor: 12, cor: '#d9c9a3' },
    { rotulo: 'Makers', valor: 5, cor: '#d9742b' }
  ];

  const ctx = canvasGrafico.getContext('2d');
  const margemTopo = 36;
  const margemBase = 40;
  const larguraBarra = 80;
  const maximo = Math.max(...dados.map((d) => d.valor));
  const alturaUtil = canvasGrafico.height - margemTopo - margemBase;
  const espaco = canvasGrafico.width / dados.length;
  const linhaBase = canvasGrafico.height - margemBase;
  const DURACAO_MS = 900;

  // Desenha UM quadro. progresso vai de 0 (barras vazias) até 1 (altura final).
  function desenharQuadro(progresso) {
    // Erro 2 da Aula 5: o Canvas não "lembra" o que foi desenhado. Sem este clearRect,
    // cada quadro da animação ficaria por cima do anterior e deixaria um rastro.
    ctx.clearRect(0, 0, canvasGrafico.width, canvasGrafico.height);

    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';

    dados.forEach((item, i) => {
      const x = espaco * i + (espaco - larguraBarra) / 2;
      const altura = (item.valor / maximo) * alturaUtil * progresso;

      ctx.fillStyle = item.cor;
      ctx.fillRect(x, linhaBase - altura, larguraBarra, altura);

      ctx.fillStyle = '#e8e8e8';
      ctx.fillText(item.rotulo, x + larguraBarra / 2, linhaBase + 22);
      ctx.fillText(String(Math.round(item.valor * progresso)), x + larguraBarra / 2, linhaBase - altura - 8);
    });

    // linha de base do gráfico
    ctx.fillStyle = '#e8e8e8';
    ctx.fillRect(20, linhaBase, canvasGrafico.width - 40, 1);
  }

  const prefereMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefereMenosMovimento) {
    // Quem pediu menos movimento no sistema recebe o gráfico pronto, sem animação.
    desenharQuadro(1);
  } else {
    let inicio = null;

    // requestAnimationFrame chama esta função antes do próximo repaint e passa o tempo atual.
    const animar = (agora) => {
      if (inicio === null) {
        inicio = agora;
      }
      const progresso = Math.min((agora - inicio) / DURACAO_MS, 1);
      const suavizado = 1 - Math.pow(1 - progresso, 3); // começa rápido e desacelera no fim
      desenharQuadro(suavizado);

      if (progresso < 1) {
        requestAnimationFrame(animar);
      }
    };

    requestAnimationFrame(animar);
  }
}
