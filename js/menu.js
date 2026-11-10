document.documentElement.classList.add('js');

const botaoMenu = document.querySelector('.menu-hamburguer');
const listaMenu = document.getElementById('menu-principal');

if (botaoMenu && listaMenu) {
  const definirMenuAberto = (aberto) => {
    listaMenu.classList.toggle('aberto', aberto);
    botaoMenu.setAttribute('aria-expanded', String(aberto));
    botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  };

  botaoMenu.addEventListener('click', () => {
    const estaAberto = botaoMenu.getAttribute('aria-expanded') === 'true';
    definirMenuAberto(!estaAberto);
  });

  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && listaMenu.classList.contains('aberto')) {
      definirMenuAberto(false);
      botaoMenu.focus();
    }
  });

  listaMenu.addEventListener('click', (evento) => {
    if (evento.target.closest('a')) {
      definirMenuAberto(false);
    }
  });
}
