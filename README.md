Darksiders 2 Wiki
Website dinâmico e responsivo dedicado à lore, personagens, armas e chefes de Darksiders II.

📋 Índice
Descrição

Funcionalidades

Tecnologias

Como rodar o projeto

Estrutura do Projeto

Licença

🚀 Descrição
A Darksiders 2 Wiki é uma plataforma web criada para centralizar informações sobre a jornada de Morte (Death), um dos Cavaleiros do Apocalipse, em sua missão para salvar seu irmão Guerra. O projeto conta com páginas dedicadas a personagens, armas e chefes, além de um sistema interativo para envio de teorias pela comunidade.

⚙️ Funcionalidades
Navegação Completa: seções dedicadas para Home, Personagens, Armas e Bosses

Mídia Interativa: exibição de trailers e conteúdos audiovisuais em alta qualidade

Envio de Teorias: formulário completo com validação HTML5 e controle de spoilers

Acessibilidade (A11y): estruturação semântica com atributos ARIA para leitores de tela

Design Temático: interface visual customizada com plano de fundo e temas da franquia

🛠 Tecnologias
As seguintes ferramentas foram usadas na construção do projeto:

HTML5 (Estrutura semântica e acessibilidade)

CSS3 (Estilização visual e responsividade)

💻 Como rodar o projeto
Pré-requisitos
Um navegador web moderno (Google Chrome, Mozilla Firefox, Edge, Safari)

Opcional: extensão Live Server (caso use o VS Code)


#Avaliador Lucas Moura do Nascimento 27/08/2026 -- Avaliação do repositório:


Conceitos Fundamentais da Web (3 critérios): o HTML mínimo é válido (<!DOCTYPE html>, <html>, <head>, <body> corretos) — Atende Plenamente (2). As meta tags básicas (charset="UTF-8" e viewport) estão presentes — Atende Plenamente (2). Porém a página não abre sem erros: o index.html está dentro da pasta HTML/, mas o link do CSS aponta para css/style.css, caminho que não existe a partir dali, e os links do menu para personagens.html, armas.html e bosses.html também dão 404, pois esses arquivos não existem no repositório — Não Atende 
Aula 3 — Semântica e Formulários (3 critérios): usa elementos semânticos corretamente — <header>, <nav>, um único <main>, <section> com heading próprio e <footer> — Atende Plenamente (2). Todos os label estão associados aos campos via for/id idênticos (nome, e-mail, idade, data de envio, personagem, spoiler, teoria) — Atende Plenamente (2). A validação nativa foi pensada corretamente (tipos email, number, date, com required/min/max/minlength), mas o <form> tem o atributo novalidate, e como o script.js está vazio, não há nenhuma validação em JS substituindo-a — na prática, o formulário permite envio com campos obrigatórios vazios — Atende Parcialmente 
Aula 4 — Recursos Multimídia (3 critérios): não há fallback de formato — o <video> tem apenas um <source src="trailer.mp4" type="video/mp4">, sem um segundo formato — Não Atende. O atributo controls está presente e sem autoplay — Atende Plenamente. Não há atributo preload em lugar nenhum, nem comentário justificando um critério de uso — Não Atende
O que precisa ser refeito: corrigir o caminho do CSS e os links do menu para a página abrir sem erro, remover o novalidate do formulário ou implementar validação em JS equivalente e, no vídeo, adicionar um segundo <source> em outro formato e configurar o preload com a justificativa em comentário (Aula 4).


#Avaliador Rafael Amaro Donato 11/11/2026 -- Avaliação do repositório:

O projeto apresenta uma ótima organização e estruturação dos arquivos, seguindo corretamente os requisitos solicitados durante as aulas. O código está bem organizado, com boa utilização de HTML, CSS e JavaScript, demonstrando atenção às boas práticas de desenvolvimento. De modo geral, atende a todos os requisitos propostos, apresentando um resultado satisfatório e uma boa execução do que foi trabalhado em sala de aula.

