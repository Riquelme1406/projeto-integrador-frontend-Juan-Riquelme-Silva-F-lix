// js/analise.js — Aula 11: funções PURAS de análise (não tocam na página).
// Cada função recebe dados por parâmetro e devolve um resultado com return (Erro 1 da Aula 11:
// "console.log" mostra, mas não devolve). Quem decide o que fazer com o resultado é quem chama;
// no navegador, isso é o js/painel.js.
//
// Tema: o "nível de detalhe" de cada personagem da wiki, medido pelo tamanho da descrição
// (quantidade de palavras). É a mesma regra do js/aula09-logica-console.js, agora empacotada em funções.

// Faixas de classificação (em palavras). Mudar aqui muda a página inteira.
const LIMITES_PADRAO = { esboco: 30, detalhado: 45 };

// Nome de exibição e sufixo de classe CSS de cada nível.
const NIVEIS = {
  'Esboço': 'esboco',
  'Completo': 'completo',
  'Detalhado': 'detalhado'
};

// Conta palavras de um texto: separa por espaços e descarta pedaços vazios.
function contarPalavras(texto) {
  return texto.split(/\s+/).filter(Boolean).length;
}

// Parâmetro com valor padrão + desestruturação: chamar classificarDetalhe(40) usa os limites padrão.
// A ordem dos testes importa: do menor limite para o maior, parando no primeiro verdadeiro.
function classificarDetalhe(palavras, { esboco, detalhado } = LIMITES_PADRAO) {
  if (palavras < esboco) {
    return 'Esboço';
  }
  if (palavras < detalhado) {
    return 'Completo';
  }
  return 'Detalhado';
}

// Média de uma lista de números; lista vazia devolve 0 em vez de NaN (0 / 0).
const media = (valores) =>
  valores.length === 0 ? 0 : valores.reduce((soma, valor) => soma + valor, 0) / valores.length;

// Conta quantos itens existem para cada valor de uma chave: contarPor(lista, 'grupo') -> { trama: 12, ... }
const contarPor = (lista, chave) =>
  lista.reduce((contagem, item) => {
    contagem[item[chave]] = (contagem[item[chave]] ?? 0) + 1;
    return contagem;
  }, {});

// Recebe [{ nome, grupo, palavras }] e devolve um resumo. Não altera a lista original (Erro 4):
// map devolve um array novo, e o sort trabalha numa CÓPIA feita com spread.
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

// 'Todos' devolve tudo; qualquer nível devolve só os personagens daquele nível (filter cria um array novo).
const filtrarPorNivel = (personagens, nivel) =>
  nivel === 'Todos' ? [...personagens] : personagens.filter((p) => classificarDetalhe(p.palavras) === nivel);

// Permite testar as funções no Node (node --test) sem atrapalhar o navegador, onde "module" não existe.
if (typeof module !== 'undefined') {
  module.exports = { LIMITES_PADRAO, NIVEIS, contarPalavras, classificarDetalhe, media, contarPor, montarResumo, filtrarPorNivel };
}
