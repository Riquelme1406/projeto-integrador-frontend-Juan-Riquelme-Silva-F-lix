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

const alertaExemplo = document.getElementById('alerta-exemplo');
const botaoFecharAlerta = document.getElementById('fechar-alerta');

if (alertaExemplo && botaoFecharAlerta) {
  botaoFecharAlerta.addEventListener('click', () => {
    alertaExemplo.hidden = true;
  });
}

const canvasGrafico = document.getElementById('grafico-personagens');

if (canvasGrafico) {
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

  function desenharQuadro(progresso) {
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

    ctx.fillStyle = '#e8e8e8';
    ctx.fillRect(20, linhaBase, canvasGrafico.width - 40, 1);
  }

  const prefereMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefereMenosMovimento) {
    desenharQuadro(1);
  } else {
    let inicio = null;

    const animar = (agora) => {
      if (inicio === null) {
        inicio = agora;
      }
      const progresso = Math.min((agora - inicio) / DURACAO_MS, 1);
      const suavizado = 1 - Math.pow(1 - progresso, 3);
      desenharQuadro(suavizado);

      if (progresso < 1) {
        requestAnimationFrame(animar);
      }
    };

    requestAnimationFrame(animar);
  }
}
