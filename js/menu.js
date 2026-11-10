// js/menu.js — Aula 11 (DOM): dá vida ao menu hambúrguer construído na Aula 8.
// Carregado com "defer" em todas as páginas, então o HTML já existe quando este arquivo roda.

// Avisa o CSS que o JavaScript está funcionando. Só com essa classe o menu recolhe no celular;
// sem JavaScript, o menu fica sempre visível em vez de ficar inacessível.
document.documentElement.classList.add('js');

const botaoMenu = document.querySelector('.menu-hamburguer');
const listaMenu = document.getElementById('menu-principal');

// Aula 11, Erro 5: querySelector devolve null se o seletor não existir. Conferimos antes de usar.
if (botaoMenu && listaMenu) {
  // Recebe o estado desejado (true = aberto) e atualiza classe, aria-expanded e aria-label juntos,
  // para a aparência e o que o leitor de tela anuncia nunca ficarem diferentes.
  const definirMenuAberto = (aberto) => {
    listaMenu.classList.toggle('aberto', aberto);
    botaoMenu.setAttribute('aria-expanded', String(aberto));
    botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  };

  botaoMenu.addEventListener('click', () => {
    const estaAberto = botaoMenu.getAttribute('aria-expanded') === 'true';
    definirMenuAberto(!estaAberto);
  });

  // Teclado: Esc fecha o menu e devolve o foco ao botão.
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && listaMenu.classList.contains('aberto')) {
      definirMenuAberto(false);
      botaoMenu.focus();
    }
  });

  // Clicar em um link do menu também fecha (útil nos links âncora da mesma página).
  listaMenu.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) {
      definirMenuAberto(false);
    }
  });
}
