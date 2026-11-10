function criarElemento(tag, { classe = '', texto = '' } = {}) {
  const elemento = document.createElement(tag);
  if (classe) {
    elemento.className = classe;
  }
  elemento.textContent = texto;
  return elemento;
}

function lerDadosDoCard(card) {
  const titulo = card.querySelector('h3');
  const descricao = card.querySelector('p');
  const palavras = Number(card.dataset.palavras) || contarPalavras(descricao ? descricao.textContent : '');

  return {
    card,
    nome: titulo ? titulo.textContent.split(/\s[—-]\s/)[0].trim() : 'Sem nome',
    grupo: card.dataset.grupo,
    palavras
  };
}

function aplicarSelo(item) {
  const nivel = classificarDetalhe(item.palavras);
  const selo = criarElemento('span', {
    classe: `badge badge-${NIVEIS[nivel]}`,
    texto: `${nivel} · ${item.palavras} palavras`
  });
  item.card.prepend(selo);
  item.card.dataset.nivel = nivel;
  return { ...item, nivel };
}

function criarEstatistica(rotulo, valor) {
  const bloco = criarElemento('div', { classe: 'estatistica' });
  bloco.append(criarElemento('dt', { texto: rotulo }), criarElemento('dd', { texto: String(valor) }));
  return bloco;
}

function criarPainelResumo(resumo) {
  const painel = criarElemento('section', { classe: 'card painel-resumo' });
  painel.setAttribute('aria-labelledby', 'titulo-painel');

  const titulo = criarElemento('h2', { texto: 'Resumo da página' });
  titulo.id = 'titulo-painel';

  const explicacao = criarElemento('p', {
    texto: `Nível de detalhe de cada descrição: Esboço (menos de ${LIMITES_PADRAO.esboco} palavras), ` +
      `Completo (${LIMITES_PADRAO.esboco} a ${LIMITES_PADRAO.detalhado - 1}) e ` +
      `Detalhado (${LIMITES_PADRAO.detalhado} ou mais).`
  });

  const lista = criarElemento('dl', { classe: 'estatisticas' });
  lista.append(
    criarEstatistica('Personagens', resumo.total),
    criarEstatistica('Média de palavras', resumo.mediaPalavras),
    criarEstatistica('Mais detalhado', resumo.maisDetalhado ? resumo.maisDetalhado.nome : '—'),
    criarEstatistica('Esboços', resumo.porNivel['Esboço'] ?? 0),
    criarEstatistica('Completos', resumo.porNivel['Completo'] ?? 0),
    criarEstatistica('Detalhados', resumo.porNivel['Detalhado'] ?? 0)
  );

  painel.append(titulo, explicacao, lista);
  return painel;
}

function criarFiltros(niveis) {
  const grupo = criarElemento('div', { classe: 'filtros' });
  grupo.setAttribute('role', 'group');
  grupo.setAttribute('aria-label', 'Filtrar personagens por nível de detalhe');

  niveis.forEach((nivel) => {
    const botao = criarElemento('button', { classe: 'filtro', texto: nivel });
    botao.type = 'button';
    botao.dataset.nivel = nivel;
    botao.setAttribute('aria-pressed', String(nivel === 'Todos'));
    grupo.append(botao);
  });
  return grupo;
}

function iniciarPainel() {
  const cards = Array.from(document.querySelectorAll('.card-item[data-palavras]'));
  if (cards.length === 0) {
    return;
  }

  const itens = cards.map(lerDadosDoCard).map(aplicarSelo);
  const resumo = montarResumo(itens);

  const painel = criarPainelResumo(resumo);
  const filtros = criarFiltros(['Todos', ...Object.keys(NIVEIS)]);
  const resultado = criarElemento('p', { classe: 'filtro-resultado' });
  resultado.setAttribute('aria-live', 'polite');
  painel.append(filtros, resultado);

  const primeiroGrupo = document.querySelector('.grupo');
  if (primeiroGrupo) {
    primeiroGrupo.before(painel);
  } else {
    document.querySelector('main')?.append(painel);
  }

  const secoes = Array.from(document.querySelectorAll('.grupo'));

  const aplicarFiltro = (nivel) => {
    const visiveis = new Set(filtrarPorNivel(itens, nivel).map((item) => item.card));

    itens.forEach((item) => {
      item.card.hidden = !visiveis.has(item.card);
    });
    secoes.forEach((secao) => {
      secao.hidden = !secao.querySelector('.card-item:not([hidden])');
    });
    filtros.querySelectorAll('.filtro').forEach((botao) => {
      botao.setAttribute('aria-pressed', String(botao.dataset.nivel === nivel));
    });
    resultado.textContent = `Mostrando ${visiveis.size} de ${itens.length} personagens.`;
  };

  filtros.addEventListener('click', (evento) => {
    const botao = evento.target.closest('.filtro');
    if (botao) {
      aplicarFiltro(botao.dataset.nivel);
    }
  });

  aplicarFiltro('Todos');
}

iniciarPainel();
