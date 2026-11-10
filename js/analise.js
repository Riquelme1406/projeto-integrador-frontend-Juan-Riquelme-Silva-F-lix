const LIMITES_PADRAO = { esboco: 30, detalhado: 45 };

const NIVEIS = {
  'Esboço': 'esboco',
  'Completo': 'completo',
  'Detalhado': 'detalhado'
};

function contarPalavras(texto) {
  return texto.split(/\s+/).filter(Boolean).length;
}

function classificarDetalhe(palavras, { esboco, detalhado } = LIMITES_PADRAO) {
  if (palavras < esboco) {
    return 'Esboço';
  }
  if (palavras < detalhado) {
    return 'Completo';
  }
  return 'Detalhado';
}

const media = (valores) =>
  valores.length === 0 ? 0 : valores.reduce((soma, valor) => soma + valor, 0) / valores.length;

const contarPor = (lista, chave) =>
  lista.reduce((contagem, item) => {
    contagem[item[chave]] = (contagem[item[chave]] ?? 0) + 1;
    return contagem;
  }, {});

function montarResumo(personagens) {
  const comNivel = personagens.map((p) => ({ ...p, nivel: classificarDetalhe(p.palavras) }));
  const maisDetalhado = [...comNivel].sort((a, b) => b.palavras - a.palavras)[0] ?? null;

  return {
    total: comNivel.length,
    mediaPalavras: Math.round(media(comNivel.map((p) => p.palavras))),
    maisDetalhado,
    porNivel: contarPor(comNivel, 'nivel'),
    porGrupo: contarPor(comNivel, 'grupo')
  };
}

const filtrarPorNivel = (personagens, nivel) =>
  nivel === 'Todos' ? [...personagens] : personagens.filter((p) => classificarDetalhe(p.palavras) === nivel);

if (typeof module !== 'undefined') {
  module.exports = { LIMITES_PADRAO, NIVEIS, contarPalavras, classificarDetalhe, media, contarPor, montarResumo, filtrarPorNivel };
}
